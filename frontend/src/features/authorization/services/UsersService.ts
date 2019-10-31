import { firestore } from 'firebase';

class UsersService {
  private _collection = 'users';

  public addUser = (email: string): Promise<void> =>
    firestore()
      .collection(this._collection)
      .doc(email)
      .set({
        email
      });
}

export const usersService = new UsersService();
