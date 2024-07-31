import { Schema, model } from 'mongoose';

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
	},
	avatar: {
		type: String
	}
  },
  { timestamps: true },
);

const UserModel = model('User', UserSchema);
export { UserModel };
