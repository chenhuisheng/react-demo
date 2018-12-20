import React, { Component } from 'react'
import { Router } from '@reach/router'
import Newslist from './components/Newslist'
import Detail from './components/Detail'

export class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Newslist path="/" />
        <Detail path="/Detail/:id" />
      </Router>
    )
  }
}