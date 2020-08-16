import React, {Component} from 'react'

class Gameover extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1 className="display-3">Game Over! Better luck next time</h1>
                </div>
                <Button className = "gamestart" variant="primary" size="lg" block href="/login">
                    Play again
                </Button>
            </div>
        )
    }
}

export default Gameover;
