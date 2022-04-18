const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary, // Cloudinary instance
    params: {
        folder: 'Parkify', // The name of the folder in cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg'], // The formats you want to allow
    },
});

module.exports = {
    cloudinary,
    storage,
};
