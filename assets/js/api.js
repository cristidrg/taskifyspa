import store from './store';

const config = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
}

const login = (email, pass) => new Request("/taskify-api//token", Object.assign({},
  config, 
  {body: JSON.stringify({email, pass}) }
));

const register = (email, name, password) => new Request("/taskify-api//users", Object.assign({},
  config, 
  {body: JSON.stringify({user: {email, name, password}}) }
));

const createTask = (token, payload) => new Request("/taskify-api//tasks", Object.assign({},
  config,
  {body: JSON.stringify({token, task: payload})},
));

const deleteTask = (taskId) => new Request(`/taskify-api//tasks/${taskId}`, Object.assign({},
  config,
  {method: 'DELETE', body: JSON.stringify(taskId)}
));

const editTask = (token, payload) => new Request(`/taskify-api//tasks/${payload.id}`, Object.assign({},
  config,
  {method: "PATCH", body: JSON.stringify({token, task: payload})}
));

const getTasks = new Request('/taskify-api//tasks', Object.assign({},
  config,
  {method: "GET"},
));

const getUsers = new Request('/taskify-api//users', Object.assign({},
  config,
  {method: 'GET'}
));

export {
  login,
  register,
  createTask,
  deleteTask,
  editTask,
  getTasks,
  getUsers
}
