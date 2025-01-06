import mongoose, { Schema, Document, Model, Types } from "npm:mongoose";

export interface IComment extends Document {
  blog_id: Types.ObjectId;
  blog_author: Types.ObjectId;
  comment: string;
  children?: Types.ObjectId[];
  commented_by: Types.ObjectId;
  isReply?: boolean;
  parent?: Types.ObjectId;
  commentedAt?: Date;
}

const commentSchema = new Schema<IComment>(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    blog_author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    comment: {
      type: String,
      required: true,
    },
    children: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    commented_by: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    isReply: {
      type: Boolean,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
    commentedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const CommentModel: Model<IComment> = mongoose.model<IComment>(
  "comments",
  commentSchema
);
export default CommentModel;
