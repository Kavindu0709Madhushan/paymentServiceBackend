import Payment from '../models/Transaction.js';

/**
 * Save a new payment to the database
 * @param {Object} paymentData - Payment data object
 * @returns {Promise<Object>} Saved payment object
 */
export const savePayment = async (paymentData) => {
  try {
    const payment = new Payment(paymentData);
    return await payment.save();
  } catch (error) {
    console.error('Error saving payment:', error);
    throw error;
  }
};

/**
 * Get payments by order ID
 * @param {String} orderId - Order ID to fetch payments for
 * @returns {Promise<Array>} Array of payment objects
 */
export const getPaymentsByOrderId = async (orderId) => {
  try {
    return await Payment.find({ orderId });
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

/**
 * Update a payment by ID
 * @param {String} paymentId - Payment ID to update
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated payment object
 */
export const updatePayment = async (paymentId, updateData) => {
  try {
    return await Payment.findByIdAndUpdate(
      paymentId, 
      updateData, 
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error('Error updating payment:', error);
    throw error;
  }
};