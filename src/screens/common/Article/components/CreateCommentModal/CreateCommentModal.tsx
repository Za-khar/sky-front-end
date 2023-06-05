import React, { useEffect } from 'react'
import { TCreateCommentModalProps, TCreateCommentForm } from './types'
import { Button, Modal } from 'native-base'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCommentSchema } from './validation'
import { TextArea } from '@app/components/inputs'
import { useCreateCommentMutation } from '@app/store/api/comment'

export const CreateCommentModal = ({
  isOpen,
  onClose,
  articleId,
}: TCreateCommentModalProps) => {
  const { t } = useTranslation()

  const [sendComment, { isLoading, isSuccess }] = useCreateCommentMutation()

  const { control, handleSubmit } = useForm<TCreateCommentForm>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: '',
    },
  })

  const onSubmit = (data: TCreateCommentForm) => {
    sendComment({
      ...data,
      articleId,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess])

  return (
    <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard bottom="4" size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{t('write_comment')}</Modal.Header>
        <Modal.Body>
          <Controller
            control={control}
            name="content"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextArea
                label={t('comment')}
                placeholder={t('comment_placeholder')}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            flex="1"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          >
            {t('btn_send')}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
