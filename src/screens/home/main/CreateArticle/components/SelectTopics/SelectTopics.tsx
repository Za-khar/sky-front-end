import React, { useState } from 'react'
import { TSelectTopicsProps } from './types'
import { Box, Button, Icon, IconButton, Modal, Row, Text } from 'native-base'
import { TopicLayout } from '@app/components/layouts'
import { TTopic } from '@app/types'
import { useTranslation } from 'react-i18next'
import { FormControlWrapper } from '@app/components/inputs'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export const SelectTopics = ({
  onSelect,
  values,
  error,
}: TSelectTopicsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onSelectTopic = (data: TTopic, found: boolean) => {
    if (found) {
      remove(data)
      return
    }

    onSelect([...values, data])
  }

  const remove = (data: TTopic) => {
    onSelect(values.filter((val) => val.id !== data.id))
  }

  const renderButton = (data: TTopic) => {
    const found = !!values.find((val) => val.id === data.id)

    return (
      <Button onPress={() => onSelectTopic(data, found)}>
        {found ? t('btn_remove') : t('btn_select')}
      </Button>
    )
  }

  return (
    <FormControlWrapper error={error} label={t('select_topics')}>
      <Button onPress={onOpen} variant="outline">
        {t('btn_select')}
      </Button>

      <Row flexWrap="wrap">
        {values.map((val) => (
          <Box
            margin="5px"
            paddingLeft="10px"
            key={val.id}
            borderColor="primary.200"
            borderWidth="1px"
            borderRadius={50}
            flexDirection="row"
            alignItems="center"
          >
            <Text>{val.title}</Text>

            <IconButton
              onPress={() => remove(val)}
              icon={
                <Icon
                  as={<VectorIcon name={'close'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              }
            />
          </Box>
        ))}
      </Row>

      <Modal
        useRNModal
        isOpen={isOpen}
        onClose={onClose}
        avoidKeyboard
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t('select_topics')}</Modal.Header>

          <TopicLayout renderButton={renderButton} withSearch />
        </Modal.Content>
      </Modal>
    </FormControlWrapper>
  )
}
