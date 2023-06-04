import React, { useState } from 'react'
import { TSelectTopicsProps } from './types'
import { Button, Modal } from 'native-base'
import { TopicLayout } from '@app/components/layouts'
import { TTopic } from '@app/types'

export const SelectTopics = ({ onSelect, values }: TSelectTopicsProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onSelectTopic = (data: TTopic, found: boolean) => {
    if (found) {
      onSelect(values.filter((val) => val.id !== data.id))
      return
    }

    onSelect([...values, data])
  }

  const renderButton = (data: TTopic) => {
    const found = !!values.find((val) => val.id === data.id)

    return (
      <Button onPress={() => onSelectTopic(data, found)}>
        {found ? 'Delete' : 'Select'}
      </Button>
    )
  }

  return (
    <>
      <Button onPress={onOpen}>Open</Button>

      <Modal
        useRNModal
        isOpen={isOpen}
        onClose={onClose}
        avoidKeyboard
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Forgot Password?</Modal.Header>

          <TopicLayout renderButton={renderButton} />

          <Modal.Footer>
            <Button flex="1" onPress={onClose}>
              Proceed
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
