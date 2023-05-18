const { model, Schema } = require('mongoose')

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: Object
        }
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("Note", noteSchema)