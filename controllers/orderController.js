const getAllOrders = (req, res) => {
    return res.send("Get all orders");
}


const getSingalOrder = (req, res) => {
    return res.send("Get singal orders");
}


const getCurrentUserOrders = (req, res) => {
    return res.send("Get current user orders");
}

const createOrder = (req, res) => {
    return res.send("create  orders");
}

const updateOrder = (req, res) => {
    return res.send("update orders");
}


module.exports = {
    getAllOrders,
    getSingalOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}