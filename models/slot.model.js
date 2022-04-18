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
            type: String,
            enum: ['Large', 'Medium', 'Small'],
        },
        price: {
            type: Number,
            required: true,
        },
        bookings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Booking',
            },
        ],
    },
    {
        timestamps: true,
    }
);

let Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
