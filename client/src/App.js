import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WitcherState from "./context/WitcherState";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <WitcherState>
      <Router>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </WitcherState>
  );
}

export default App;
