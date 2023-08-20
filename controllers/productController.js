const createProduct = (req, res) => {
    return res.send('Craete Product');
}

const getAllProducts = (req, res) => {
    return res.send('Gell all products');
}


const getSingalProduct = (req, res) => {
    return res.send('Get singal product');
}


const updateProduct = (req, res) => {
    return res.send('Update Product');
}

const deleteProduct = (req, res) => {
    return res.send('Delete product');
}

const uploadImage = (req, res) => {
    return res.send('Upload Image');
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingalProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}