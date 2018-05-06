import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { addCampus } from '../../reducers/campuses'


class AddCampus extends Component {
  constructor (props) {
    super(props);
    this.addACampus = this.addACampus.bind(this);
  }

  async addACampus (event) {
    event.preventDefault();
    console.log('EVENT', event)
    const campus = {
      name: event.target.name.value,
      imageUrl: event.target.imageUrl.value,
      description: event.target.description.value,
    };
    await this.props.addCamp(campus);
    console.log('campus added')
  }

render () {
  return (
    <div className="center stack-elements">
        <h1>Campus/Student Name</h1>
          <form onSubmit={this.addACampus}>
            Name:<input type="text" name="name" />
            Campus Image:<input type="text" name="imageUrl" />
            Description:<input type="text" name="description" />
            <button type="submit" className="add-student-button" >Add Campus/Student</button>
          </form>
      </div>)
  }
}


const mapState = null;

const mapDispatch = (dispatch) => {
  return { addCamp :  (campus) => {
    dispatch(addCampus(campus));
  }
 }
}


export default connect(mapState, mapDispatch)(AddCampus);


