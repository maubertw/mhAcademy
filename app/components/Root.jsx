import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


import Home from './Home.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import AllCampuses from './Campus/AllCampuses.jsx';
import AddCampus from './Campus/AddCampus.jsx';


import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {


	componentDidMount (){
		this.props.fetchInitialData();
	}


  render () {
    return (
      <Router>
				<div id="roots">
			    <NavBar />
				  <Route exact path="/" component={Home} />
					<Route exact path="/campuses" component={AllCampuses} />
					<Route exact path="/campuses/addCampus" component={AddCampus} />
			    <Footer />
			  </div>
		  </Router>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = (dispatch) => {
		return {fetchInitialData : () => {
			//console.log('fetch', fetchCampuses)
			dispatch(fetchCampuses());
			dispatch(fetchStudents());
		}
	}

}


export default connect(mapState, mapDispatch)(Root);
