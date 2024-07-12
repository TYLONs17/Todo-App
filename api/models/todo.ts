import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
  title: string;
  status: 'pending' | 'completed';
  category: string;
  dueDate: Date;
  createdAt: Date;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  }, 
  category: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model<ITodo>('Todo', todoSchema);
