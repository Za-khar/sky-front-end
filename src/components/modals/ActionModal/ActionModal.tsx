import { Modal, Button, Divider } from 'native-base'
import React from 'react'
import { TActionModalProps } from './types'
import { useTranslation } from 'react-i18next'

export const ActionModal = ({
  isOpen,
  onClose,
  onPressConfirm,
  text,
  title,
}: TActionModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard bottom="4" size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={onPressConfirm}>
            {t('btn_confirm')}
          </Button>

          <Divider backgroundColor="transparent" width="4px" />

          <Button flex="1" onPress={onClose} variant="outline">
            {t('btn_cancel')}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
