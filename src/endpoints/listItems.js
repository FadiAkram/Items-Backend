const Items = require("../data/items.js");

module.exports = {
  method: 'get',
  path: '/items',
  async handler(request, response) {
    let name = request.query.name;
    let items;
    if (name == undefined) {
       items = await Items.getAll();
       console.log(items);
    } else {
      items = await Items.getItemsByName(name);
    }
    response.status(200).json(items);
  }
};

