import { fromSvgToBinary } from "../utils/svgTobinaryConverter.js";
import { InternalServerError } from "../config/err-const.js";
import { IconCOllection } from "../db/models/icon.js";
export const getAllIcons = async () => {
    const icons = await IconCOllection.find();
    return icons;
};
export const getIconById = async (id) => await IconCOllection.findById(id);
// export const addIcons = async (
//   icons: Express.Multer.File[]
// ): Promise<mongoose.Document[] | never> => {
//   const binaryIconsPromises: Promise<{ buffer: Buffer; name: string }>[] = [];
//   for (let i = 0; i < icons.length; i++) {
//     binaryIconsPromises[i] = new Promise(resolve => {
//       resolve(
//         (async () => {
//           return {
//             buffer: await fromSvgToBinary(icons[i].path),
//             name: icons[i].filename,
//           };
//         })()
//       );
//     });
//   }
//   try {
//     const binaryIcons: ISvgDbData[] | never = await Promise.all(binaryIconsPromises);
//     console.log(binaryIcons);
//     for (const el of binaryIcons) {
//       const doc = new IconCOllection({
//         ...el,
//       });
//       console.log(doc);
//       await doc.save();
//     }
//   } catch (e) {
//     console.log(e);
//     throw new InternalServerError('We cant add icons');
//   }
//   throw new Error();
//   // return;
// };
export const addIcons = async (icons) => {
    const binaryIconsPromises = [];
    for (let i = 0; i < icons.length; i++) {
        binaryIconsPromises[i] = new Promise(resolve => {
            resolve((async () => {
                return {
                    buffer: await fromSvgToBinary(icons[i].path),
                    name: icons[i].filename,
                };
            })());
        });
    }
    try {
        const binaryIcons = await Promise.all(binaryIconsPromises);
        const response = [];
        for (const el of binaryIcons) {
            const doc = new IconCOllection({
                ...el,
            });
            await doc.save();
            response.push({ name: doc.name, _id: doc._id });
        }
        return response;
    }
    catch (e) {
        console.log(e);
        throw new InternalServerError('We cant add icons');
    }
};
