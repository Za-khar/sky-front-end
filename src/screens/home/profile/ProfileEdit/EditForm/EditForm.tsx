import { StandartInput, TextArea } from '@app/components/inputs'
import { Stack, Button } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { TEditForm, TEditFormProps } from './types'
import { editFormSchema } from './validation'
import { useTypedSelector } from '@app/store/store'

export const EditForm = ({ onSubmit }: TEditFormProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.userState)

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<TEditForm>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      avatar: user?.avatar ?? '',
      description: user?.description ?? '',
      login: user?.login,
      name: user?.name ?? '',
      surname: user?.surname ?? '',
    },
  })

  const disabled = !isDirty

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
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <StandartInput
            label={t('name')}
            placeholder={t('name_placeholder')}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="surname"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <StandartInput
            label={t('surname')}
            placeholder={t('surname_placeholder')}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextArea
            label={t('description')}
            placeholder={t('description_placeholder')}
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <Button
        w="60%"
        onPress={handleSubmit(onSubmit)}
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
      >
        {t('btn_save')}
      </Button>
    </Stack>
  )
}
