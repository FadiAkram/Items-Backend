const Orders = require("../data/orders.js");

module.exports = {
  method: 'delete',
  path: '/orders/:id',
  async handler(request, response) {
    const id = request.params.id;
    const order = await Orders.getOne(id);
    const isDeleteSuccessful = await Orders.deleteOne(id);
    if (isDeleteSuccessful) {
      response.status(204).json(order);
    } else {
      response.status(404).json({
        status: 404,
        error: "Order not found",
        message: "ID does not exist"
      });
    }
  }
};
