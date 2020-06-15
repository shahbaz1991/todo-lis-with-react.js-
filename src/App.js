import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Add from './compo/Add';
import Task from './compo/Task';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      arr: []
    }
  }
  get_refresh = () => {
    return axios.get('http://127.0.0.1:5000/todo')
      .then(resp => {
        this.setState({
          arr: resp.data
        },
        )
      })
      .catch(error => { console.log(error) })
  }
  render() {
    return (
      <div className='todo'>
        <div className="add">
          ADD
          <Add funt={this.get_refresh} />
        </div>
        <div className='task_main'>
          TASK
          <Task funt={this.get_refresh} arr={this.state.arr} />
        </div>
      </div>
    );
  }
}

export default App;
