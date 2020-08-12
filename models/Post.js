const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", //references the users model
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
  text: {
    type: String,
  },
  score: [
    {
      val: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  averageScore: {
    type: Number,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      hearts: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
      subComments: [
        {
          subUser: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
          subText: {
            type: String,
            required: true,
          },
          subName: {
            type: String,
          },
          subHearts: [
            {
              user: {
                type: Schema.Types.ObjectId,
                ref: "users",
              },
            },
          ],
          subDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

module.exports = User = mongoose.model("post", PostSchema);
