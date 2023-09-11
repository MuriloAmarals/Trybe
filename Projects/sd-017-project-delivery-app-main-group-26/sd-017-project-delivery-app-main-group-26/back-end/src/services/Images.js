const { product } = require('../database/models');

const getImages = async () => {
    const allImages = await product.findAll({ attributes: ['url_image'] });

    return allImages;
};

module.exports = { getImages };
