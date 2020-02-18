import React, { Component } from 'react'
//import Form from './Components/Form'


export class App extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      newData: {
        id: '',
        item: '',
        metal: '',
        info: '',
        price: '',
        instock: ''
      },
      sold: false
    }
  }
  componentDidMount(){
    this.getData()
  }

  
  handleChange = (e) => {
    const {name,value} = e.target
    const{newData} = this.state
      this.setState({
        newData:{...newData, [name]:value}
      })
  }
  getData = () =>{
    fetch('http://localhost:3002/products')
    .then(res  => res.json())
      .then(data =>{
        this.setState({
          data
        })
      })
  }
  addData = () => {
    //const{newData} = this.state
    const{item,metal,info,price,instock} = this.state.newData
    fetch(`http://localhost:3002/products/add/?item=${item}&metal=${metal}&info=${info}&price=${price}&instock=${instock}`)
    .then(this.getData)
  }
  deleteData = (id) =>{
    if(window.confirm('Delete Item?')){
      fetch(`http://localhost:3002/products/delete/${id}`)
      .then(this.getData)
    }
  }
  
  changeAvailability = (id) =>{
    const{instock} = this.state.newData
    
    fetch(`http://localhost:3002/products/update/?id=${id}&instock=${instock}`)
    .then(this.getData)
    this.setState({
      sold:true
    })
  }

  handleSubmit = (e) => {
    this.addData()
    alert('Product Added')
    const fields = Object.values(this.state.newData) 
    console.log(fields)
    fields.forEach(field => field.delete())
    e.preventDefault()
  }

  
  render() {
    const table = this.state.data.map(obj=>{
      // console.log(obj.id)
      return(
          <tbody>
              <tr>
                <td>{obj.id}</td>
                <td>{obj.item}</td>
                <td>{obj.metal}</td>
                <td>{obj.info}</td>
                <td>{obj.price}</td>
                <td>{obj.instock}</td>
                <td><button className='delete-btn' onClick={()=>{this.deleteData(obj.id)}}>X</button></td>
                <td><input type="checkbox"  onChange={()=>{this.changeAvailability(obj.id)}}/></td>
              </tr>
          </tbody>
      )
    })
    return (
        <div className='container'>
          <h2 className="text-align">Chains</h2>
          {/* <button onClick={this.getData}>Show All Chains</button> */}
          <div className='display-flex'>
            <table>
              <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Metal</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>InStock</th>
                  <th>Delete</th>
                  <th>Update</th>
              </tr>
              {table}
            </table>
            <form onSubmit={this.handleSubmit}>
              
              <div className='form'> 
                <div className='heading'>
                  <h3>Add a Product</h3>
                </div>
                <label>
                  Item
                  <input
                    type='text'
                    value={this.state.newData.item}
                    name='item'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Metal
                  <input
                    type='text'
                    value={this.state.newData.metal}
                    name='metal'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Info
                  <input
                    type='text'
                    value={this.state.newData.info}
                    name='info'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Price
                  <input
                    type='text'
                    value={this.state.newData.price}
                    name='price'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  InStock(Yes/No)
                  <input
                    type='text'
                    value={this.state.newData.instock}
                    name='instock'
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <button>Add Product</button>
              </div>
              
            </form>
          </div>
        </div>    

    
    )
  }
}

export default App