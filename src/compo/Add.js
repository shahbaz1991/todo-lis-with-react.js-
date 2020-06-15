import React, { Component } from 'react'
import axios from 'axios'

class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            task: ''
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault()
        axios.post('http://127.0.0.1:5000/todo', this.state)
            .then(resp => {
                return this.props.funt();
            })
            .catch(error => { console.log(error) })
        this.setState({
            title: '',
            task: ''
        })
    }
    render() {
        const { title, task } = this.state
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <div className='add_inp_but'>
                        <div className='add_inp'>

                            <input className='add_inp_txt' type="text" name="title" value={title} onChange={this.handleChange} required />


                            <textarea className='add_inp_txtarea' row='100%' cols='100%' name='task' value={task} onChange={this.handleChange} required></textarea>

                        </div>
                        <div className='add_but'>
                            <button className="btn btn-primary" type='submit'>ADD</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default Add
