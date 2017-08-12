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
    questions: PropTypes.array,
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
                          : Object.keys(questions).map((key) => (
                            <QuestionCard key={key} question={questions[key]} />
			    ))
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>BountyFeed</h2>
        </div>
        <div className='App-question-cards'>
          <input type="text" style={{width:'70%',marginTop:'3%'}}/>
          {questionsList}
        </div>
      </div>
    )
  }
}
const fbWrappedComponent = firebaseConnect([
  '/feed/cryptocurrency'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(App)

export default connect(
  ({ firebase }) => ({
    questions: dataToJS(firebase, '/feed/cryptocurrency'),
  })
)(fbWrappedComponent)
