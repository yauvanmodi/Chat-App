import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { user } from "../Join/Join";
import "./chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;
const ENDPOINT = "http://localhost:5000/";

const Chat = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });
    console.log(socket);
    socket.emit("Joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJioned", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [message]);

  const handleKeydown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      send();
    }
  };

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chat App</h2>
          <a href="/">
            {" "}
            <img src={closeIcon} alt="close" />{" "}
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {message.map((item,i) => (
          
            < Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"} key={i}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={handleKeydown} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            {" "}
            send{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
