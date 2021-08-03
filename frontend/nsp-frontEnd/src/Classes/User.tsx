export default class User {
  username: string;
  userId: string;
  point: string;
  isSelf: boolean

  constructor(
    username: string,
    userId: string = Date.now().toString() + username,
    point: string = "0",
    isSelf: boolean = false
  ) {
    this.username = username;
    this.userId = userId;
    this.point = point;
    this.isSelf = isSelf;
  }
}
