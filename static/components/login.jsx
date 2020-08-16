import React, {Component} from 'react'
import "./../assets/bootstrap/css/bootstrap.min.css"
import "./../assetsforlogin/css/util.css"
import "./../assetsforlogin/css/main.css"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
class Login extends Component {
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
            }
        }
    }
    onSubmitData = () => {
        let faultyData = this.state.user.skillPoints === 0 || this.state.user.username === "";
        let sumPoints = Object.values(this.state.user.skills).reduce((totalPoints, points) => totalPoints + points, 0);
        if (sumPoints !== this.state.user.skillPoints || faultyData) {
            alert("You have not allocated the points correctly. Please try again.")
        } else {
            fetch("http://127.0.0.1:80/verify", {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(this.state.user),
            }).then((e) =>  window.location = "http://127.0.0.1:80/confirmation")
           
        }
    }

    onNameChange = (event) => {
        this.setState(Object.assign(this.state.user, {username: event.target.value}));
    }
    onPasswordChange = (event) => {
        this.setState(Object.assign(this.state.user, {password: event.target.value}));
    }

    onPilotPointsChange = (event) => {
        this.setState(Object.assign(this.state.user.skills, { pilot: parseInt(event.target.value, 10) }));
    }

    onFighterPointsChange = (event) => {
        this.setState(Object.assign(this.state.user.skills, { fighter: parseInt(event.target.value, 10) }));
    }

    onMerchantPointsChange = (event) => {
        this.setState(Object.assign(this.state.user.skills, { merchant: parseInt(event.target.value, 10) }));
    }

    onEngineerPointsChange = (event) => {
        this.setState(Object.assign(this.state.user.skills, { engineer: parseInt(event.target.value, 10) }));
    }

    onDifficultyChange = (difficulty) => {
        this.setState(Object.assign(this.state.user, { difficulty: difficulty}));
        let skillPoints = 0;
        let credit = 0;
        if (difficulty === "easy") {
            skillPoints = 16;
            credit = 1000;
        } else if (difficulty === "medium") {
            skillPoints = 12;
            credit = 500;
        } else if (difficulty === "hard") {
            skillPoints = 8;
            credit = 100;
        }
        this.setState(Object.assign(this.state.user, { skillPoints: skillPoints}));
        this.setState(Object.assign(this.state.user, { credit: credit}));
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="./confirmation.jsx" />
        }
        return (
            <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                            <span className="login100-form-title p-b-26" style = {{fontFamily: "Arial"}}>
                                Sign-Up
                            </span>
                            <div className="wrap-input100" >
                                <input className="input100" type="text" name="username" placeholder = "Username" onChange = {this.onNameChange}/>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100">
                                <span className="btn-show-pass">
                                </span>
                                <input className="input100" type="password" name="password" placeholder = "Password" onChange = {this.onPasswordChange}/>
                                <span className="focus-input100" ></span>
                            </div>
                                <div className="difficulty-input center">
                                    <div style={{
                                        paddingBottom: "2vh"
                                    }}>
                                        <label htmlFor="dropdown">Select Difficulty</label>
                                        <DropdownButton id="dropdown-basic-button" variant="secondary" className="difficulty" name="dropdown" title={this.state.user.difficulty}>
                                            <Dropdown.Item onSelect={() => {this.onDifficultyChange("easy")}}>Easy</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => {this.onDifficultyChange("medium")}}>Medium</Dropdown.Item>
                                            <Dropdown.Item onSelect={() => { this.onDifficultyChange("hard") }}>Hard</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                                <div className="center" style={{
                                    textAlign: "center"
                                }}>
                                    <h6>You have {this.state.user.skillPoints} skill points, divide them amongst the following categories!</h6>
                                </div>
                            <div id = "skillsets">
                                <label> Pilot </label> 
                                <input type="number" className="form-control" placeholder="Enter Value:" onInput={this.onPilotPointsChange}></input>
                                <label> Fighter </label>
                                <input type="number" className="form-control" placeholder="Enter Value:" onInput={this.onFighterPointsChange}></input>
                                <label> Engineer </label>
                                <input type="number" className="form-control" placeholder="Enter Value:" onInput={this.onEngineerPointsChange}></input>
                                <label> Merchant </label>
                                <input type="number" className="form-control" placeholder="Enter Value:" onInput={this.onMerchantPointsChange}></input>
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn" onClick={this.onSubmitData} style = {{fontFamily: "Arial"}}>
                                        Login
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Login;