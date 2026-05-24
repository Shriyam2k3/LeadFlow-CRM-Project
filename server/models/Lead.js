import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    client: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;