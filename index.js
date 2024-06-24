// npm init
// npm i express
//npm i nodemon
// npm i --save-dev @types/express
// npm install uuid


// import express
const express = require("express")
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(express.json()) //middleware
const userData = [
    {
    id: "345",
    name: "John",
    email: "john@gmail.com"
},
    {
    id: "346",
    name: "Ebuka",
    email: "Ebuka@gmail.com"
},
]
app.get("/api/user", (req, res)=>{
    res.status(200).json({success: true, message: " Hello this is  my firt response", data: userData})
})

app.post("/api/create-user", (req, res)=>{
    const {name, email} = req.body
    if(!name || !email){
        return res.status(404).json({
            success: false,
            message: "Please fill all field"
        })
    }
    const obj ={
        id: uuidv4(),
        name: name,
        email: email,
        company: "Kode10X",
        date: new Date()

    }
    userData.push(obj)
    res.status(201).json({
        success: true,
        message: "data submitted",
        result: obj
    })
} )

app.delete("/api/delete-user/:id", (req, res)=>{
    const userid = req.params.id // extract the id parameter from the url
    const userIndex = userData.findIndex((user)=>user.id === userid) //searches fo rthe user in the userData array by their id and gets their index

    if(userIndex !== -1){
        userData.splice(userIndex, 1)
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            data: userData
        })
    }else{
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
})

app.put("/api/update-user/:id", (req, res)=>{
    const userid = req.params.id
    console.log(req.params)
    console.log(req.params.id)
    const {name, email} = req.body
    const updateUser = userData.find((profile)=> profile.id === userid)

    if(updateUser){
        if(name) updateUser.name = name
        if(email) updateUser.email = email
        res.status(200).json({
            success: true,
            message: "user upated succesfully",
            result: updateUser
        })
    }else{
        res.status(404).json({
            success: false,
            message: "user not found"
        })
    }
})

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`App is running at port ${PORT}`)
})
