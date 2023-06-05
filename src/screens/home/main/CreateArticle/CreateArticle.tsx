import { Box, Button, useTheme } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { ScrollView, Text, KeyboardAvoidingView } from 'native-base'
import { FormControlWrapper, StandartInput } from '@app/components/inputs'
import { TCreateArticleForm } from './types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createArticleSchema } from './validation'
import { useTranslation } from 'react-i18next'
import { SelectTopics } from './components'
import { useCreateArticleMutation } from '@app/store/api/article'
import { Platform, StyleSheet } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import {
  EArticleStackScreens,
  EProfileStackScreens,
} from '@app/navigation/stacks'
import { ScrollView as RNScrollView } from 'react-native'

const handleHead = () => <Text>H1</Text>

export const CreateArticleScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { colors } = useTheme()
  const richTextRef = useRef<RichEditor | null>(null)
  const scrollRef = useRef<RNScrollView | null>(null)

  const [createArticle, { isLoading, isSuccess, data }] =
    useCreateArticleMutation()

  const { control, handleSubmit } = useForm<TCreateArticleForm>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      topics: [],
      text: '',
      title: '',
    },
  })

  const onSubmit = (data: TCreateArticleForm) => {
    const topics = data.topics.map((val) => val.id)
    createArticle({ ...data, topics })
  }

  useEffect(() => {
    if (isSuccess && data?.id) {
      const repaseAction = StackActions.replace(
        EProfileStackScreens.ProfileArticleStack,
        {
          screen: EArticleStackScreens.Article,
          params: {
            articleId: data.id,
          },
        },
      )
      navigation.dispatch(repaseAction)
    }
  }, [isSuccess, data?.id])

  return (
    <Box flex={1} backgroundColor="white">
      <ScrollView
        p="24px"
        ref={scrollRef}
        onContentSizeChange={() => {
          scrollRef.current?.scrollToEnd({ animated: false })
        }}
      >
        <Box flex={1} pt="14px" pb="24px">
          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <StandartInput
                label={t('article_title')}
                placeholder={t('article_title_placeholder')}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="topics"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SelectTopics
                values={value}
                onSelect={onChange}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="text"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                flex={1}
              >
                <FormControlWrapper
                  label={t('article_content')}
                  error={error?.message}
                >
                  <RichEditor
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    style={[
                      {
                        borderColor: error?.message
                          ? colors.secondary[600]
                          : colors.muted[300],
                      },
                      styles.richEditor,
                    ]}
                    androidLayerType="software"
                    ref={richTextRef}
                    onChange={(text) => onChange(text)}
                    placeholder={t('article_content_placeholder')}
                  />
                </FormControlWrapper>
              </KeyboardAvoidingView>
            )}
          />
        </Box>
      </ScrollView>
      <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
        {t('btn_publish')}
      </Button>

      <RichToolbar
        editor={richTextRef}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.keyboard,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </Box>
  )
}

export const styles = StyleSheet.create({
  richEditor: {
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden',
  },
})
