import React, { useEffect, useState } from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

//react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//firebase
import firebase from "firebase/app";
import "firebase/auth";

//components
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import { UserContext } from "./context/UserContext";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import firebaseConfig from "./config/firebaseConfig";
//init firebase
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    firebase.auth().onAuthStateChanged(function (res) {
      if (res) {
        setUser({ email: res.email, uid: res.uid });
      } else {
        // No user is signed in.
      }
      setloading(false);
    });
  }, []);
  if (loading)
    return (
      <Router>
        <React.Fragment>
          <Header></Header>
          <div class="content">
            <div class="spinner">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8" cy="8" r="7" stroke-width="2" />
              </svg>
            </div>
          </div>
          <Footer></Footer>
        </React.Fragment>
      </Router>
    );
  else
    return (
      <Router>
        <ToastContainer />
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    );
};

export default App;
