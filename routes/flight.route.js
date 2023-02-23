
const express = require("express")

const {FlightModel} =require("../modules/Flight.model")

const flightRouter=express.Router()

// flightPost...

flightRouter.post("/flights", async (req, res) => {
    const payload = req.body
  
    try{
        const new_flight = new FlightModel(payload)
        await new_flight.save()
        res.send({"msg" : "flight post successfully"})
    }
    catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})

// flight get req..
flightRouter.get("/flights", async (req, res) => {
    const flight = await FlightModel.find()
    res.send(flight)
})


// flight get by id req...

flightRouter.get("/flights/:id", async (req, res) => {
    const id = req.params.id
    
   
    const flight = await FlightModel.findOne({_id:id})

    res.send(flight)
})

// flight delete by id....

flightRouter.delete("/flights/:id", async (req, res) => {
    const id = req.params.id
    await FlightModel.findByIdAndDelete({_id : id})
    res.send({"msg" : "flight data deleted successfully"})
})


// flight patch data by id

flightRouter.patch("/flights/:id", async (req, res) => {
    const id = req.params.id;
    const payload = req.body
    try {
        const flight = await FlightModel.findByIdAndUpdate({ _id: id }, payload)
        res.send("Update Sucessfully")
    }
    catch (err) {
        console.log(err)
        res.send("something wrong")

    }

})



module.exports = {flightRouter}