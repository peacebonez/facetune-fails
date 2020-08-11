const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const determineScore = (arr) => {
//   console.log("ARR:", arr);
//   if (!arr) return "-";

//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i].val;
//   }

//   const output = Math.round(sum / arr.length);
//   return !output ? "-" : toString(output);
// };

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
    },
  ],
});

PostSchema.virtual("scoreAverage").get(function () {
  console.log("AVERAGE FUNCTION RUNNING!");
  if (!this.score) return "-";

  let sum = 0;
  for (let i = 0; i < this.score.length; i++) {
    sum += this.score[i].val;
  }

  const output = Math.round(sum / this.score.length);
  return !output ? "-" : output;
});

module.exports = User = mongoose.model("post", PostSchema);
