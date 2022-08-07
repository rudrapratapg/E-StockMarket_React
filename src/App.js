import logo from "./images/stock_colored_image.png";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import {
  Routes,
  Route,
  Link,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import RegistrationPage from "./pages/RegistrationPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import AppContext from "./context/AppContext";

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
console.log("PUBLIC_URL2 -> ", PUBLIC_URL);

const UserContext = React.createContext({
  name: "Guest",
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [wantsToLogIn, setWantsToLogIn] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  var defaultValue ={
    "loggedIn":loggedIn,
    "setLoggedIn":setLoggedIn,
    "wantsToLogIn":wantsToLogIn,
    "setWantsToLogIn":setWantsToLogIn,
    "accessToken":accessToken,
    "setAccessToken":setAccessToken,
    "extras":{},
  };

  //console.log('PUBLIC_URL -> ',PUBLIC_URL);

  //console.log('props: ',this.props);
  return (
    <AppContext.Provider value={defaultValue}>
      <div className="App">
        <ResponsiveAppBar />
        <Routes path={PUBLIC_URL}>
          <Route path="/" element={<RegistrationPage />} />
          {/*
              <PrivateRoute path="/" element={<PrivateScreen/>} />
              */}
          <Route path="/dashboard" element={<LandingPage />} />
          {/* navigate to default route if no url matched 
              
              <Route path="/*" element={<Navigate to="/dashboard" />}  /> 
              */}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
