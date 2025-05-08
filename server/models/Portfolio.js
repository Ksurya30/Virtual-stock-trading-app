import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stocks: [
    {
      symbol: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        required: true
      },
      shares: {
        type: Number,
        required: true,
        min: 0
      },
      avgPrice: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export default mongoose.model('Portfolio', portfolioSchema);