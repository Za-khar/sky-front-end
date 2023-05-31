import { Icon, Input } from 'native-base'
import React from 'react'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TStandartInputProps } from './types'
import { FormControlWrapper } from '../FormControlWrapper'

export const StandartInput = ({
  value,
  placeholder,
  label,
  error,
  onChange,
  leftIcon,
  rightIcon,
}: TStandartInputProps) => {
  return (
    <FormControlWrapper label={label} error={error}>
      <Input
        type="text"
        InputRightElement={
          rightIcon ? (
            <Icon
              as={<VectorIcon name={rightIcon} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          ) : undefined
        }
        InputLeftElement={
          leftIcon ? (
            <Icon
              as={<VectorIcon name={leftIcon} />}
              size={5}
              ml="2"
              color="muted.400"
            />
          ) : undefined
        }
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </FormControlWrapper>
  )
}
