import { HardSkillsCollection } from "../db/models/hardSkills.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
export const createtHardSkill = async (skill) => {
    const data = new HardSkillsCollection(skill);
    return await data.save();
};
export const updateHardSkill = async ({ _id, title, image, }) => {
    const upadateObj = {};
    if (title)
        upadateObj.title = title;
    if (image)
        upadateObj.image = image;
    return await HardSkillsCollection.findByIdAndUpdate(_id, upadateObj, { new: true });
};
export const getHardSkills = async ({ page, perPage, }) => {
    const skip = (page - 1) * perPage;
    const [totalItems, data] = await Promise.all([
        HardSkillsCollection.find().countDocuments(),
        HardSkillsCollection.find().skip(skip).limit(perPage).exec(),
    ]);
    return {
        ...calculatePaginationData(totalItems, page, perPage),
        data,
    };
};
