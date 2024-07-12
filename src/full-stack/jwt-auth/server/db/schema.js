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
  },
  {
    timestamps: true,
  },
);

const CampusSchema = new Schema({
  city: {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});


const UserModel = model('User', UserSchema);
const CampusModel = model('Campus', CampusSchema);
export { UserModel, CampusModel };
