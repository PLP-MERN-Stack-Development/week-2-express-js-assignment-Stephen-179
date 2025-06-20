const validateProduct = (req, res, next) => {
    const { name, description, price, category} = req.body;
    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: 'Missing required field: name, description, price, category'});
    }
    next();
};

module.exports = validateProduct;