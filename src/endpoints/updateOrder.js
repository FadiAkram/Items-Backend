const Orders = require("../data/orders.js");

module.exports = {
  method: 'put',
  path: '/orders/:id',
  async handler(request, response) {
    let id = request.params.id;
    let data = request.body;
    data._id = id;
    let order = await Orders.update(data);
    if (order !== null) {
      response.status(200).json(order);
    } else {
      response.status(404).json({
        status: 404,
        error: "Order not found",
        message: "ID does not exist"
      })
    }
  }
};
