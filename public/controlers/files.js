import { HttpCode } from "../config/constants.js";
import { BadRequest, InternalServerError, NotFoundError } from "../config/err-const.js";
import { updateAvatar } from "../services/avatar.js";
import { addIcons, getAllIcons, getIconById } from "../services/icon.js";
import { fromBinaryToSvg, rmTmpFile } from "../utils/svgTobinaryConverter.js";
export const uploadAvatar = async (req, res) => {
    const avatar = req.file;
    const name = avatar?.filename;
    if (!name)
        throw new BadRequest();
    const data = await updateAvatar(name);
    if (!data)
        throw new InternalServerError();
    res.status(HttpCode.CREATED).json({
        status: HttpCode.CREATED,
        data: {
            url: data.avatar,
        },
    });
    return;
};
export const getAllIconController = async (req, res) => {
    const buffers = await getAllIcons();
    const data = buffers.map(({ name, _id }) => ({ name, _id }));
    res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data,
    });
};
export const getOneIconController = async (req, res) => {
    const { id } = req.params;
    const icon = await getIconById(id);
    if (!icon)
        throw new NotFoundError('not found any icons');
    const { buffer, name } = icon;
    const filePaths = await fromBinaryToSvg({ buffer, name });
    res.status(200).sendFile(filePaths);
    rmTmpFile(filePaths);
};
export const uploadSvgIcons = async (req, res) => {
    const icons = req.files;
    if (!icons) {
        throw new InternalServerError();
    }
    const data = await addIcons(icons);
    res.status(HttpCode.CREATED).json({
        status: HttpCode.CREATED,
        data,
    });
};
