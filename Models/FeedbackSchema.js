const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    rollNo: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;