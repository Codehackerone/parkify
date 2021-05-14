const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        amount:{
            type:Schema.Types.Decimal128,
            required:true
        },
        Remarks:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

let Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
