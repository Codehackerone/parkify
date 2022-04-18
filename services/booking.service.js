const Booking = require('../models/booking.model');
const Slot = require('../models/slot.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

//NewBooking... creates a new booking and adds it to the slot.
const NewBooking = async (bookingBody) => {
    try {
        const slot = await Slot.findById(bookingBody.slot_id);
        //check if start time is less than end time
        if (bookingBody.start_time >= bookingBody.end_time) {
            throw 'Please Choose a Correct Start and End Date!';
        }
        const all_bookings = slot.bookings;

        //check if the slot is already booked
        if (all_bookings.length != 0) {
            for (var i = 0; i < all_bookings.length; i++) {
                var booking = await Booking.findById(all_bookings[i]);
                if (!booking) continue;
                if (booking.status === 'Cancelled') continue;
                var a = parseInt(booking.start_time),
                    b = parseInt(booking.end_time);
                var c = parseInt(bookingBody.start_time),
                    d = parseInt(bookingBody.end_time);
                if (
                    (c >= a && c <= b) ||
                    (d >= a && d <= b) ||
                    (c <= a && d >= b)
                ) {
                    throw 'Already Booked!';
                } else {
                    continue;
                }
            }
        }
        const user = await User.findById(bookingBody.user_id);
        if (!user) throw 'User doesnt Exist';

        //check if user has enough money
        if (bookingBody.amount > user.money) throw 'Insufficient Funds!!';
        const result = await Booking.create(bookingBody);
        slot.bookings.push(result);
        await slot.save();
        var money = parseFloat(user.money);
        money = money - parseFloat(bookingBody.amount);
        user.money = money;
        await user.save();

        //create transaction
        const transaction = {
            user_id: user._id,
            type: 'debit',
            amount: parseFloat(bookingBody.amount),
            remarks: 'book_slot',
            booking_id: result._id,
        };
        await Transaction.create(transaction);
        return result;
    } catch (error) {
        throw error;
    }
};

//FindBooking... finds a booking by id
const FindBooking = async (id) => {
    const booking = await Booking.findOne({ _id: id });
    return booking;
};

//DeleteBooking... deletes a booking by id
const DeleteBooking = async (id) => {
    try {
        const booking = await Booking.findById(id);
        await Slot.findByIdAndUpdate(booking.slot_id, {
            $pull: { bookings: id },
        });
        await Booking.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
};

//apiMoney... returns price of the slot
const apiMoney = async (slot_id) => {
    try {
        var slot = await Slot.findById(slot_id);
        return slot.price;
    } catch (err) {
        return err;
    }
};

//FindByUser... finds all bookings by user
const FindByUser = async (id) => {
    try {
        var bookings = await Booking.find({ user_id: id });
        return bookings;
    } catch (err) {
        res.send('User not found.');
    }
};

//cancelBooking... cancels a booking by id
const cancelBooking = async (id) => {
    var booking = await Booking.findById(id);
    if (!booking) throw 'Booking not Found';
    //check if booking is already cancelled
    else if (booking.status === 'Cancelled') {
        throw 'Booking already Cancelled';
    }
    //check if booking is already completed
    else if (booking.end_time <= new Date().getTime() / 1000) {
        booking.status = 'Completed';
        await booking.save();
        throw 'Booking already Completed.';
    } else {
        var user = await User.findById(booking.user_id);
        if (!user) throw 'User not found';
        else {
            booking.status = 'Cancelled';

            //calculate refund
            var money = parseFloat(user.money);
            money = money + parseFloat(booking.amount / 2);
            user.money = money;

            //create transaction
            const transaction = {
                user_id: user._id,
                type: 'credit',
                amount: parseFloat(booking.amount / 2),
                remarks: 'refund',
                booking_id: booking._id,
            };
            await Transaction.create(transaction);
            await booking.save();
            await user.save();
        }
    }
};

//completeBooking... completes a booking by id
const completeBooking = async (id) => {
    var booking = await Booking.findById(id);
    if (!booking) return;
    else {
        booking.status = 'Completed';
        await booking.save();
    }
};

module.exports = {
    NewBooking,
    FindBooking,
    DeleteBooking,
    apiMoney,
    FindByUser,
    cancelBooking,
    completeBooking,
};
