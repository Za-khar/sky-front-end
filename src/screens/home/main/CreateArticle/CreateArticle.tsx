import { Box, Button, FormControl } from 'native-base'
import React, { useRef, useState } from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { ScrollView, Text } from 'native-base'
import { StandartInput } from '@app/components/inputs'
import { TCreateArticleForm } from './types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createArticleSchema } from './validation'
import { useTranslation } from 'react-i18next'
import { SelectTopics } from './components'
import { useCreateArticleMutation } from '@app/store/api/article'

const handleHead = () => <Text>H1</Text>

export const CreateArticleScreen = () => {
  const { t } = useTranslation()
  const richTextRef = useRef<RichEditor | null>(null)

  const [createArticle] = useCreateArticleMutation()

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

  return (
    <Box flex={1}>
      <ScrollView>
        <Box flex={1} pt="14px">
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

          <FormControl.Label mt="14px">
            {t('article_content')}
          </FormControl.Label>

          <Controller
            name="text"
            control={control}
            render={({ field: { onChange } }) => (
              <RichEditor
                androidLayerType="software"
                ref={richTextRef}
                onChange={(text) => onChange(text)}
                placeholder={t('article_content_placeholder')}
              />
            )}
          />
        </Box>
      </ScrollView>
      <Button onPress={handleSubmit(onSubmit)}>{t('btn_publish')}</Button>

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
