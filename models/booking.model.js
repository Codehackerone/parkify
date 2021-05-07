const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema(
    {
        slot_id: {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        start_time:{
            type:Date,
            required:true
        },
        end_time:{
            type:Date,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

let Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
