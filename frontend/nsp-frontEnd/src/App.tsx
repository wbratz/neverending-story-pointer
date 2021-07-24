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

export default function App() {
  const [userName, setUserName] = useState("");
  const [usernameSelected, setUsernameSelected] = useState(false);

  socket.on("connect_error", (err) => {
    console.log("connect error" + err.message);

    if (err.message === "invalid username") {
    }

    setUsernameSelected(false);

    socket.off("connect_error");
  });

  const clearFields = () => {
    setUserName("");
  };

  const handleUserChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleUserNameSelection = () => {
    setUsernameSelected(true);

    if (userName.trim().length > 1) {
      socket.auth = { userName };
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
              {usernameSelected ? null : (
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
                    disabled={usernameSelected}
                  >
                    Connect
                  </Button>
                </InputGroup>
              )}
              {usernameSelected ? <Room /> : null}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
