const getImages = (_req, res, _next) => res.writeHead(200, { 'Content-type': 'image/jpeg' }).end();

module.exports = { getImages };
