export const ctrlWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log('error' + err);
            }
            next(err);
        }
    };
};
