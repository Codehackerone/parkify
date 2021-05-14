const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type:{
            type:String,
            enum: ["credit", "debit"]
        },
        amount:{
            type:Schema.Types.Decimal128,
            required:true
        },
        remarks:{
            type:String,
            enum: ["add_fund", "book_slot", "refund"]
        }
    },
    {
        timestamps: true,
    }
);

let Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
