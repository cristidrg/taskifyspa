import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { editTask } from '../../api';

const mapStateToProps = ({form, users, token, tasks}, ownProps) => ({
  form,
  users,
  token,
  task: tasks.find(task => task.id == ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateField: (fieldName) => (e) => {
    let data = {};

    if (e.target.getAttribute('type') == 'checkbox') {
      data[fieldName] = e.target.checked
    } else {
      data[fieldName] = e.target.value;
    }

    return dispatch({type: 'UPDATE_FORM', data})
  },
  edit: (token, formData) => (e) => {
    let task = Object.assign({}, formData);
    task.creator = undefined;
    task.user = undefined;
    task.id = String(task.id);
    task.time_spent = String(task.time_spent);

    fetch(editTask(token, Object.assign({}, task)))
      .then(resp => resp.json())
      .then(json => {
        dispatch({
          type: 'UPDATE_TASKS',
          tasks: json.data,
        });
        alert("Task edited succesfully");
        ownProps.history.push('/');
      }).catch(err => {
        console.log(err);
        alert("Could not edit the task. Please try again.");
      }) 
  },
  clear: () => dispatch({type: 'INIT_FORM'}),
  init: (task) => {
    dispatch({type: 'INIT_FORM'});
    let newData = Object.assign({}, task);
    newData.user_id = task.creator.id;
    dispatch({type: 'UPDATE_FORM', data: newData })
  }
});

class EditTask extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init(this.props.task);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  render() {
    const { form, users, updateField, edit, token } = this.props;
    const { user_id, title, description, completed, time_spent } = form;

    return (
      <Fragment>
        <div className="task-list">
          <p className="task-list__header">Edit Task</p>
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

          <a href="javascript:void(0)" onClick={edit(token.token, form)} className="task-new__submit btn btn-primary">Edit</a>
        </div>
        <Link to="/" className="task-new__return"> Return to task list </Link>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
