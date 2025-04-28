import mongoose from 'mongoose';
export const LanguageSoftSkillDefinition = {
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'soft_skills',
    },
    title: {
        type: String,
        require: true,
        maxLength: 20,
    },
    text: {
        type: String,
        require: true,
        maxLength: 160,
    },
};
const LanguageSoftSkillsSupportSchema = new mongoose.Schema(LanguageSoftSkillDefinition, {
    timestamps: true,
});
export const EnSoftSkillsCollection = mongoose.model('ENSupportSoftSkills', LanguageSoftSkillsSupportSchema);
export const UkSoftSkillsCollection = mongoose.model('UKSupportSoftSkills', LanguageSoftSkillsSupportSchema);
