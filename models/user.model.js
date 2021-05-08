const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            unique: true,
        },
        username: {
            type: String,
            unique: true,
        },
        verified:{
            type:Boolean,
            default:false,
        },
        type:
        {
            type:String,
            default:'user',
        },
        money:
        {
            type:Number,
            default:0
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified || !this.isNew) {
        next();
    } else this.isModified('password');
    if (this.password)
        this.password = await bcrypt.hash(String(this.password), 12);
    next();
});

let User = mongoose.model('User', userSchema);

module.exports = User;
