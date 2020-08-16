import React, {Component} from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Region extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            shipcargo: 0,
            currRegion: '',
            marketplaceInventory: {},
            shipInventory: {},
            credit: 0, 
            fuel: 0, 
            fuelcost: 0, 
            health: 0, 
            repair: 0 
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:80/getMarketData')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    username: data['username'],
                    currRegion: data['currRegion'],
                    marketplaceInventory: data['market_inventory'],
                    shipInventory: data['ship_inventory'],
                    shipcargo: data['cargo'],
                    credit: data['credit'], 
                    fuel: data['fuel'], 
                    fuelcost: data['fuelcost'], 
                    health: data['health'],
                    repair: data['repair']
                })
            });
    }
 
    handleBack() {
        window.location.href = "/gameScreen"
    };
    
    handleBuy = async (event) => {
        if (this.state.shipcargo == 0 ) {
            alert("No cargo space left")
        } else if (this.state.credit - this.state.marketplaceInventory[event.target.value]['buy'] < 0) {
            alert("Insufficient funds to make this purchase")
        } else {
            var itemName = event.target.value;
            if (event.target.value == (this.state.username + "'s Universe")) {
                window.location.href = "/winscreen"
            }
            var send_val = {};
            var tempMarket = this.state.marketplaceInventory;
            tempMarket[itemName]['quantity'] -=  1;
            var temp_ship = this.state.shipInventory;
            temp_ship[itemName]['quantity'] += 1;
            await this.setState({
                shipcargo: this.state.shipcargo - 1,
                marketplaceInventory: tempMarket,
                shipInventory: temp_ship,
                credit: this.state.credit - this.state.marketplaceInventory[event.target.value]['buy']
            })
            send_val = {
                'item_name': itemName,
                'ship_quantity': this.state.shipInventory[itemName]['quantity'],
                'newCargo': this.state.shipcargo,
                'market_quantity': this.state.marketplaceInventory[itemName]['quantity'],
                'credit': this.state.credit
            }
            fetch('http://127.0.0.1:80/sendMarketData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            })
        }
    };

    handleSell = async (event) => {
        if (this.state.shipInventory[event.target.value]['quantity'] > 0) {
            var itemName = event.target.value;
            var send_val = {};
            var tempMarket = this.state.marketplaceInventory;
            tempMarket[itemName]['quantity'] += 1;
            var temp_ship = this.state.shipInventory;
            temp_ship[itemName]['quantity'] -= 1;
            await this.setState({
                shipcargo: this.state.shipcargo + 1,
                marketplaceInventory: tempMarket,
                shipInventory: temp_ship,
                credit: this.state.credit + this.state.marketplaceInventory[event.target.value]['sell']
            })
            send_val = {
                'item_name': itemName,
                'ship_quantity': this.state.shipInventory[itemName]['quantity'],
                'newCargo': this.state.shipcargo,
                'market_quantity': this.state.marketplaceInventory[itemName]['quantity'],
                'credit': this.state.credit
            }
            fetch('http://127.0.0.1:80/sendMarketData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            })
        }
    };

    generateBuy = (inventory) => {
        var card = [];
        var i = 0;
        for (var key in inventory) {
            if (inventory[key]['quantity'] > 0) {
                card[i] = <Card key={key} className={'trade-card'} bg={"dark"} text={"white"} style={{margin: '5px'}}>
                    <Card.Body>
                        <h3 className={'trade-item-name'}>{key}</h3>
                        <Card.Text>
                            <span style={{display: 'block', fontSize: '20px'}} className={'trade-item-data'}>Buy Price: {inventory[key]['buy']}</span>
                            <span style={{display: 'block', fontSize: '20px'}} className={'trade-item-data'}>Sell Price: {inventory[key]['sell']}</span>
                            <span style={{display: 'block', fontSize: '20px'}} className={'trade-item-data'}>Quantity: {inventory[key]['quantity']}</span>
                        </Card.Text>
                        <Button value={key} onClick = {this.handleBuy}>
                            Buy
                        </Button>
                    </Card.Body>
                </Card>
                i++;
            }
        }
        return card;
    };

    generateSell = (inventory) => {
        var card = [];
        var i = 0;
        for (var key in inventory) {
            if (inventory[key]['quantity'] > 0) {
                card[i] = <Card key={key} className={'trade-card'} bg={"dark"} text={"white"} style={{margin: '5px'}}>
                    <Card.Body>
                        <h3 className={'trade-item-name'}>{key}</h3>
                        <Card.Text>
                            <span style = {{fontSize: '20px'}} className={'trade-item-data'}>Quantity: {inventory[key]['quantity']}</span>
                        </Card.Text>
                        <Button value={key} onClick = {this.handleSell}>
                            Sell
                        </Button>
                    </Card.Body>
                </Card>
                i++;
            }
        }
        return card;
    };
    
    handleFuel = () => {

        if (this.state.credit >= this.state.fuelcost) {

            var newFuel = this.state.fuel + 50; 
            var newCredits = this.state.credit - this.state.fuelcost; 

            this.setState({
                fuel: newFuel, 
                credit: newCredits
            })
            
            var send_val = {
                'fuel': newFuel, 
                'credit': newCredits,
                'health': this.state.health
            } 
            fetch('http://127.0.0.1:80/sendCostData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            }).then ()
        }
    
    };

    handleRepair = () => {

        if (this.state.credit >= this.state.repair) {

            var newHealth = this.state.health + 50; 
            var newCredits = this.state.credit - this.state.repair; 

            this.setState({
                health: newHealth, 
                credit: newCredits
            })
            
            var send_val = {
                'fuel': this.state.fuel, 
                'credit': newCredits,
                'health': newHealth
            } 
            fetch('http://127.0.0.1:80/sendCostData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},  
                body: JSON.stringify(send_val)
            }).then ()
        }
    
    };
    
    render() {
        return (
            <div className={'trading-page'}>
                <h1 style = {{margin: '25px'}} className={'trading-header'}>Welcome to {this.state.currRegion}'s Marketplace!</h1>
                <h4 style = {{margin: '5px'}}>Remaining Credits: {this.state.credit}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Cargo Space: {this.state.shipcargo}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Fuel: {this.state.fuel}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Health: {this.state.health}</h4>

                <h4 style = {{margin: '5px'}}>Repair Health by 50: {this.state.repair} Credits</h4>
                <Button style = {{marginLeft: '10px'}} onClick={this.handleRepair}>Repair Health</Button>

                <h4 style = {{margin: '5px'}}>Recharge Fuel by 50: {this.state.fuelcost} Credits</h4>
                <Button style = {{marginLeft: '10px'}} onClick={this.handleFuel}>Buy Fuel</Button>

                <Button style = {{marginLeft: '10px'}} onClick={this.handleBack}>Back</Button>

                <Container>
                    <Row>
                        <Col className={'trading-col'}>
                            <h3 className={'trading-subheading'} >Your Inventory</h3>
                            <div>{this.generateSell(this.state.shipInventory)}</div>
                        </Col>
                        <Col className={'trading-col'} >
                            <h3 className={'trading-subheading'}>Marketplace</h3>
                            <div>{this.generateBuy(this.state.marketplaceInventory)}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Region;
