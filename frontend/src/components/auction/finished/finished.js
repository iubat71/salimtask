import React, {Component} from 'react';

import './finished.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {auctions} from "../../../reducers/actions";
import { connect } from "react-redux";
import Mynav from '../../../Mynav';
import Footer from '../../../components/Footer/footer';
class finished extends Component {
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
        let finishedAuctions = [];

        for(var i=0;i<this.state.auctions.length;i+=1){
            let auctionTime = new Date(this.state.auctions[i].ending_time);
            let today = new Date();
            console.log('unutar for'+i);
            auctionTime.setTime(auctionTime.getTime());
            today.setTime(today.getTime());

            if (today > auctionTime) {
                console.log('unutar if'+i);
                finishedAuctions.push(
                        <div key={this.state.auctions[i].id} className="col-lg-3 col-md-6 mb-4" id='card'>
                            <div className="card">
                                <img className="card-img-top" src={this.state.auctions[i].image} alt=""/>
                                <div className="card-body">
                                    <h4 className="card-title">Product:{this.state.auctions[i].item}</h4>
                                    <h3>Auction finished</h3>
                                    <p>Highest bid <b> {this.state.auctions[i].highest_bid} Taka</b></p>
                                    <p>Auction won user with id: {this.state.auctions[i].winner_id}</p>
                                    <p>Auction won user with Name:{this.props.user.username}</p>

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
            <h3 style={{textAlign:'center'}}>Finished Auctions</h3>
            <h3 style={{textAlign:'center'}}>There are {finishedAuctions.length} finished auctions. The time of the auctions below expired.</h3>         
            </div>
            <hr/>
            <div className="col-12">
            <div className="row text-center">
            {finishedAuctions}
                      
            </div>
            </div>

            <div className="col-12 mt-5">
            <Footer/>
            </div>
        </div>
        </div>
        // <div className="container">
        //     <header className="jumbotron my-4">
        //         <h1 className="display-3">Finished Auctions</h1>
        //         <p className="lead">There are {finishedAuctions.length} finished auctions. The time of the auctions below expired.</p>
        //         <Link className="btn btn-info" to="/newAuction">New Auction</Link>
        //         <Link className="btn btn-info " to='/'>Back</Link>
        //         <button style={{textAlign: "right"}} className="btn btn-danger" onClick={this.props.logout}>Logout</button>
        //     </header>
        //     <div className="row text-center">
        //         {finishedAuctions}
        //     </div>
        //     <br/>
        //     <br/>
        // </div>
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
        bid: (id, highest_bid, winner_id,winner_name) => dispatch(auctions.bid(id, highest_bid, winner_id,winner_name))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(finished);