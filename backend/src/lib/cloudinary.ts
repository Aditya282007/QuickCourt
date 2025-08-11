const cloudinaryModule: any = require('cloudinary');
const cloudinary: any = cloudinaryModule.v2 ?? cloudinaryModule;

export const configureCloudinary = (cloudName: string, apiKey: string, apiSecret: string) => {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary credentials');
  }
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });

  return cloudinary;
};

