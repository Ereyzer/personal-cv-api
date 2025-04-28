import { InfoCollection } from "../db/models/info.js";
export const getInfo = async () => {
    const info = await InfoCollection.findById(1);
    return info;
};
export const updateSimpleFildInfo = async (payload, options = {}) => {
    const data = await InfoCollection.findByIdAndUpdate(1, payload, {
        new: true,
        strict: true,
        runValidators: true,
        ...options,
    });
    return data;
};
export const updateLangFieldInfo = async (payload, options = {}) => {
    const info = await getInfo();
    if (!info)
        return null;
    const fieldName = Object.keys(payload)[0];
    const oldObj = info[`${fieldName}`];
    const newObj = payload[`${Object.keys(payload)[0]}`];
    return await InfoCollection.findByIdAndUpdate(1, { [`${fieldName}`]: { ...oldObj, ...newObj } }, {
        new: true,
        strict: true,
        runValidators: true,
        ...options,
    });
};
