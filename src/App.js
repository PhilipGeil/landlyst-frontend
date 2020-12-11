import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Frontpage from './Frontpage/Frontpage';
import Footer from './Components/Footer';
import Booking from './Booking/Booking';
import Login from './Login/Login';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    var myStorage = window.localStorage;
    if (myStorage.getItem("user") !== null) {
      setUser(JSON.parse(myStorage.getItem("user")))
    }
  }, [])

  const setUserWithCache = (user) => {
    var myStorage = window.localStorage;
    setUser(user)
    myStorage.setItem("user", JSON.stringify(user))
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login user={user} setUser={setUserWithCache}></Login>
          </Route>
          <Route path="/booking">
            <Booking user={user} setUser={setUserWithCache}></Booking>
          </Route>
          <Route path="/">
            <Frontpage user={user} setUser={setUserWithCache}></Frontpage>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
