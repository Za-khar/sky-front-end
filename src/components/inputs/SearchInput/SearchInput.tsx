import React, { useState, useEffect } from 'react'
import { StandartInput } from '../StandartInput'
import { TDefaultInputProps } from '../types'
import { useDebounce } from '@app/hooks'

export const SearchInput = ({
  onChange,
  value,
  ...props
}: TDefaultInputProps) => {
  const [searchValue, setSearchValue] = useState(value)
  const debouncedValue = useDebounce(searchValue, 500)

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue])

  return (
    <StandartInput
      {...props}
      leftIcon="text-search"
      value={searchValue}
      onChange={setSearchValue}
    />
  )
}
