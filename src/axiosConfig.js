import axios from 'axios';
const instance = axios.create({
    baseURL:  "https://europe-west2-openkit-todo-app.cloudfunctions.net/api"
});
// Where you would set stuff like your 'Authorization' header, etc ...
//axios.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;