const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    
        _id: ObjectId,
        user : { type: ObjectId, ref: 'User' },
        flight : { type: ObjectId, ref: 'Flight' }
   
   
});

const BookingModel = mongoose.model("Book", bookingSchema);

module.exports = {
BookingModel
};

