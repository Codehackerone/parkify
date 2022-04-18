const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        slot_id: {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        start_time: {
            type: Number,
            required: true,
        },
        end_time: {
            type: Number,
            required: true,
        },
        amount: {
            type: Schema.Types.Decimal128,
            required: true,
        },
        status: {
            type: String,
            enum: ['Completed', 'Cancelled', 'Booked', 'CheckedIn'],
            default: 'Booked',
        },
    },
    {
        timestamps: true,
    }
);

let Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
