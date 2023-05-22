const { model, Schema } = require("mongoose");

const shareSchema = new Schema(
  {
    noteId: { type: Schema.Types.ObjectId, ref: "Note" },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

module.exports = model("Share", shareSchema);