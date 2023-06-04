export enum EProfileStackScreens {
  ProfileMain = 'ProfileMain',
  ProfileEdit = 'ProfileEdit',
  ChangePassword = 'ChangePassword',
}

export type TProfileStack = {
  [EProfileStackScreens.ProfileMain]: undefined
  [EProfileStackScreens.ProfileEdit]: undefined
  [EProfileStackScreens.ChangePassword]: undefined
}
