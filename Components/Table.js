import React, { Component } from 'react'

export class Table extends Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Metal</th>
            <th>Description</th>
            <th>Price</th>
            <th>InStock</th>
          </tr>
          <tr>
            <td>{this.props.id}</td>
            <td>{this.props.item}</td>
            <td>{this.props.metal}</td>
            <td>{this.props.info}</td>
            <td>{this.props.price}</td>
            <td>{this.props.instock}</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Table
