import mongoose from 'mongoose';
const SoftSkillsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        auto: true,
    },
    icon: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        default: null,
        ref: 'icons',
    },
}, {
    collection: 'soft_skills',
    timestamps: true,
});
// export const SoftSkillsENCollection = mongoose.model('EnSoftSkill', softSkillsSchema);
// export const SoftSkillsUkCollection = mongoose.model('UkSoftSkill', softSkillsSchema);
export const SoftSkillsCollection = mongoose.model('soft_skills', SoftSkillsSchema);
