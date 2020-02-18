const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3002
app.listen(port,()=>{
  console.log(`server started on port ${port} `)
})
//establish connection to database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Milan"
})

con.connect((err)=>{
  if(err) throw err
  else{
    console.log("Database Connected")
  }
})
//get the products
app.get('/products',(request,response)=>{
  const query = 'select * from Milan.Products'
  con.query(query,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      response.json(result)
    }
  })
})

//add a product
app.get('/products/add',(request,response)=>{
  const {item,metal,info,price,instock} = request.query
  const query = `insert into Milan.Products (item,metal,info,price,instock) values ('${item}','${metal}','${info}','${price}','${instock}')`
  console.log(query)
  console.log(request.query)
  con.query(query,(err,result) => {
    response.json(result)
    console.log('user added')
  })
})

app.get('/products/update',(request,response)=>{
  const {id,instock} = request.query
  const query = `UPDATE Milan.Products
  SET instock = 'No'
  WHERE id = ${id};`
  con.query(query,(err,result)=>{
    response.json(result)
    console.log('Product Sold')
  })
})

app.get('/products/delete/:id',(request,response)=>{
   let id = parseInt(request.params.id)
   const query = `delete from Milan.Products where id = ${id};`
   console.log(query)
  con.query(query,(err,result)=>{
    response.json(result)
    console.log('user deleted')
  })
 })