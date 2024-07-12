import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  todos: mongoose.Types.ObjectId[]; // Array of ObjectIds referencing Todo
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    // minlength: 5,
    // maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // minlength: 5,
    // maxlength: 50
  },
  password: {
    type: String,
    required: true,
    // minlength: 5,
    // maxlength: 50
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IUser>('User', userSchema);
