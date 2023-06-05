export type TRegistrationFormProps = {
  onSubmit: (data: TRegistrationForm) => void
  loading: boolean
}

export type TRegistrationForm = {
  login: string
  password: string
  confirmationPassword: string
  name: string
  surname: string
}
