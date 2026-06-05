import { customAlphabet } from "nanoid";


export const generateShortId = async () => {
    const customNanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
    return customNanoId();
};
