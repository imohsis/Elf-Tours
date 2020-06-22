import React, { Component } from "react";

export class Home extends Component {
  static displayName = "Trips";

  render() {
    return (
      <div>
        <h1>Elf Tours Services!</h1>
        <p>
          Welcome To Elf Tour Services for Creating And Editing Your Trip
          Records
        </p>
        <ul>
          <li>Add a Trip</li>
          <li>Update a Trip</li>
          <li>Delete a Trip</li>
          <li>Show All Trips</li>
        </ul>
      </div>
    );
  }
}
