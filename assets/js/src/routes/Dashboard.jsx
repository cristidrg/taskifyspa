import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../../api';

const mapStateToProps = ({tasks, token}) => ({
  tasks,
  user: token.user_id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTask: (taskId) => (e) => {
    fetch(deleteTask(taskId))
      .then(resp => resp.json())
      .then(json => {
        dispatch({
          type: 'UPDATE_TASKS',
          tasks: json.data,
        });
      }).catch(err => {
        console.error(err)
        alert("Could not delete the task. Please try again.");
      });
  }
})

class Dashboard extends Component {
  renderTask(task, showUser) {
    const { deleteTask, onEdit } = this.props;
    return (
      <li className="task-list__entry">
        <div className="task-list__info">
          <span className="task-list__title">{task.title}</span>
          <div className="task-list__up-right">
            <span className="task-list__time">{task.time_spent}<sub>min</sub></span>
            <span className="task-list__status" data-complete="" >{task.completed ? "✔" : "✖"}</span>
          </div>
        </div>
        <span className="task-list__description">{task.description}</span>
        {showUser ? <span className="task-list__owner">{task.user.name}</span> : null}
        <div className="task-list__buttons">
          <Link to={`/view-task/${task.id}`} className="task-list__view" href="">View</Link>
          <Link to={`/edit-task/${task.id}`} className="task-list__edit" href="">Edit</Link>
          <a className="task-list__del" onClick={deleteTask(task.id)} href="javascript:void(0)">Delete</a>
        </div>
      </li>
    )
  }

  renderOtherTasks() {
    const {tasks, user} = this.props;
    const otherTasks = tasks.filter(task => task.user.id != user);

    if (otherTasks.length == 0) {
      return null;
    } else {
      return (
        <Fragment>
          <p className="task-list__header">Other Tasks</p>
          <ul className="task-list__container">
            {otherTasks.map(task => this.renderTask(task, true))}
          </ul>
        </Fragment>
      )
    }
  }

  renderMyTasks() {
    const {tasks, user} = this.props;
    const myTasks = tasks.filter(task => task.user.id == user);

    if (myTasks.length == 0) {
      return null;
    } else {
      return (
        <Fragment>
          <p className="task-list__header">My Tasks</p>
          <ul className="task-list__container">
            {myTasks.map(task => this.renderTask(task))}
          </ul>
        </Fragment>
      )
    }
  }

  render() {
    return (
      <div className="task-list">
        <p className="task-list__section-header">Dashboard</p>
        <Link className="task-list__add" to="/new-task">+</Link>
        {this.renderMyTasks()}
        {this.renderOtherTasks()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);