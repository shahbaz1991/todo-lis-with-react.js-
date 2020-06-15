import React, { Component } from 'react'
//import axios from 'axios'

class Dis extends Component {

    handleChange = (e) => {
        this.props.handleChangeDis(e.target.value)
    }
    handleClick = (e) => {
        this.props.onClick(e.target.value)
    }
    render() {
        return (
            <>
                <div className='dis_inp'>
                    <textarea className='dis_txt' rows='100%' cols='100%' value={this.props.dis} onChange={this.handleChange}></textarea>
                </div>
                <div className="dis_but">
                    <button className="btn btn-success" onClick={this.handleClick}>Update</button>
                </div>
            </>
        )
    }
}
export default Dis

