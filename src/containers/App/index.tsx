import React from "react";
// Style
import "./App.scss";
// Containers
import Navigation from "../Navigation";
import Routes from "../../routes";

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {

    return (
      <React.Fragment>
        <Navigation
          title="LoginRadius Engineering"
          sections={[
            { name: "People", link: "/people" },
            { name: "Event", link: "/event" },
            { name: "Talk", link: "/talk" },
            { name: "Hackathon", link: "/hackathon" },
            { name: "Open Source", link: "/opensource" }
          ]}
        />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
