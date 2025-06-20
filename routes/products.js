const express = require('express');
const router = express.Router();
const Product = require('../Products');




// GET /api/products/search?name=laptop
router.get('/search', async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a product name to search.' });
    }

    const results = await Product.find({
      name: { $regex: name, $options: 'i' } // case-insensitive search
    });

    res.status(200).json({
      total: results.length,
      results,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products/stats - Group products by category and return counts
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          inStockCount: { $sum: { $cond: ['$inStock', 1, 0] } }
        }
      },
      {
        $sort: { count: -1 } // optional: sort by most products
      }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
});



// GET/api/products - fetch all products with filtering & pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 5, category, inStock } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const products = await Product.find(filter)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});


//GET/api/products/:id - fetch a single product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({message:'Product not found'});
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:'Error retrieving the product', error: error.message});
    }
});

//POST/api/products - create a new product
router.post('/', async (req, res) => {
    try{
        const { name, description, price, category, inStock} = req.body;

        //Basic validation
        if (!name || !description || !price || !category) {
            return res.status(400).json({message: 'All fields except inStock are required'});
        }

        const newProduct = new Product ({
            name,
            description,
            price,
            category,
            inStock: inStock ?? true //default to true if not provided
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({message: 'Error creating product', error: error.message});
    }
});

//PUT /api/products/:id - update a product
// PUT /api/products/:id - update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;

    // Validate at least one field is being updated
    if (!name && !description && !price && !category && inStock === undefined) {
      return res.status(400).json({ message: 'At least one field must be provided for update' });
    }

    // Only include fields that are defined
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;
    if (inStock !== undefined) updateData.inStock = inStock;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});


//Delete 
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found'});
        }

        res.status(200).json({ message: 'Product deleted successfully', deletedProduct});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message})
    }
});




module.exports = router;