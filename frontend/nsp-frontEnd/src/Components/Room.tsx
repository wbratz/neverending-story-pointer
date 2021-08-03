import { Row, Col } from "react-bootstrap";
import socket from "../JS/socket";
import "../styles/Room.css";
import User from "../Classes/User";

export default function Room(props: { users: User[], onSetStoryPoints: any }) {


  return (
    <Row>
      {props.users.map((x: User) => (
        <div key={x.userId}>
          <Row>
            <Col>
              <div key={x.userId} className="user-alignment">
                <h2>{x.username}</h2>
              </div>
            </Col>
            <Col>
              <span key={x.userId} className="dot">
                {x.point}
              </span>
            </Col>
          </Row>
        </div>
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
            className={Number(props.users.find(x => x.isSelf)?.point) === 1 ? "dot-selected" : "dot"}
            onClick={() => props.onSetStoryPoints(props.users.find(x => x.isSelf), 1)}
          >
            1
          </span>
        </Col>
        <Col>
          <span
            className={Number(props.users.find(x => x.isSelf)?.point) === 2 ? "dot-selected" : "dot"}
            onClick={() => props.onSetStoryPoints(props.users.find(x => x.isSelf), 2)}
          >
            2
          </span>
        </Col>
        <Col>
          <span
            className={Number(props.users.find(x => x.isSelf)?.point) === 3 ? "dot-selected" : "dot"}
            onClick={() => props.onSetStoryPoints(props.users.find(x => x.isSelf), 3)}
          >
            3
          </span>
        </Col>
        <Col>
          <span
            className={Number(props.users.find(x => x.isSelf)?.point) === 5 ? "dot-selected" : "dot"}
            onClick={() => props.onSetStoryPoints(props.users.find(x => x.isSelf), 5)}
          >
            5
          </span>
        </Col>
        <Col>
          <span
            className={Number(props.users.find(x => x.isSelf)?.point) === 8 ? "dot-selected" : "dot"}
            onClick={() => props.onSetStoryPoints(props.users.find(x => x.isSelf), 8)}
          >
            8
          </span>
        </Col>
        <Col>
          <span
            className={Number(props.users.find(x => x.isSelf)?.point) === 13 ? "dot-selected" : "dot"}
            onClick={() => props.onSetStoryPoints(props.users.find(x => x.isSelf), 13)}
          >
            13
          </span>
        </Col>
      </Row>
    </Row>
  );
}
