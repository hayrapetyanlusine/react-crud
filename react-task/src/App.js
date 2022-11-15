import { useEffect, useRef, useState } from 'react';
import './App.css';
import { CreateTable } from './task/task';
import axios from "axios";
import { Modal } from './task/modal/modal';
import { Edit } from './task/modal/edit';

const url = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [data, setData] = useState([]);
  const modalRef = useRef(null);
  const editRef = useRef(null);

  async function getData() {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    getData();
  }, [])

  const delItem = (id) => {
    axios.delete(`${url}/${id}`);

    const filteredData = data.filter(i => i.id !== id);
    setData(filteredData);
  }

  const editItem = async (id, name, username, email) => {
    // const put = await axios.put(`${url}/${id}`, {name, username, email});

    const newData = data.map(data => {
      if (data.id === +id) {
        const n = name === "" ? data.name : name;
        const u = username === "" ? data.username : username;
        const e = email === "" ? data.email : email;

        return { ...data, name: n, username: u, email: e };
      } else {
        return data;
      }
    });

    setData(newData);
  }

  const pushItem = async (name, username, email) => {
    const post = await axios.post(url, { name, username, email });

    const newData = [...data, post.data];
    setData(newData);
  }

  return (
    <div className="App">
      <CreateTable
        data={data}
        modalRef={modalRef}
        editRef={editRef}

        del={(id) => {
          delItem(id)
        }}
      />

      <Modal modalRef={modalRef}
        onSubmit={(name, username, email) => {
          pushItem(name, username, email);
        }}>
      </Modal>

      <Edit editRef={editRef}
        onEdit={(id, name, username, email) => {
          editItem(id, name, username, email);
        }}>
      </Edit>

    </div>
  );
}

export default App;