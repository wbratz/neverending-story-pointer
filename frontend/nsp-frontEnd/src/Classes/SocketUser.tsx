export default class SocketUser {
    userID: string;
    username: string;
    storypoints: number;

    constructor(
        userID: string,
        username: string,
        storypoints: number
    ) {
        this.username = username;
        this.userID = userID;
        this.storypoints = storypoints;
    }
}
