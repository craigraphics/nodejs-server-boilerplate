import { Schema, model } from 'mongoose';
import { IItem } from '../types';

const ItemSchema: Schema = new Schema<IItem>({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IItem>('Item', ItemSchema);
