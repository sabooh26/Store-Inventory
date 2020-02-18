import React, { Component } from 'react'

export class Form extends Component {
  render() {
    return (
          <div className='form'>
            <label>
              Item
              <input
                type='text'
                value={this.props.value}
                name={this.props.name}
                onChange={this.props.handleChange}
              />
            </label>
            
            <button onClick={this.props.addData}>Submit</button>
          </div>
  
    )
  }
}

export default Form
