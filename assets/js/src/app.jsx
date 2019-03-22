import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header, Footer } from './components/'
import { Login, Register, NewTask, Dashboard, EditTask, ViewTask } from './routes/';

const mapStateToProps = state => ({
  token: state.token
})
console.log(EditTask);
class TaskifyApp extends Component {
  renderRegistrationRoutes() {
    return (
      <Fragment>
        <Route path="/" exact={true} render={() => <Login />} />
        <Route path="/register" exact={true} render={() => <Register />} /> 
      </Fragment>
    )
  }

  renderRoutes() {
    return (
      <Fragment>
        <Route path="/" exact={true} render={() => <Dashboard/>} />
        <Route path="/new-task" exact={true} render={() => <NewTask />} />
        <Route path="/edit-task/:id" exact={true} component={EditTask} />
        <Route path="/view-task/:id" exact={true} component={ViewTask} />
      </Fragment>
    )
  }

  render() {
    const { token } = this.props;
    return (
      <Router>
        <div className="container">
          <Header />
          {token ? this.renderRoutes() : this.renderRegistrationRoutes()}
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps)(TaskifyApp)
