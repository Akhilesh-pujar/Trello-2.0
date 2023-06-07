

import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "64744501849209a30e0c",
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage;