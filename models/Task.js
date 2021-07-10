import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  taskOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  externalList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
  text: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  isImportant: {
    type: Boolean,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.model('Task', TaskSchema);
