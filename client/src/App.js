import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WitcherState from "./context/WitcherState";
import "./App.css";
import Login from "./pages/Home";
import Books from "./pages/Books";
import CurrentBook from "./components/BookItem";
import Character from "./pages/Character";
import CurrentCharacter from "./components/CharacterItem";
import Navbar from "./components/Navbar";
import Home from "./pages/AuthBooks";

function App() {
  return (
    <WitcherState>
      <Router>
        <div className='App'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/books' component={Books} />
            <Route exact path='/books/:_id' component={CurrentBook} />
            <Route exact path='/characters' component={Character} />
            <Route exact path='/characters/:_id' component={CurrentCharacter} />
          </Switch>
        </div>
      </Router>
    </WitcherState>
  );
}

export default App;
