export type TLoginFormProps = {
  onSubmit: (data: TLoginForm) => void
  loading: boolean
}

export type TLoginForm = {
  login: string
  password: string
}
