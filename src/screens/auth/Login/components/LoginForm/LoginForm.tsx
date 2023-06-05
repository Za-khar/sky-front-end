import { PasswordInput, StandartInput } from '@app/components/inputs'
import { Stack, Button } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TLoginForm } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from './validation'
import { TLoginFormProps } from './types'

export const LoginForm = ({ onSubmit, loading }: TLoginFormProps) => {
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
  })

  return (
    <Stack space={4} w="100%" alignItems="center">
      <Controller
        control={control}
        name="login"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <StandartInput
            label={t('login')}
            placeholder={t('login_placeholder')}
            leftIcon="account"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <PasswordInput
            label={t('password')}
            placeholder={t('password_placeholder')}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Button w="60%" onPress={handleSubmit(onSubmit)} isLoading={loading}>
        {t('btn_next')}
      </Button>
    </Stack>
  )
}
