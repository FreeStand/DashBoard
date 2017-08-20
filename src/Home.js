import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import QuestionCard from './QuestionCard'
import './App.css'

class App extends Component {
  static propTypes = {
    questions: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  render () {
    const { questions } = this.props;
    const questionsList = (!isLoaded(questions))
                        ? 'Loading'
                        : (isEmpty(questions))
                          ? 'Questions list is empty'
                          : Object.keys(questions).map(function(key,keyI) {
                           return <QuestionCard key={key} id={key} question={questions[key]} />
			  })
     const len =(!isEmpty(questions))?Object.keys(questions).length:0;
     const claimed_len = (!isEmpty(questions))?Object.keys(questions).map((key) => {return questions[key].uID == undefined}).reduce((a,b)=>{return b? a:++a;},0):0
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>FreeStand</h2>
        </div>
        <h3>Total Samples: {len}</h3>
        <h3>Claimed Samples: {claimed_len}</h3>
        <div className='App-question-cards'>
          {questionsList}
        </div>
      </div>
    )
  }
}
const fbWrappedComponent = firebaseConnect([
  '/samples'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(App)

export default connect(
  ({ firebase }) => ({
    questions: dataToJS(firebase, '/samples'),
  })
)(fbWrappedComponent)
