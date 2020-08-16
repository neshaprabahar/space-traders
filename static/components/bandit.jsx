import React, {Component} from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import BanditIcon from "./../assets/img/BanditIcon.png"

class Bandit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shipcargo: 0,
            currRegion: '',
            marketplaceInventory: {},
            shipInventory: {},
            credit: 0,
            health: 0,
            demand: 0,
            difficulty: "",
            pilot: 0,
            fighter: 0
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:80/getMarketData')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    currRegion: data['currRegion'],
                    marketplaceInventory: data['market_inventory'],
                    shipInventory: data['ship_inventory'],
                    shipcargo: data['cargo'],
                    credit: data['credit'],
                    health: data['health'],
                    demand: data['demand'],
                    difficulty: data['difficulty'],
                    pilot: data['pilot'],
                    fighter: data['fighter']
                })
            });
    }


    handlePay = () => {
        var newHealth = 0
        var newCredits = 0
        if (this.state.demand > this.state.credit) {
            if (this.state.shipcargo == 0) {
                if (this.state.difficulty == 'easy') {
                    newHealth = 0.8 * this.state.health
                }
                if (this.state.difficulty == 'medium') {
                    newHealth = 0.6 * this.state.health
                }
                if (this.state.difficulty == 'hard') {
                    newHealth = 0.4 * this.state.health
                }
            } else {
                this.setState({
                    shipcargo: 0
                })
            }
        } else if (this.state.demand <= this.state.credit) {
            newCredits = this.state.credit - this.state.demand
        }
        var send_val = {
            'newCargo': this.state.shipcargo,
            'health': newHealth,
            'credit': newCredits
        }
        fetch('http://127.0.0.1:80/sendBanditData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},  
            body: JSON.stringify(send_val)
        }).then( window.location.href = "/region" )
    };


    handleFlee = () => {
        let minLose = 0
        let maxLose = 7
        let minWin = 2
        let maxWin = 9

        if (this.state.difficulty == 'easy') {
            if (this.state.pilot <= 6) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // flee failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")
                    window.location.href = "/gameScreen"
                }
            }
            else {
                var fleeChance = Math.floor(Math.random() * (maxWin - minWin + 1) ) + minWin;
                if (fleeChance <= 4) {
                    // flee failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                } else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")
                    window.location.href = "/gameScreen"                
                }
            }

        }
        if (this.state.difficulty == 'medium') {
            if (this.state.pilot <= 4) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // flee failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")

                    window.location.href = "/gameScreen"                
                }
            }
            else {
                var fleeChance = Math.floor(Math.random() * (maxWin - minWin + 1) ) + minWin;
                if (fleeChance <= 4) {
                    // flee failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")

                    window.location.href = "/gameScreen"                
                }
            }
        }
        if (this.state.difficulty == 'hard') {
            if (this.state.pilot <= 3) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // flee failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")

                    window.location.href = "/gameScreen"                
                }
            }
            else {
                var fleeChance = Math.floor(Math.random() * (maxWin - minWin + 1) ) + minWin;
                if (fleeChance <= 4) {
                    // flee failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")

                    window.location.href = "/gameScreen"                
                }
            }
        }
        var send_val = {
            'newCargo': this.state.shipcargo,
            'health': this.state.health,
            'credit': this.state.credit
        }
        console.log(send_val)
        fetch('http://127.0.0.1:80/sendBanditData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},  
            body: JSON.stringify(send_val)
        })
    };



    handleFight = () => {
        let minLose = 0
        let maxLose = 7
        let minWin = 2
        let maxWin = 9

        if (this.state.difficulty == 'easy') {
            if (this.state.fighter <= 6) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // fight failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // fight success [go to intended location]
                    this.state.credit = this.state.credit*1.2 + 1
                    this.setState ({
                        credit: this.state.credit*1.2 + 1
                    })
                    window.location.href = "/region"
                }
            }
            else {
                var fleeChance = Math.floor(Math.random() * (maxWin - minWin + 1) ) + minWin;
                if (fleeChance <= 4) {
                    // fight failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // fight success [go to intended location]
                    this.setState ({
                        credit: this.state.credit*1.2 + 1
                    })
                    this.state.credit = this.state.credit*1.2  + 1
                    window.location.href = "/region"              }
            }

        }
        if (this.state.difficulty == 'medium') {
            if (this.state.fighter <= 4) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // fight failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // fight success [go to intended location]
                    this.setState ({
                        credit: this.state.credit*1.2  + 1
                    })
                    this.state.credit = this.state.credit*1.2  + 1
                    window.location.href = "/region"          }
            }
            else {
                var fleeChance = Math.floor(Math.random() * (maxWin - minWin + 1) ) + minWin;
                if (fleeChance <= 4) {
                    // fight failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // fight success [go to intended location]
                    this.setState ({
                        credit: this.state.credit*1.2 + 1
                    })
                    this.state.credit = this.state.credit*1.2 + 1
                    window.location.href = "/region"              }
            }
        }
        if (this.state.difficulty == 'hard') {
            
            if (this.state.fighter <= 3) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // fight failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // fight success [go to intended location]
                    this.setState ({
                        credit: this.state.credit*1.2 + 1
                    })
                    this.state.credit = this.state.credit*1.2 + 1

                    window.location.href = "/region"              }
            }
            else {
                var fleeChance = Math.floor(Math.random() * (maxWin - minWin + 1) ) + minWin;
                if (fleeChance <= 4) {
                    // fight failed
                    this.setState({
                        credit: 0,
                        health: this.state.health * 0.8
                    })
                    this.state.credit = 0
                    this.state.health = this.state.health * 0.8
                }
                else {
                    // fight success [go to intended location]
                    this.setState ({
                        credit: this.state.credit*1.2 + 1
                    })
                    this.state.credit = this.state.credit*1.2 + 1

                    window.location.href = "/region"              
                }
            }
        }

        var send_val = {
            'newCargo': this.state.cargo,
            'health': this.state.health,
            'credit': this.state.credit
        }
        console.log(send_val)
        fetch('http://127.0.0.1:80/sendBanditData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},  
            body: JSON.stringify(send_val)
        })

        // var send_val = {
        //     'newCargo': this.state.cargo,
        //     'health': this.state.cargo,
        //     'credit': this.state.cargo
        // }
        // fetch('http://127.0.0.1:80/sendBanditData', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},  
        //     body: JSON.stringify(send_val)
        // }).then(
            
        //     window.location.href = "/region"
            
        //     )


    };
  


    render() {
        return (
            <div className={'trading-page'}>
                <h1 style = {{margin: '25px'}} className={'trading-header'}>You have encountered a bandit!</h1>
                <img src={BanditIcon} alt={'BanditIcon'} />
                {/* update these vars from db */}

                {/* this is where we are pulling in the python function for credits demanded */}
                <h4 style = {{margin: '5px'}}>Credits Demanded: {this.state.demand}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Credits: {this.state.credit}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Cargo Space: {this.state.shipcargo}</h4>
                <Container>
                    <Row>
                        <Col className={'trading-col'}>
                            <h3 className={'trading-subheading'}>Pay</h3>
                                <Button style = {{marginLeft: '10px'}} onClick={this.handlePay}>Pay</Button>
                            <p>Continue to location, losing either credits or cargo. </p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Fight</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleFight}>Fight</Button>
                            <p>Win the fight: Gain credits from the bandit, and continue to location.</p>
                            <p>Lose the fight: Lose all credits, and bandit wrecks your ship.</p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Flee</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleFlee}>Flee</Button>
                            <p>Successfully flee: Return to original location, unscathed.</p>
                            <p>Fail to flee: Lose all credits, and bandit wrecks your ship.</p>

                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Bandit;
