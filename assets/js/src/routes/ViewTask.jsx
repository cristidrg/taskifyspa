import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({tasks}, ownProps) => ({
  task: tasks.find(task => task.id == ownProps.match.params.id),
});

const ViewTask = ({task}) => {
  return (
    <div className="task-list">
      <div className="task-indiv__info">
        <p className="task-indiv__header">{task.title}</p>
        <span className="task-list__time">{task.time_spent}</span>
        <span className="task-list__status" data-complete="">{task.completed ? '✔' : '✖'}</span>
      </div>
      <span className="task-indiv__description">{task.description}</span>
      <div className="task-indiv__links">
        <span className="task-list__owner">{task.user.name}</span>
        <Link to={`/edit-task/${task.id}`}>Edit</Link>
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ViewTask);
