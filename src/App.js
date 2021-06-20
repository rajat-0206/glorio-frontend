import logo from './logo.svg';
import { React, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import './Styles/custom.css';
import LoginForm from "./Components/login.js"
import Dashboard from './Components/dashboard';
import SignupForm from "./Components/signup.js"
import AppContext from './Components/AppContext';
import 'antd/dist/antd.css'
import jwt from 'jsonwebtoken'

const toggleUser = () => {
  try {
    let token = localStorage.getItem("token");
    let data = jwt.decode(token);
    if (data.exp < Date.now() / 1000 ? false : data) {
      console.log("data found", data);
      return data.email;
    }
    else {
      throw Error();
    }
  }
  catch (e) {
    return null;
  }
}

const App = () => {
  let [user, setUser] = useState(toggleUser());

  

  const userSettings = {
    user: user,
    setUser,
    toggleUser,
  };
  return (
    <AppContext.Provider value={userSettings}>
      <Router>
        <div className="App">

          <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={SignupForm} />

          </Switch>
        </div>
      </Router>
     
    </AppContext.Provider>
  );
}

export default App;
