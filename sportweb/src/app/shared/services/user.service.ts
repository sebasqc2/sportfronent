import { User, UserDto } from "../model/user.model";

export class UserService {
  public users: User[];

  constructor() {
    const users: UserDto[] = JSON.parse(localStorage.getItem("users")) || [];
    this.users = users.map(user => new User(user));
  }

  _commit(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  add(user: User) {
    this.users.push(new User(user));
    this._commit(this.users);
  }

  edit(userID: string, userToEdit: User) {
    this.users = this.users.map(user =>
      user.id === userID
        ? new User({
            ...user,
            ...userToEdit
          })
        : user
    );

    this._commit(this.users);
  }

  delete(userID: string) {
    this.users = this.users.filter(({ id }) => id !== userID);
    this._commit(this.users);
  }

  toggle(userID: string) {
    this.users = this.users.map(user =>
      user.id === userID
        ? new User({ ...user, complete: !user.complete })
        : user
    );

    this._commit(this.users);
  }
}
