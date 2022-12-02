import React, { Component } from 'react';
import axios from 'axios';
//import axios from '../axios';
//import User from '../components/users/user.js';
import Auction from '../components/auction/auction';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auctions.css';
import {auth,auctions} from "../reducers/actions";
import { connect } from "react-redux";
// import {Link} from "react-router-dom";
import Footer from '../components/Footer/footer';
import Mynav from '../Mynav';


class Auctions extends Component {
    state = {
        auctions:[],
        error: false,
        bid:0
    }

    componentDidMount () {
        axios.get( 'http://localhost:8000/api/auctions/' )
            .then( response => {
                const auction = response.data.slice(0, 15);
                const updatedAuctions = auction.map(post => {
                    return {
                        ...post
                    }
                });
                this.setState({auctions: updatedAuctions});
                console.log( response );
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    render () {
        let auctions = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!this.state.error) {
            auctions = this.state.auctions.map(auction => {
                return <Auction
                    key={auction.id}
                    id={auction.id}
                    item={auction.item}
                    highest_bid={auction.highest_bid}
                    ending_time={auction.ending_time}
                    image={auction.image}
                    owner_id={auction.winner_id}
                    newWinner={this.props.user.id}
                    bid={this.props.bid}
                />;
            });
        }
        //console.log(this.props.auctions);

        return (
            <div className="container-fluid" id="bid">
     
<Mynav/>


<div className="row" >
    <div className="col-12">
    <h1 style={{textAlign:'center'}}>Welcome {this.props.user.username}</h1>
    <h3 style={{textAlign:'center'}}>All Bidding/Auction List</h3>


    </div>
    <hr/>
    <div className="col-12 " >
    <div className="row text-center" >
    
                    {auctions}
                

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
       // auctions: state.auctions.auctions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        bid: (id, highest_bid, winner_id) => dispatch(auctions.bid(id, highest_bid, winner_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auctions)