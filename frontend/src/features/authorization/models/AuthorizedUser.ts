export interface AuthorizedUser {
  email: string;
  uid: string;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}
