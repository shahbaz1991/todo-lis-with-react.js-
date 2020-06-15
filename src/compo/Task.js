import React, { Component } from 'react'
import axios from 'axios'
import Dis from './Dis'

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dis: { task: '' },
            dis_id: ''
        }
    }
    handleChange = (e) => {
        let object = { ...this.state.dis, ...{ task: e.target.value } }
        this.setState({
            dis: object
        })
    }

    componentDidMount() {
        return this.props.funt();
    }

    handleDetails = (t) => {
        this.setState({
            dis: t,
            dis_id: t.id
        })
    }
    handleDis = (task) => {
        this.setState((prestate, curtprops) => ({
            dis: { ...prestate, task: task }
        }));
    }
    handleUpdate = (e) => {
        //e.preventDefault()
        axios.put('http://127.0.0.1:5000/todo/' + this.state.dis_id, { task: this.state.dis.task })
            .then(resp => {
                return this.props.funt();
            })
            .catch(error => { console.log(error) })
        this.setState({
            dis: { task: '' },
            dis_id: ''
        })
    }
    handleDelete = (id) => {
        axios.delete('http://127.0.0.1:5000/todo/' + id)
            .then(resp => {
                return this.props.funt();
            })
            .catch(error => { console.log(error) });
    }

    render() {
        return (
            <div>
                <div className="task" >
                    {this.props.arr.map(task =>
                        <div className='task_inp_but' key={task.id}>
                            <div className="task_inp">
                                {task.title}
                            </div>
                            <div className='task_but'>
                                <div>
                                    <button className="btn btn-info" onClick={() => this.handleDetails(task)}>DETAILS</button>
                                </div>
                                <div>
                                    <button className="btn btn-danger" onClick={() => this.handleDelete(task.id)}>DELETE</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <div className="dis">
                    DISCRIPTION
                    <div className="dis_inp_but">
                        <Dis dis={this.state.dis.task} handleChangeDis={this.handleDis} onClick={this.handleUpdate} />
                    </div>
                </div>
            </div>
            /*<div className='dis'>
                DISCRIPTION
                <div className="dis_inp_but">
                    <div className='dis_inp'>
                        <textarea classname="dis_txt" rows="2" cols="35" type="text" value={this.state.dis.task} onChange={this.handleChange}></textarea>
                    </div>
                    <div className="dis_but">
                        <button class="btn btn-success" onClick={this.handleUpdate}>Update</button>
                    </div>
                </div>
            </div>*/
        )
    }
}

export default Task
