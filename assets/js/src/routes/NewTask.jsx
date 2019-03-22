import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api, { createTask } from '../../api';

const mapStateToProps = ({form, users, token}) => ({
  form,
  users,
  token
});

const mapDispatchToProps = (dispatch) => ({
  updateField: (fieldName) => (e) => {
    let data = {};

    if (e.target.getAttribute('type') == 'checkbox') {
      data[fieldName] = e.target.checked
    } else {
      data[fieldName] = e.target.value;
    }

    return dispatch({type: 'UPDATE_FORM', data})
  },
  submit: (token, formData) => (e) => {
    fetch(createTask(token, formData))
      .then(resp => resp.json())
      .then(json => {
        alert("Successfully created the task!");
        dispatch({
          type: 'ADD_TASK',
          task: json.data,
        });
      }).catch(err => {
        console.log(err);
        alert("Could not create the task. Please try again.");
      }) 
  },
});

const NewTask = ({form, users, updateField, submit, token}) => {
  const { user_id, title, description, completed, time_spent } = form;

  return (
    <Fragment>
      <div className="task-list">
        <p className="task-list__header">Create new task</p>
        <div className="task-new__select">
          <p className="task-new__select-label">Task Owner</p>
          <select className="task-new__select-input" type="select"
            name="user_id" value={user_id} onChange={updateField("user_id")}>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <input className="task-new__input" type="text" value={title}
            name="name" placeholder="Task name" onChange={updateField("title")}/>
        <textarea className="task-new__txtbox" type="text" value={description}
            name="description" placeholder="Task description" onChange={updateField("description")}/>
        <div className="task-new__last-row">
          <p> Is task complete ? </p>
          <input type="checkbox" className="task-new__complete" value={completed} onChange={updateField("completed")}/>
          <p className="task-new__minutes"> Minutes spent on task </p>
          <input type="number" className="task-new__increment" value={time_spent} name="time_spent" min="0" step="15" 
            onChange={updateField("time_spent")}/>
        </div>

        <a href="javascript:void(0)" onClick={submit(token.id, form)} className="task-new__submit btn btn-primary">Submit</a>
      </div>
      <Link to="/" className="task-new__return"> Return to task list </Link>
    </Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
