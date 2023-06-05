import { TextArea as NativeTextArea } from 'native-base'
import React from 'react'
import { FormControlWrapper } from '../FormControlWrapper'
import { TDefaultInputProps } from '../types'

export const TextArea = ({
  value,
  placeholder,
  label,
  error,
  onChange,
}: TDefaultInputProps) => {
  return (
    <FormControlWrapper label={label} error={error}>
      <NativeTextArea
        autoCompleteType=""
        h={20}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </FormControlWrapper>
  )
}
