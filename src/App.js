import "./App.css";
import Nav from "./components/Nav";
import About from "./components/About";
import Shop from "./components/Shop";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { ScroolToTop } from "./components/ScroolToTop";

function App() {
  const data = useSelector((state) => state);
  console.log(data);
  return (
    <Router>
      <Nav />
      <ScroolToTop />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/about"} exact component={About} />
        <Route path={"/shop"} exact component={Shop} />
        <Route path={"/shop/:id"} exact component={ShopItem} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;

const ShopItem = () => {
  return <div>{JSON.stringify(window.location.pathname)}</div>;
};
