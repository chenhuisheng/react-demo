import React, { Component } from 'react'
import { Router } from '@reach/router'
import Cmtlist from './components/Newslist'
import Detail from './components/Detail'

export class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Cmtlist path="/" />
        <Detail path="/Detail/:id" />
      </Router>
    )
  }
}