import { Icon, Pressable, Input } from 'native-base'
import React, { useState } from 'react'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TDefaultInputProps } from '../types'
import { FormControlWrapper } from '../FormControlWrapper'

export const PasswordInput = ({
  value,
  placeholder,
  label,
  error,
  onChange,
}: TDefaultInputProps) => {
  const [show, setShow] = useState(false)

  return (
    <FormControlWrapper label={label} error={error}>
      <Input
        type={show ? 'text' : 'password'}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={<VectorIcon name={show ? 'eye' : 'eye-off'} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </FormControlWrapper>
  )
}
