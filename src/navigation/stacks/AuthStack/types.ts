export enum EAuthStackScreens {
  Login = 'Login',
  Registration = 'Registration',
}

export type TAuthStack = {
  [EAuthStackScreens.Login]: undefined
  [EAuthStackScreens.Registration]: undefined
}
