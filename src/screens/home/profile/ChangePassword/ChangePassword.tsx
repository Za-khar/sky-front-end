import React, { useEffect } from 'react'
import { ScrollView, Center, Stack, Button } from 'native-base'
import { useUpdateProfileMutation } from '@app/store/api/user'
import { changePasswordSchema } from './validation'
import { Controller, useForm } from 'react-hook-form'
import { TChangePasswordForm } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { PasswordInput } from '@app/components/inputs'
import { useNavigation } from '@react-navigation/native'

export const ChangePasswordScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation()

  const { control, handleSubmit } = useForm<TChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = (data: TChangePasswordForm) => {
    updateProfile(data)
  }

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack()
    }
  }, [isSuccess])

  return (
    <ScrollView backgroundColor="white">
      <Stack space={5} paddingTop="10%">
        <Center w="90%" alignSelf="center">
          <Stack space={4} w="100%" alignItems="center">
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <PasswordInput
                  label={t('password_new')}
                  placeholder={t('password_new_placeholder')}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="oldPassword"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <PasswordInput
                  label={t('password_old')}
                  placeholder={t('password_old_placeholder')}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />

            <Button
              w="60%"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {t('btn_change')}
            </Button>
          </Stack>
        </Center>
      </Stack>
    </ScrollView>
  )
}
