import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

import './QuestionCard.css'

class QuestionCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    id: PropTypes.string
  }
  render(){
    const {question, id} = this.props
	 if(!question.uID) {
	      question.uID="Unclaimed Sample";
	 }
	 if(question){
    return (
      <div>
	  <div>
	      <h3><b>{id}</b></h3>
	      <Grid fluid>
	      <Row>
	          <Col><h4><b>{question.uID}</b></h4> </Col>
	      </Row></Grid>
          </div>
      </div>
    )
  } else {
	  return (
	     <p>Question is Empty.</p>
	  )
  }
}
}
export default QuestionCard
