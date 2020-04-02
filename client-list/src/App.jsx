import React,  { useState }  from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from "./views/Landing"
import Signup from "./views/Signup";
import Signin from "./views/Signin";
import addClient from "./views/addClient";
import editClient from "./views/editClient";
import Clients from "./views/Clients";

import logo from './logo.svg';
import './App.css';


import UserContext from "./api/UserContext";
import { useAuth } from "./hooks/useAuth";


function App() {

  const { isLoggedIn } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  const UserContextValue = {
    currentUser,
    setCurrentUser
  };



  return (
    <UserContext.Provider value={UserContextValue}>

    <div className="App">
      <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/clients/add" component={addClient} />
            <Route path="/clients/:id" component={editClient} />
      </Switch>
    </div>
    </UserContext.Provider>

  );
}

export default App;
