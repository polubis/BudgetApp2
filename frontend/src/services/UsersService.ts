import { firestore } from 'firebase';

class UsersService {
  private _collection = 'users';

  public saveUser = (email: string) =>
    firestore()
      .collection(this._collection)
      .doc(email)
      .set({
        email
      });

  public getUsers = () =>
    firestore()
      .collection(this._collection)
      .get();
}

export default new UsersService();
