export type TEditFormProps = {
  onSubmit: (data: TEditForm) => void
}

export type TEditForm = {
  login: string
  name: string
  surname: string
  description: string
  avatar: string
}
