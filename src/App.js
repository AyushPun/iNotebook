import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState"; //importing NoteState context API from where states of note component will be available to all the children(under NoteState Component)
import Alert from "./components/Alert";
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {

  return (
    <>

      <NoteState>

        <Router>
          
          <Navbar />
          <Alert message="Alert bar"/>

          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>

        </Router>

      </NoteState>

    </>
  );

}

export default App;
