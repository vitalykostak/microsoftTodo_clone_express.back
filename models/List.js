import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  listOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  externalProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  label: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('List', ListSchema);
