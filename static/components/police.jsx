import React, {Component} from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PoliceIcon from "./../assets/img/policeIcon.png"
class Police extends Component{
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
            fSkill: 0, 
            pilot: 0, 
            difficulty: "", 
            stolen: ''
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
                    fSkill: data['fighter'],
                    health: data['health'],
                    pilot: data['pilot'],
                    demand: data['demand'],
                    stolen: data['stolen'],
                    difficulty: data['difficulty']
                })
            });
    }

    handleForfeit = () => {
        var inventory = this.state.shipInventory
        var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']

        inventory[this.state.stolen]['quantity'] = 0
    
        var send_val = {
            'cargo': newCargo, 
            'credit': this.state.credit, 
            'health': this.state.health, 
            'shipInventory': inventory, 
        } 

        fetch('http://127.0.0.1:80/sendTraderData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},  
            body: JSON.stringify(send_val)
        }).then (window.location.href = "/region")
        
    };

    handleFlee = () => {
        let minLose = 0
        let maxLose = 7
        let minWin = 2
        let maxWin = 9
        var inventory = this.state.shipInventory
        
        if (this.state.difficulty == 'easy') {
            if (this.state.pilot <= 6) {
                var fleeChance = Math.floor(Math.random() * (maxLose - minLose + 1) ) + minLose;
                if (fleeChance <= 4) {
                    // flee failed
                    var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']
                    inventory[this.state.stolen]['quantity'] = 0
                    var newCredit = Math.floor(this.state.credit * 0.8)
                    var newHealth = this.state.health * 0.8
                    this.setState({
                        shipcargo: newCargo,
                        credit: newCredit,
                        health: newHealth
                        
                    })
                    var send_val = {
                        'cargo': this.state.shipcargo,
                        'credit': this.state.credit,
                        'health': this.state.health, 
                        'shipInventory': inventory
                    }

                    fetch('http://127.0.0.1:80/sendPoliceData', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},  
                        body: JSON.stringify(send_val)
                    }).then(window.location.href = "/gameScreen") 
 
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
                    var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']
                    inventory[this.state.stolen]['quantity'] = 0 
                    var newCredit = Math.floor(this.state.credit * 0.8)
                    var newHealth = this.state.health * 0.8
                    this.setState({
                        shipcargo: newCargo,
                        credit: newCredit,
                        health: newHealth
                    })

                    var send_val = {
                        'cargo': this.state.shipcargo,
                        'credit': this.state.credit,
                        'health': this.state.health, 
                        'shipInventory': inventory
                    }

                    fetch('http://127.0.0.1:80/sendPoliceData', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},  
                        body: JSON.stringify(send_val)
                    }).then(window.location.href = "/gameScreen")  

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
                    var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']
                    inventory[this.state.stolen]['quantity'] = 0
                    var newCredit = Math.floor(this.state.credit * 0.8)
                    var newHealth = this.state.health * 0.8
                    this.setState({
                        shipcargo: newCargo,
                        credit: newCredit,
                        health: newHealth
                    })

                    var send_val = {
                        'cargo': this.state.shipcargo,
                        'credit': this.state.credit,
                        'health': this.state.health, 
                        'shipInventory': inventory
                    }

                    fetch('http://127.0.0.1:80/sendPoliceData', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},  
                        body: JSON.stringify(send_val)
                    }).then(window.location.href = "/gameScreen") 
                  


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
                    var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']
                    inventory[this.state.stolen]['quantity'] = 0
                    var newCredit = Math.floor(this.state.credit * 0.8)
                    var newHealth = this.state.health * 0.8
                    this.setState({
                        shipcargo: newCargo,
                        credit: newCredit,
                        health: newHealth
                    })

                    var send_val = {
                        'cargo': this.state.shipcargo,
                        'credit': this.state.credit,
                        'health': this.state.health, 
                        'shipInventory': inventory
                    }

                    fetch('http://127.0.0.1:80/sendPoliceData', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},  
                        body: JSON.stringify(send_val)
                    }).then(window.location.href = "/gameScreen") 
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
                    var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']
                    inventory[this.state.stolen]['quantity'] = 0
                    var newCredit = Math.floor(this.state.credit * 0.8)
                    var newHealth = this.state.health * 0.8
                    this.setState({
                        shipcargo: newCargo,
                        credit: newCredit,
                        health: newHealth
                    })

                    var send_val = {
                        'cargo': this.state.shipcargo,
                        'credit': this.state.credit,
                        'health': this.state.health, 
                        'shipInventory': inventory
                    }

                    fetch('http://127.0.0.1:80/sendPoliceData', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},  
                        body: JSON.stringify(send_val)
                    }).then(window.location.href = "/gameScreen") 
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
                    var newCargo = this.state.shipcargo + inventory[this.state.stolen]['quantity']
                    inventory[this.state.stolen]['quantity'] = 0
                    var newCredit = Math.floor(this.state.credit * 0.8)
                    var newHealth = this.state.health * 0.8
                    this.setState({
                        shipcargo: newCargo,
                        credit: newCredit,
                        health: newHealth
                    })

                    var send_val = {
                        'cargo': this.state.shipcargo,
                        'credit': this.state.credit,
                        'health': this.state.health, 
                        'shipInventory': inventory
                    }

                    fetch('http://127.0.0.1:80/sendPoliceData', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},  
                        body: JSON.stringify(send_val)
                    }).then(window.location.href = "/gameScreen") 
                }
                else {
                    // flee success [back to original location]
                    window.localStorage.setItem("usePreviousLocation", "true")

                    window.location.href = "/gameScreen"                
                }
            }
        }
        // var send_val = {
        //     'cargo': this.state.shipcargo,
        //     'credit': this.state.credit,
        //     'health': this.state.health, 
        //     'shipInventory': inventory
        // }
        // console.log(send_val)
        // fetch('http://127.0.0.1:80/sendPoliceData', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},  
        //     body: JSON.stringify(send_val)
        // })
    };

    handleFight = () => {
        var chance = (this.state.fSkill)/16 * 100

        var inventory = this.state.shipInventory
        
        var item = this.state.stolen
        var newCargo = this.state.shipcargo + inventory[item]['quantity']
        inventory[item]['quantity'] = 0

        if (chance > 45) {
            window.location.href = "/region"   
        } else {
            var send_val = {
                'cargo': newCargo,
                'credit': this.state.credit,
                'health': this.state.health * 0.5, 
                'shipInventory': inventory
            }

            fetch('http://127.0.0.1:80/sendPoliceData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            }).then (window.location.href = "/gameScreen")
        } 
    };
  

    
    render() {
        console.log(this.state.shipInventory)
        return (
            <div className={'trading-page'}>
                <h1 style = {{margin: '25px'}} className={'trading-header'}>You have encountered the Police!</h1>
                <h2 style = {{margin: '25px'}} className={'trading-header'}>Suspected Item: {this.state.stolen}</h2>
                <img src={PoliceIcon} alt={'PoliceIcon'} />
                {/* update these vars from db */}

                {/* this is where we are pulling in the python function for credits demanded */}
                <h4 style = {{margin: '5px'}}>Remaining Credits: {this.state.credit}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Cargo Space: {this.state.shipcargo}</h4>
                <Container>
                    <Row>
                        <Col className={'trading-col'}>
                            <h3 className={'trading-subheading'}>Forfeit</h3>
                                <Button style = {{marginLeft: '10px'}} onClick={this.handleForfeit}>Forfeit</Button>
                            <p>Forfeit the suspected items - move to the desired location</p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Fight</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleFight}>Fight</Button>
                            <p> Try to fight the police. If you win, you move to the desired location, and if you don't you lose the items </p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Flee</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleFlee}>Flee</Button>
                            <p> Try to flee the authority. If you can, you go back to your original location but keep your 'stolen' items. If you don't, you pay a fine, lose the items, and have damaged health. It be like that </p>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Police;
