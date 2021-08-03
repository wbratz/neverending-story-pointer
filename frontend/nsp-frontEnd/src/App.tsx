import { useState } from "react";
import Room from "./Components/Room";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import "./styles/App.css";
import socket from "./JS/socket";
import User from "./Classes/User";
import SocketUser from "./Classes/SocketUser";

export default function App() {
  const [userName, setUserName] = useState("");
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState<User[]>(new Array());


  socket.on("connect_error", (err) => {
    console.log("connect error" + err.message);

    if (err.message === "invalid username") {
    }

    setConnected(false);

    socket.off("connect_error");
  });

  socket.on("users", (users) => {
    let usersArray: User[] = [];

    users.forEach((user: any) => {
      let usr = new User(user.username, user.userID, user.storypoints, user.userID === socket.id)

      usersArray.push(usr);
    });

    users = users.sort((a: any, b: any) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userName < b.userName) return -1;
      return a.userName > b.userName ? 1 : 0;
    });

    setUsers(usersArray);
    setConnected(true);
  });

  socket.on("user connected", (user) => {
    let userArray = users;

    userArray?.push(new User(user.username, user.userID, user.storypoints, user.userID === socket.id));

    setUsers(userArray);
  });

  socket.on("user disconnected", (user: SocketUser) => {
    let userArray = users;
    userArray = userArray.filter((x) => x.userId !== user.userID);

    setUsers(userArray);
  });

  const handleStoryPoints = (user: User, storyPoints: string) => {
    user.point = storyPoints;

    const temp_users = [...users]
    const index = users.findIndex(x => x.userId === user.userId)
    temp_users[index] = { ...user };

    setUsers(temp_users);

    let socketUser = new SocketUser(user.userId, user.username, Number(user.point))
    submitPoints(socketUser);
  };

  const submitPoints = (user: SocketUser) => {
    socket.emit("submit points", user);
  };

  socket.on("submit points", (user: SocketUser) => {
    let userArray = users;
    userArray = users?.filter((x: User) => x.userId !== user.userID);

    userArray?.push(new User(user.username, user.userID, user.storypoints.toString()));
    setUsers(userArray);
  });


  const clearFields = () => {
    setUserName("");
  };

  const handleUserChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleUserNameSelection = () => {

    if (userName.trim().length > 1) {
      socket.auth = { userName, storypoints: 0 };
      socket.connect();
    }

    clearFields();
  };

  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="../falkor.jpg"
              width="150"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <div className="main-content">
              {connected ? null : (
                <InputGroup className="sm-1">
                  <FormControl
                    placeholder="Enter Username"
                    aria-label="username"
                    aria-describedby="basic-addon2"
                    value={userName}
                    onChange={(e) => {
                      handleUserChange(e);
                    }}
                  />
                  <Button
                    variant="btn btn-primary"
                    id="button-addon2"
                    onClick={() => handleUserNameSelection()}
                    disabled={connected}
                  >
                    Connect
                  </Button>
                </InputGroup>
              )}
              {connected ?
                <Room
                  users={users}
                  onSetStoryPoints={handleStoryPoints} /> : null}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
