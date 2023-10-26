export const config = {
  cloudinary: {
    name: import.meta.env.VITE_CLOUDINARY_NAME as string,
    preset: import.meta.env.VITE_CLOUDINARY_PRESET as string,
    folder: import.meta.env.VITE_CLOUDINARY_FOLDER as string,
    endpoint: import.meta.env.VITE_CLOUDINARY_ENDPOINT as string,
  },
};
