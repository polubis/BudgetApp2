import { AuthorizedUser } from './AuthorizedUser';

export interface AuthorizationData {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  authUser: AuthorizedUser | null;
}
