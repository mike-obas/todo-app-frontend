import axios from "../../axiosConfig";
// Async requests for data

//For creating new Todos and updating existing ones
export function manageTodo(queryType, inputs) {
  return axios
    .post(`/manageTodo/${queryType}`, inputs)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);
}

//Handles deletion of Todos
export function deleteTodo(noteId) {
  return axios
    .get(`/deleteTodo/${noteId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => err.response.data);
}

//Handles the fetching of recent todos
export function firstBatchTodos(orderClause) {
  return axios
    .get(`/getTodos/${orderClause}`)
    .then((res) => {
      let newObj = {};
      let reducedObj = res.data;
      reducedObj.shift();
      reducedObj.map((item) => (newObj[item.noteId] = item));
      return newObj;
    })
    .catch();
}
//handles the fetching of a single Todo
export function eachTodo(noteId) {
  return axios.get(`/eachTodo/${noteId}`);
}
