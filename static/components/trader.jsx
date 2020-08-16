import React, {Component} from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TraderIcon from "./../assets/img/TraderIcon.png"
class Trader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shipcargo: 0,
            currRegion: '',
            marketplaceInventory: {},
            shipInventory: {},
            credit: 0,
            health: 0,
            fSkill: 0,
            mSkill: 0,
            item: '',
            qty: 0,
            price: 0,
            difficulty: "", 
            negCheck: 0, 
            pilot: 0, 
            eng: 0
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
                    fSkill: data['fighter'],
                    mSkill: data['merch'], 
                    qty: data['qty'],
                    item: data['item'], // same as below
                    price: data['price'], //  from get request in app.py
                    difficulty: data['difficulty'], 
                    pilot: data['pilot'], 
                    eng: data['eng']
                })
            });
    }

    handleBuy = () => {

        //Fill this with proper functionality
        var newQty = 0
        var newCredits = 0
        var newCargo = 0
        var inventory = this.state.shipInventory
        var itemName = this.state.item

        if (this.state.credit >= this.state.price && this.state.qty > 0) {
            newQty = this.state.qty - 1
            newCredits = this.state.credit - this.state.price
            newCargo = this.state.shipcargo - 1
            inventory[itemName]['quantity'] += 1;
            this.setState({
                qty: newQty, 
                credit: newCredits,
                shipcargo: newCargo
            })
        
            var send_val = {
                'cargo': newCargo, 
                'credit': newCredits,
                'shipInventory': inventory,
                'health': this.state.health, 
                'merchant': this.state.mSkill, 
            } 
            fetch('http://127.0.0.1:80/sendTraderData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            }).then ()
        }

    };

    handleIgnore= () => {

        //Finished
        window.location.href = "/region"
    };

    handleRob = () => {
        //karma 
        var newMerchant = this.state.mSkill - Math.floor(this.state.mSkill/2)

        var chance = (this.state.fSkill)/16 * 100

        if (chance > 45) {
            var quant = this.state.qty
            var numItems = Math.floor(Math.random() * Math.floor(this.state.qty - 1))

            var newQty = this.state.qty - numItems
            var inventory = this.state.shipInventory
            inventory[this.state.item]['quantity'] += numItems
            var newCargo = this.state.shipcargo - numItems

            this.setState({
                qty: newQty, 
                shipcargo: newCargo, 
                mSkill: newMerchant, 
            })

            var send_val = {
                'cargo': newCargo, 
                'credit': this.state.credit,
                'shipInventory': inventory, 
                'health': this.state.health, 
                'merchant': newMerchant
            } 

            fetch('http://127.0.0.1:80/sendTraderData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            }).then (window.location.href = "/region")

        } else {
            var healthHurt = 0
            if (this.state.difficulty == 'easy') {
                healthHurt = 10 - this.state.fSkill
            }
            if (this.state.difficulty == 'medium') {
                healthHurt = 15 - this.state.fSkill

            }

            if (this.state.difficulty == 'hard') {
                healthHurt = 20 - this.state.fSkill

            }

            var newHealth = this.state.health - healthHurt

            var send_val = {
                'cargo': this.state.shipcargo, 
                'credit': this.state.credit,
                'shipInventory': this.state.shipInventory, 
                'health': newHealth, 
                'merchant': newMerchant
            } 

            fetch('http://127.0.0.1:80/sendTraderData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            }).then (window.location.href = "/gameScreen")

        }
    };

    handleNegotiate= () => {

        if (this.state.negCheck == 0) {
            this.setState({
                'negCheck': 1
            }) 
            
            var chance = (this.state.mSkill)/16 * 100
            var newPrice = 0;  
    
            if (chance > 45) {
                newPrice = Math.floor(this.state.price/10.0) + 1
                this.setState({
                    'price': newPrice
                }) 
            } else {
                newPrice = this.state.price * 5 + 1
                this.setState({
                    'price': newPrice
                }) 
            }
            
        }

    }; 
  


    render() {
        return (
            <div className={'trading-page'}>
                <h1 style = {{margin: '25px'}} className={'trading-header'}>You have encountered a Trader!</h1>
                <img src={TraderIcon} alt={'TraderIcon'} />
                <h4 style = {{margin: '5px'}}>Remaining Credits: {this.state.credit}</h4>
                <h4 style = {{margin: '5px'}}>Cargo: {this.state.shipcargo}</h4>
                <h4 style = {{margin: '5px'}}>Item to Purchase: {this.state.item} </h4>
                <h3 style = {{margin: '5px'}}>Price: {this.state.price} Stock: {this.state.qty}</h3>

                <Container>
                    <Row>
                        <Col className={'trading-col'}>
                            <h3 className={'trading-subheading'}>Pay</h3>
                                <Button style = {{marginLeft: '10px'}} onClick={this.handleBuy}>Buy</Button>
                            <p>Items you can buy </p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Continue</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleIgnore}>Continue</Button>
                            <p> Move onto region you chose </p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Rob</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleRob}>Rob</Button>
                             <p> Success depends on fighter skill - Win to get items or Lose to damage your ship's health </p>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Negotiate</h3>
                            <Button style = {{marginLeft: '10px'}} onClick={this.handleNegotiate}>Negotiate</Button>
                             <p> Negotiate for a lower price - but, beware it may be higher than it used to be. Time to put those merchant skills to work - you can only negotiate once! </p>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Trader;
