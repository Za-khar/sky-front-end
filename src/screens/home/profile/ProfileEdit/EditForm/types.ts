export type TEditFormProps = {
  onSubmit: (data: TEditForm) => void
  loading: boolean
}

export type TEditForm = {
  login: string
  name: string
  surname: string
  description: string
  avatar: string
}
