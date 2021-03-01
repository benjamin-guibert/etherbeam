import { UserType } from '../libraries/types'
import { faUser, faUserShield, IconDefinition } from '@fortawesome/free-solid-svg-icons'

export const getUserTypeIcon = (type: UserType): IconDefinition => {
  switch (type) {
    case UserType.Administrator:
      return faUserShield
    default:
      return faUser
  }
}
