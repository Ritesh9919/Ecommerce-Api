Hosted url:https://e-commerce-x13m.onrender.com


**routes structures**

Auth routes
api/v1/auth/register    // register user
api/v1/auth/login      // login user
api/v1/auth/logout     // logout user


Users routes
api/v1/users     // get all users(only admin)
api/v1/users/showMe  // show current user
api/v1/updateUser  // update user(name, email)
api/v1/users/updatePassword  // update user password
api/v1/users/:id  // get singal user


products
api/v1/products  // create product(only admin)
api/v1/products  // get all products
api/v1/products/uploadImage  // upload products image(only admin)
api/v1/products/:id   // get singal products
api/v1/products.:id  // update product bt id
api/v1/products/:id  // delate product
api/v1/products/:id/reviews  // get singal reviews on products


orders
api/v1/orders   // create order
api/v1/orders // get all orders(only admin)
api/v1/orders/showAllMyOrders   // get current user orders
api/v1/orders/:id  // update order
api/v1/orders/:id // get singal order

reviews
api/v1/reviews   // create reviews
api/v1/reviews   // get all reviews
api/v1/reviews/:id // update reviews
api/v1/reviews/:id  // delete reviews
api/v1/reviews/:id  // get singal reviews





