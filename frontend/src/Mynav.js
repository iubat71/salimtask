
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { connect } from "react-redux";
 class Mynav extends Component {
  render() {
    return (
        <div> 
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start bg-warning p-3">
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none mr-5" >
            Bidding Site                  </Link>&nbsp;&nbsp;
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="btn btn-primary">Home</Link></li>&nbsp;
            <li><Link to="/active" className="btn btn-primary">Active Bidding</Link></li>&nbsp;
            <li><Link to="/newauction" className="btn btn-primary">New Product Bidding </Link></li>&nbsp;
   


    
         
          </ul>
          <div className="m-auto" style={{color:'#39CCCC',fontSize:"25px"}}>Hello-{this.props.user.username} </div>
          <div className="dropdown text-end">
            <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width={32} height={32} className="rounded-circle" />
            </Link>
            <ul className="dropdown-menu text-small" style={{}}>
              <li><Link className="dropdown-item" to="/active">Active Bidding</Link></li>
              <li><Link className="dropdown-item" to="/finished">Status Bidding</Link></li>
              <li><Link className="dropdown-item" to="/winning">Top Bidding User</Link></li>

             
            
              <li><a className="dropdown-item" href="/">Sign out</a></li>
            </ul>
          </div>
          
              
        </div>
     
    
      </div>
    )
  }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
       // auctions: state.auctions.auctions
    }
}
export default connect(mapStateToProps)(Mynav)
