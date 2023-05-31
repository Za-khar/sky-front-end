export type TRegistrationFormProps = {
  onSubmit: (data: TRegistrationForm) => void
}

export type TRegistrationForm = {
  login: string
  password: string
  confirmationPassword: string
}
