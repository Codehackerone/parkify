const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema(
    {
        garage_id: {
            type: Schema.Types.ObjectId,
            ref: 'Garage',
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type:String,
            required: ["Big", "Medium", "Small"]
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

let Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
