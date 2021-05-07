const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const garageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        location_cat:{
            type:String,
            enum: ["outskirts", "prime", "nice"]
        },
        size: {
            type: String,
            required: true,
        },
        owner:{
            type: String,
            required: true,
        },
        slots:[
            {
                type:Schema.Types.ObjectId,
                ref:'Slot'
            }
        ]
    },
    {
        timestamps: true,
    }
);

let Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;
