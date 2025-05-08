import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
   
  },
  name: {
    type: String,
   
  },
  cardNumber: {
    type: Number,
   
  },
  expiryDate: {
    type: Date,
   
  },
  cvv: {
    type: Number,
   
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Transaction', transactionSchema);