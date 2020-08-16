import React, {Component} from 'react'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


class BuyRepair extends Component{
    constructor(props) {
        super(props);
        this.state = {
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
                    credit: data['credit'], 
                    fuel: data['fuel'], 
                    fuelcost: data['fuelcost'], 
                    health: data['health'],
                    repair: data['repair']
                })
            });
    }
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

    handleBack() {
        window.location.href = "/gameScreen"
    };

    render() {
        return (
            <div className={'trading-page'}>
                <h1 style = {{margin: '25px'}} className={'trading-header'}>Recharge your Ship!</h1>
                <h4 style = {{margin: '5px'}}>Remaining Credits: {this.state.credit}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Cargo Space: {this.state.shipcargo}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Fuel: {this.state.fuel}</h4>
                <h4 style = {{margin: '5px'}}>Remaining Health: {this.state.health}</h4>

                <h4 style = {{margin: '5px'}}>Repair Health by 50: {this.state.repair} Credits</h4>
                <Button style = {{marginLeft: '10px'}} onClick={this.handleRepair}>Repair Health</Button>

                <h4 style = {{margin: '5px'}}>Recharge Fuel by 50: {this.state.fuelcost} Credits</h4>
                <Button style = {{marginLeft: '10px'}} onClick={this.handleFuel}>Buy Fuel</Button>

                <Button style = {{marginLeft: '10px'}} onClick={this.handleBack}>Back</Button>

            </div>
        );
    }
}

export default BuyRepair;
