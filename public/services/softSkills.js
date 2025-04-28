import { ELanguage } from "../interfaces/interface_controlers.js";
import { SoftSkillsCollection } from "../db/models/softSkills.js";
import { EnSoftSkillsCollection, UkSoftSkillsCollection } from "../db/models/languageSupport.js";
import { NotFoundError } from "../config/err-const.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
// type TLenguage = 'EN' | 'UK';
// en
// get all
export const getAllSoftSkills = async (lang, page, perPage) => {
    let skills = [];
    let totalItems = 0;
    const queryBuilder = (model) => {
        const skip = (page - 1) * perPage;
        const count = model.find().countDocuments();
        const query = model
            .find()
            .populate('_id')
            .skip(skip)
            .limit(perPage)
            .exec();
        return { count, query };
    };
    switch (lang) {
        case ELanguage.EN:
            totalItems = await queryBuilder(EnSoftSkillsCollection).count;
            skills = await queryBuilder(EnSoftSkillsCollection).query;
            break;
        case ELanguage.UK:
            totalItems = await queryBuilder(UkSoftSkillsCollection).count;
            skills = await queryBuilder(UkSoftSkillsCollection).query;
            break;
        default:
            throw new NotFoundError('this languge did not support');
            break;
    }
    const responses = skills.map(skill => {
        const response = skill.toJSON();
        return { ...response, ...response._id };
    });
    return {
        ...calculatePaginationData(totalItems, page, perPage),
        data: responses,
    };
};
// get one
export const getOneSoftSkill = async (id, lang) => {
    let skill;
    switch (lang) {
        case ELanguage.EN:
            skill = await EnSoftSkillsCollection.findById(id).populate('_id').exec();
            break;
        case ELanguage.UK:
            skill = await UkSoftSkillsCollection.findById(id).populate('_id').exec();
            break;
        default:
            throw new NotFoundError('this languge did not support');
            break;
    }
    if (!skill)
        throw new NotFoundError(`not found softSkill id: ${id}`);
    const response = skill.toJSON();
    return {
        ...response,
        ...response._id,
    };
};
// create one by
export const upsertSoftSkill = async ({ text, title, icon, _id }, lan) => {
    let skill = await SoftSkillsCollection.findById(_id);
    if (!skill) {
        skill = new SoftSkillsCollection({});
        if (icon)
            skill.icon = icon;
        skill = await skill.save();
    }
    let lang;
    switch (lan) {
        case ELanguage.EN:
            lang = new EnSoftSkillsCollection({ _id: skill._id, text, title });
            break;
        case ELanguage.UK:
            lang = new UkSoftSkillsCollection({ _id: skill._id, text, title });
            break;
        default:
            throw new NotFoundError('this languge did not support');
            break;
    }
    lang = await lang.save();
    return { ...skill.toJSON(), ...lang.toJSON() };
};
// update one by id
// uk
// get all
// get one
// create one by id
// update one by id
