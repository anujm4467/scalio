import { model, Schema, Document } from 'mongoose';

import { Post } from '../../../shared/models';

export interface IPostDbModel extends Post, Document {}

export const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },

  content: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1000,
  },

  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const PostDbModel = model('Post', PostSchema);
