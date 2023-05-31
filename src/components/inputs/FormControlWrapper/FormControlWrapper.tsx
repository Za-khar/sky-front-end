import React from 'react'
import { TFormControlWrapperProps } from './types'
import { FormControl, WarningOutlineIcon } from 'native-base'

export const FormControlWrapper = ({
  error,
  label,
  children,
}: TFormControlWrapperProps) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormControl.Label>{label}</FormControl.Label>}

      {children}

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
