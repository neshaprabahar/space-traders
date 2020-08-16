// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './../components/home'
import Login from './../components/login'
import Confirmation from './../components/confirmation'
import gameScreen from './../components/gameScreen'
import Region from './../components/region'
import "./../assets/css/welcome.css"
import "./../assets/bootstrap/css/bootstrap.css"
import "./../assets/css/animate.min.css"
import "./../assets/css/responsive.css"
import Bandit from "../components/bandit";
import Trader from "../components/trader";
import Police from "../components/police";
import Winscreen from "../components/winscreen";
import Gameover from "../components/gameOver";
import BuyRepair from "../components/buyrepair";

export default class App extends React.Component {
  render () {
    return (
      <Router>
      <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component = {Login} />
        <Route path="/confirmation" component = {Confirmation} />
        <Route path="/gamescreen" component = {gameScreen} />
        <Route path="/region" component = {Region} />
        <Route path="/bandit" component = {Bandit} />
        <Route path="/trader" component = {Trader} />
        <Route path="/police" component = {Police} />
        <Route path="/winscreen" component = {Winscreen} />
        <Route path="/gameover" component = {Gameover} />
        <Route path="/buyrepair" component = {BuyRepair} />
        
    </Router>
    )
  }
}
