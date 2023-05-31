export type TLoginFormProps = {
  onSubmit: (data: TLoginForm) => void
}

export type TLoginForm = {
  login: string
  password: string
}
