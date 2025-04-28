import mongoose, { Schema } from 'mongoose';
const IconSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        require: true,
        auto: true,
    },
    name: {
        type: Schema.Types.String,
        require: true,
    },
    buffer: {
        type: Schema.Types.Buffer,
        require: true,
    },
}, {
    collection: 'icons',
    timestamps: true,
});
export const IconCOllection = mongoose.model('Icon', IconSchema);
