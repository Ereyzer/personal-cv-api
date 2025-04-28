import { getInfo, updateLangFieldInfo, updateSimpleFildInfo } from "../services/info.js";
import { HttpCode } from "../config/constants.js";
import { InternalServerError, UnprocessableEntityError } from "../config/err-const.js";
import { langFieldSchema, simpleFieldsSchema } from "../validation/info.js";
export const getAllInfoController = async (_req, res) => {
    const data = await getInfo();
    if (!data)
        throw new InternalServerError();
    res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        data,
    });
};
// type T = {field: keyof IPayloadSimpleInfo};
export const patchInfoController = async (req, res, next) => {
    const { field } = req.params;
    const body = req.body;
    const payload = { [`${field}`]: body.value };
    const isWrongField = simpleFieldsSchema.validate(payload, {
        abortEarly: true,
    }).error;
    if (isWrongField)
        throw new UnprocessableEntityError(isWrongField.message);
    const data = await updateSimpleFildInfo(payload, { fields: field });
    if (!data)
        throw new InternalServerError('can`t update info');
    res.status(HttpCode.CREATED).json({
        status: HttpCode.CREATED,
        data: { [`${field}`]: data[`${field}`] },
        field,
    });
    return;
};
export const patchInfoEnController = async (req, res, next) => {
    const { params: { field }, body: { value }, } = req;
    const payload = {
        [`${field}`]: {
            en: value,
        },
    };
    const isWrongField = langFieldSchema.validate(payload, {
        abortEarly: true,
    }).error;
    if (isWrongField)
        throw new UnprocessableEntityError(isWrongField.message);
    const data = await updateLangFieldInfo(payload, { fields: field });
    if (!data)
        throw new InternalServerError('can`t update info');
    res.status(HttpCode.CREATED).json({
        status: HttpCode.CREATED,
        data,
        field,
    });
    return;
};
export const patchInfoUkController = async (req, res, next) => {
    const { params: { field }, body: { value }, } = req;
    const payload = {
        [`${field}`]: {
            uk: value,
        },
    };
    const isWrongField = langFieldSchema.validate(payload, {
        abortEarly: true,
    }).error;
    if (isWrongField)
        throw new UnprocessableEntityError(isWrongField.message);
    const data = await updateLangFieldInfo(payload, { fields: field });
    // console.log(data);
    if (!data)
        throw new InternalServerError('can`t update info');
    res.status(HttpCode.CREATED).json({
        status: HttpCode.CREATED,
        data,
        field,
    });
    return;
};
// TODO: validator
// TODO: IF
// TODO: db
// TODO: IF
// TODO: res
