import { useContext } from 'react';

import { AuthorizationContext, AuthorizedUser } from '..';

export const useAuthUser = (): AuthorizedUser => {
  const { authUser } = useContext(AuthorizationContext);

  return authUser!;
};