import React from 'react';
import { Component } from 'react';
import Avatar from './CampusAvatar';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link, NavLink } from 'react-router-dom';


class AllCampuses extends Component {
  constructor (props){
    super(props)
  }

  render () {

    return (
     <div className="allCampus-main-content">
          <div className="header">
            <h1>All Campuses</h1>
            <Link to="/campuses/addCampus"> <button className="add-student-button">add campus</button></Link>
          </div>
          <div className="instance-boxes">
          {
            this.props.campuses.length > 0 && true ?
            this.props.campuses.map(campus => <Avatar name={campus.name} image={campus.imgUrl} key={campus.id} />) :
            <p>there are no campuses listed</p>
          }
          </div>
          </div>)
  }
}



const mapState = (state) => {
    return {
      campuses: state.campuses
    }
};




export default connect(mapState)(AllCampuses);



//export default AllCampuses
