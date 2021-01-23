import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Counter from "./components/counter";

class App extends Component {
  state = {};

  constructor() {
    super();
    console.log("App - component");
  }

  render() {
    console.log("App - Render");

    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Counter />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
