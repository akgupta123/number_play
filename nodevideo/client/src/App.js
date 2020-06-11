import React from 'react';
import {Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import File from './components/File/File';
function App() {
  return (
    <React.Fragment>
      <Router>
    <Route exact path="/signIn" component={SignIn} />
    <Route exact path="/signUp" component={SignUp} />
    <Route exact path="/File" component={File} />
    </Router>
    </React.Fragment>
  );
}

export default App;
