import { savePayment, getPaymentsByOrderId } from '../services/paymentService.js';

export const createPayment = async (req, res) => {
  try {
    const { amount, name, cardNumber, expiryDate, cvv } = req.body;

    // Log the incoming request body for debugging
    console.log('Received payment request:', req.body);

    // Validate required fields
    if (!amount || !name || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ 
        error: 'Missing required fields: amount, name, cardNumber, expiryDate, cvv' 
      });
    }

    // Validate card number format (numbers only)
    if (!/^\d+$/.test(cardNumber)) {
      return res.status(400).json({ error: 'Card number must contain only digits' });
    }

    // Validate cvv format (numbers only, 3-4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      return res.status(400).json({ error: 'CVV must contain 3-4 digits' });
    }

    // Validate expiry date format (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ error: 'Expiry date must be in MM/YY format' });
    }

    // Process the payment and save to database
    const payment = await savePayment({
      amount,
      name,
      cardNumber,
      expiryDate,
      cvv,
      status: 'Completed', // Setting as completed since we're simulating success
      date: new Date()
    });

    res.status(200).json({ success: true, payment });
  } catch (error) {
    // Log the full error for debugging
    console.error('Error in createPayment:', {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({ 
      error: 'Payment processing failed', 
      details: error.message || 'Internal server error' 
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const { orderId } = req.query;
    const payments = await getPaymentsByOrderId(orderId);
    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments', details: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;
    
    if (!paymentId || !status) {
      return res.status(400).json({ 
        error: 'Missing required fields: paymentId, status' 
      });
    }
    
    // Validate status
    if (!['Pending', 'Completed', 'Failed'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be one of: Pending, Completed, Failed' 
      });
    }
    
    const updatedPayment = await updatePayment(paymentId, { status });
    
    res.status(200).json({ success: true, payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment status', details: error.message });
  }
};