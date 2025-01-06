import mongoose, { Schema, Document, Model, Types } from "npm:mongoose@^6.7";

interface BlogActivity {
  total_likes?: number;
  total_comments?: number;
  total_reads?: number;
  total_parent_comments?: number;
}

export interface IBlog extends Document {
  blog_id: string;
  title: string;
  banner?: string;
  description?: string;
  content?: string[];
  tags?: string[];
  author: Types.ObjectId;
  activity: BlogActivity;
  comments?: Types.ObjectId[];
  draft?: boolean;
  publishedAt?: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      maxlength: 200,
      // required: true
    },
    content: {
      type: [],
      // required: true
    },
    tags: {
      type: [String],
      // required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    activity: {
      total_likes: {
        type: Number,
        default: 0,
      },
      total_comments: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
      total_parent_comments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    draft: {
      type: Boolean,
      default: false,
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const BlogModel: Model<IBlog> = mongoose.model("blogs", blogSchema);
export default BlogModel;
