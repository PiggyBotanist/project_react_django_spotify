import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className = "center">
      <HomePage />
    </div>
    );
  }
}

// Get the DOM element with the id "root" and render the App component
const appDiv = document.getElementById("app");  // Ensure 'root' exists in your HTML
const root = createRoot(appDiv);  // Create a root on the 'root' div
root.render(<App />);  // Render the App component
