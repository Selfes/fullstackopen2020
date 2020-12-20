import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
                .then((response) => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data);
}

const update = (changedPerson) => {
    return axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson).then((response) => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const personService = { getAll, create, remove, update }

export default personService;
