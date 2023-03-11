const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    salary: {
      type: Number,
      required: true,
    },
    salary_splite: [
      {
        title: {
          type: String,
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", dataSchema);
