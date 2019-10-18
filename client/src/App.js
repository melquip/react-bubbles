import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.scss";
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import PrivateRoute from './helpers/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute path="/bubbles" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
