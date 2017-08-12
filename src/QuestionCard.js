import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';

import './QuestionCard.css'

class QuestionCard extends Component {
  static propTypes = {
    question: PropTypes.object
  }

  render(){
    const {question} = this.props
	 if(question){
    return (
      <div className="card">
	  <div className="container">
	      <h3><b>{question.question}</b></h3>
	      <Grid fluid>
	      <Row>
                  <Col xs={6} sm={6} md={4} lg={2}>
		  <img style={{ borderWidth:1, borderColor:'rgba(0,0,0,0.2)', alignItems:'center', justifyContent:'center', width:100, height:100, backgroundColor:'#fff', borderRadius:100, }} src={question.thumbnailUri} alt="Avatar"></img>
		  </Col>
	          <Col  xs={6} sm={6} md={8} lg={10}><h4><b>{question.authorName}</b></h4> </Col>
	      </Row></Grid>
	      <p>{question.answer}</p> 
          </div>
      </div>
    )
  } else {
	  return (
	     <p></p>
	  )
  }
}
}
export default QuestionCard
