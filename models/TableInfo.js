
const mongoose = require("mongoose");

const tableInfoSchema = mongoose.Schema(
    {
        ResEmail: {
            type: String,
            required: true,
            trim: true
        },
        Tables: {
            type: Array
        }
    }
)

const TableInfo = mongoose.model("TableInfo", tableInfoSchema);

module.exports = TableInfo;