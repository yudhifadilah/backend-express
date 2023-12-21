const express = require('express')
const mongoose = require('mongoose') 
const Inventory = require('./models/InventoryModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


// end point apinya
// Get All /inventory/getAll
// Get ID /inventory/id
// Post create /inventory/create
// Put id /inventory/edit/id
// Delete id /inventory/delete/id
// landing 


app.get('/', (req,res) => {
    res.send('We are Dita Familly')
})


//get all inventory
app.get('/inventory/getAll', async(req,res) => {
    try{
        const NewInventory = await Inventory.find({});
        res.status(200).json(NewInventory)

    }
    catch(error){

        res.status(500).json({message: error.message})
    }
})


//get berdasarkan id
app.get('/inventory/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const NewInventory = await Inventory.findById(id);
        res.status(200).json(NewInventory)

    } catch(error){

        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//post atau create 
app.post('/inventory/create', async(req,res) => {
    try{
        const NewInventory = await Inventory.create(req.body)
        res.status(200).json(NewInventory)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }

})


//edit berdasarkan id 
app.put('/inventory/edit/:id', async(req, res) => {
    try {
        const {id} = req.paramsl
        const NewInventory = await Inventory.findByIdAndUpdate(id, req, body);
        
        if(!NewInventory) {
            return res.status(404).json({message: 'tidak dapat menemukan barang dengan id: ${id}'})
        }
        const UpdatedInventory = await Inventory.findById(id)
        res.status(200).json(UpdatedInventory)
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


//delete berdasarkan id
app.delete('/inventory/delete/:id', async (req, res) => 
{
    try {
        const {id} = req.params
        const NewInventory = await Inventory.findByIdAndDelete(id)
        if(!NewInventory) {
            return res.status(404).json({message: 'tidak dapat menemukan id ${id}'})
        }
        res.status(200).json(NewInventory)
    } 
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
})



app.listen(3000, ()=> {
    console.log('Running on Port 3000')
})



//connection
mongoose.connect('mongodb+srv://fayudhi:w0nderKiD@management-inventory.hlsfgkk.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})