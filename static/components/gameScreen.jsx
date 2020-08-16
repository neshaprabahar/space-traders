/*
The game screen with a map of all the regions - planets. Map of universe included. 
*/

import React, {Component} from 'react'
import 'react-minimap/dist/react-minimap.css';
import cookie from 'react-cookies';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
import './../assets/css/welcome.css'
import Container from 'react-bootstrap/Container';

class gameScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                password: "",
                difficulty: "Select Difficulty",
                skillPoints: 0,
                skills: {
                    pilot: 0,
                    fighter: 0,
                    merchant: 0,
                    engineer: 0
                },
                credit: 0
            },
            regions: {
            }
        }
    }
    componentDidMount() {
        var url = new URL("http://127.0.0.1:80/getUserData"),
            params = {username: cookie.load("username")}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then((data) => data.json())
        .then((items) => 
        this.setState({user: {
            username: cookie.load("username"),
            password: items.password,
            difficulty: items.difficulty,
            skillPoints: items.skillPoints,
            skills: {
                pilot: items.skills.pilot,
                fighter: items.skills.fighter,
                merchant: items.skills.merchant,
                engineer: items.skills.engineer
            },
            credit: items.credit
        }})
        )
        fetch("http://127.0.0.1/getRegions")
        .then((data) => data.json())
        .then((items) => this.setState({regions: items}))
    }
    render() {
        return(
            <div>  
                <P5Wrapper sketch = {sketch} username = {this.state.user.username}/>
           </div>
        )
    }
}

export default gameScreen;



