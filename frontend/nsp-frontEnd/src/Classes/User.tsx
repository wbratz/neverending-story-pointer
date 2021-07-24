export default class User {
  username: string;
  userId: string;
  point: string;

  constructor(
    username: string,
    userId: string = Date.now().toString() + username,
    point: string = "0"
  ) {
    this.username = username;
    this.userId = userId;
    this.point = point;
  }
}
