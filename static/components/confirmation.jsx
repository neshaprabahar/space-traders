import React, {Component} from 'react'
import cookie from 'react-cookies';
import Button from "react-bootstrap/Button"


class Confirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "",
                difficulty: "Select Difficulty",
                skillPoints: 0,
                skills: {
                    pilot: 0,
                    fighter: 0,
                    merchant: 0,
                    engineer: 0
                },
                credit: 0
            }
        }
    }
    componentDidMount(){
        var url = new URL("http://127.0.0.1:80/getUserData"),
            params = {username: cookie.load("username")}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then((data) => data.json())
        .then((items) => this.setState({user: {
            username: cookie.load("username"),
            difficulty: items.difficulty,
            skillPoints: items.skillPoints,
            skills: {
                pilot: items.skills.pilot,
                fighter: items.skills.fighter,
                merchant: items.skills.merchant,
                engineer: items.skills.engineer
            },
            credit: items.credit
        }})  )
    }
    render() {
        return(
        <div>
            <div className="jumbotron text-center">
                <h1 className="display-3">Confirmation</h1>
                <p className="lead"><strong>Username is : { this.state.user.username }</strong> </p>
                <p className="lead"><strong>Available Credits are : { this.state.user.credit }</strong> </p>
                <p className="lead"><strong>Skills is : { this.state.user.skillPoints }</strong> </p>
                <p className="lead"><strong>Difficulty is : { this.state.user.difficulty }</strong> </p>
            </div>
            <Button className = "gamestart" variant="primary" size="lg" block href="/gamescreen">
                Start game
            </Button>
        </div>
        )
    }
}

export default Confirmation;