import { Schema, model } from 'mongoose';

export const defaultAvatar =
  'https://res.cloudinary.com/dyrcsywk9/image/upload/v1722549155/user-avatars/default-avatar.webp';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Guest',
    },
    bio: {
      type: String,
      default: 'Write something about you...',
    },
    avatar: {
      type: String,
      default: defaultAvatar,
    },
  },
  { timestamps: true },
);

const UserModel = model('User', UserSchema);
export { UserModel };
