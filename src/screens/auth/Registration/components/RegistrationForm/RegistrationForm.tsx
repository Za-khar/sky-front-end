import { PasswordInput, StandartInput } from '@app/components/inputs'
import { Stack, Button } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TRegistrationForm } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationFormSchema } from './validation'
import { TRegistrationFormProps } from './types'

export const RegistrationForm = ({ onSubmit }: TRegistrationFormProps) => {
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm<TRegistrationForm>({
    resolver: zodResolver(registrationFormSchema),
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

      <Controller
        control={control}
        name="confirmationPassword"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <PasswordInput
            label={t('password_confirmation')}
            placeholder={t('password_placeholder')}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Button w="60%" onPress={handleSubmit(onSubmit)}>
        {t('btn_next')}
      </Button>
    </Stack>
  )
}
