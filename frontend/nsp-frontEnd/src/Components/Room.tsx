import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import socket from "../JS/socket";
import "../styles/Room.css";

export default function Room() {
  const [self, setSelf] = useState({
    userID: "",
    username: "",
    storypoints: 0,
  });
  const [usrs, setUsrs] = useState(Array<any>());
  const [myPoints, setMyPoints] = useState(0);

  socket.on("user disconnected", (user) => {
    let userArray = usrs;
    userArray = userArray.filter((x) => x.userID !== user.userID);
    setUsrs(userArray);
  });

  const handleStoryPoints = (e: number) => {
    let slf = self;
    slf.storypoints = e;

    setSelf(slf);
  };

  const submitPoints = () => {
    socket.emit("submit points", self);
  };

  socket.on("submit points", (user) => {
    let userArray = usrs;
    userArray = userArray.filter((x: any) => x.userID !== user.userID);

    userArray.push(user);
    setUsrs(userArray);
  });

  socket.on("users", (users) => {
    let userArray: any[] = [];

    users.forEach((user: any) => {
      user.self = user.userID === socket.id;

      if (user.self) {
        setSelf(user);
      }

      userArray.push(user);
    });

    users = users.sort((a: any, b: any) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userName < b.userName) return -1;
      return a.userName > b.userName ? 1 : 0;
    });

    setUsrs(userArray);
  });

  socket.on("user connected", (user) => {
    let userArray = usrs;
    userArray.push(user);
    setUsrs(userArray);
  });

  return (
    <Row>
      <Row>
        <Col>
          <div className="user-alignment">
            <h2>{self.username}</h2>
          </div>
        </Col>
        <Col>
          <span className="self-dot">{myPoints}</span>
        </Col>
      </Row>
      {usrs.map((x: any) => (
        <Row>
          <Col>
            <div className="user-alignment">
              <h2>{x.userID === socket.id ? "" : x.username}</h2>
            </div>
          </Col>
          <Col>
            {x.userID === socket.id ? null : (
              <span className="dot">
                {x.userID === socket.id ? "" : x.storypoints}
              </span>
            )}
          </Col>
        </Row>
      ))}
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <Row>
        <Col>
          <span
            className={self.storypoints === 1 ? "dot-selected" : "dot"}
            onClick={() => handleStoryPoints(1)}
          >
            1
          </span>
        </Col>
        <Col>
          <span
            className={self.storypoints === 2 ? "dot-selected" : "dot"}
            onClick={() => (
              handleStoryPoints(2), submitPoints(), setMyPoints(2)
            )}
          >
            2
          </span>
        </Col>
        <Col>
          <span
            className={self.storypoints === 3 ? "dot-selected" : "dot"}
            onClick={() => (
              handleStoryPoints(3), submitPoints(), setMyPoints(3)
            )}
          >
            3
          </span>
        </Col>
        <Col>
          <span
            className={self.storypoints === 5 ? "dot-selected" : "dot"}
            onClick={() => (
              handleStoryPoints(5), submitPoints(), setMyPoints(5)
            )}
          >
            5
          </span>
        </Col>
        <Col>
          <span
            className={self.storypoints === 8 ? "dot-selected" : "dot"}
            onClick={() => (
              handleStoryPoints(8), submitPoints(), setMyPoints(8)
            )}
          >
            8
          </span>
        </Col>
        <Col>
          <span
            className={self.storypoints === 13 ? "dot-selected" : "dot"}
            onClick={() => (
              handleStoryPoints(13), submitPoints(), setMyPoints(13)
            )}
          >
            13
          </span>
        </Col>
      </Row>
    </Row>
  );
}
