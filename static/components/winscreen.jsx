import React, {Component} from 'react'

class Winscreen extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1 className="display-3">Yeeeet! you won. You wanna break your record. Play Again</h1>
                </div>
                <Button className = "gamestart" variant="primary" size="lg" block href="/login">
                    Play again
                </Button>
            </div>
        )
    }
}

export default Winscreen;
