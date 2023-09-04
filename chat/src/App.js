import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./Component/Join/Join";
import chat from "./Component/chat/Chat"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/Chat" Component={chat} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;