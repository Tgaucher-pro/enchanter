import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";
const Join = () => {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="title">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Game"
            className="joinInput mt-20"
            type="text"
            onChange={event => setGame(event.target.value)}
          />
        </div>
        <Link
          onClick={event => (!name || !game ? event.preventDefault() : null)}
          to={`/chat?name=${name}&game=${game}`}
        >
          <button className="button mt-20" type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
