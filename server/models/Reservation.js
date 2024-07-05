const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guestName: String,
  address: String,
  mobileNumber: String,
  age: Number,
  occupation: String,
  checkInDate: Date,
  checkOutDate: Date,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  price: Number,
  status: {
    type: String,
    enum: ['pending', 'checkedIn', 'checkedOut'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);