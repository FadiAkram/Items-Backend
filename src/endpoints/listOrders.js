const Orders = require("../data/orders.js");

module.exports = {
  method: 'get',
  path: '/orders',
  async handler(request, response) {
    let email = request.query.email;
    let orders;
    if (email == undefined) {
       orders = await Orders.getAll();
       console.log(orders);
    } else {
      orders = await Orders.getOrdersByEmail(email);
    }
    response.status(200).json(orders);
  }
};