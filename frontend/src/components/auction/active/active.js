import React, {Component} from 'react';

import './active.css';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import {auctions} from "../../../reducers/actions";
import { connect } from "react-redux";
import Countdown from 'react-countdown-now';

import Mynav from '../../../Mynav';
import Footer from '../../../components/Footer/footer';

class active extends Component {
    state = {
        auctions: []
    };

    componentDidMount() {
        axios.get('http://localhost:8000/auctions/')
            .then(response => {
                const auction = response.data;
                const updatedAuctions = auction.map(auctions => {
                    return {
                        ...auctions
                    }
                });
                this.setState({auctions: updatedAuctions});
                //console.log(this.state.auctions);
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    render() {

        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        let activeAuctions = [];

        for(var i=0;i<this.state.auctions.length;i+=1){
            let auctionTime = new Date(this.state.auctions[i].ending_time);
            let today = new Date();

            auctionTime.setTime(auctionTime.getTime());
            today.setTime(today.getTime());

            if (today < auctionTime) {
                console.log('unutar if'+i);
                activeAuctions.push(
                    <div className="col-lg-3 col-md-6 mb-4" id='card'>
                        <div className="card">
                            <Link to={"/"+this.props.id}>
                                <img className="card-img-top" id='cardimg' src={this.state.auctions[i].image} alt=""/>
                            </Link>
                            <div className="card-body">
                                <h4 className="card-title">{this.state.auctions[i].item}</h4>
                                <p>Highest bid <b> {this.state.auctions[i].highest_bid} Taka</b></p>
                            </div>
                            <div className="card-footer">
                                <Link className='btn btn-success btn-block' to={"/"+this.state.auctions[i].id}>Bid</Link>
                                <p>Time left <b><Countdown date={this.state.auctions[i].ending_time}/></b></p>
                            </div>
                        </div>
                    </div>);

            };

        }



        return (
               <div className="container-fluid">
     
            <Mynav/>
            
            
            <div className="row">
                <div className="col-12">
                <h1 style={{textAlign:'center'}}>Welcome {this.props.user.username}</h1>
                <h3 style={{textAlign:'center'}}>Active Auctions</h3>
                <h3 style={{textAlign:'center'}}>There are {activeAuctions.length} active auctions. You can still bid.</h3>         
                </div>
                <hr/>
                <div className="col-12">
                <div className="row text-center">
                                {activeAuctions}
                          
                </div>
                </div>

                <div className="col-12 mt-5">
                <Footer/>
                </div>
            </div>
            </div>
         


         
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bid: (id, highest_bid, winner_id) => dispatch(auctions.bid(id, highest_bid, winner_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(active);