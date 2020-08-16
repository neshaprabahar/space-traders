import React, {Component} from 'react'

class Home extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div data-spy="scroll" data-target=".fixed-top">
                <div className="banner-area banner-1">
                    <div className="row">
                        <div className="col-lg-8 m-auto text-center col-sm-12 col-md-12">
                            <div className="banner-content content-padding">
                                <a href="/login" className="btn btn-white btn-circled startBtn">lets start</a>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="assets/js/jquery.min.js"></script>
            </div>
        )
    }
}

export default Home;
