import { InternalServerError } from "../config/err-const.js";
import { InfoCollection } from "../db/models/info.js";
import { rmFileFromUploadDir, saveFileToUploadDir } from "../utils/FileInUploadDir.js";
export const updateAvatar = async (fileName) => {
    const url = await saveFileToUploadDir(fileName);
    const oldData = await InfoCollection.findById(1, 'avatar');
    const data = await InfoCollection.findByIdAndUpdate(1, { avatar: url }, { new: true, strict: true, run: true, fields: ['avatar'] });
    if (!data) {
        rmFileFromUploadDir(url);
        throw new InternalServerError('file did not dounload');
    }
    if (!oldData?.avatar)
        return data;
    rmFileFromUploadDir(oldData.avatar);
    return data;
};
