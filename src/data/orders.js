/**
 * order.js is responsible for manipulating the orders collection in the
 * Mongo database. In architecture parlance, it is a Data Access Object.
 * It abstracts away the details of interact with the database.
 */
const Database = require("../lib/database.js");
const { ObjectID } = require("mongodb");


class Orders {
   static async getAll() {
    const ordersCollection = await getOrdersCollection();
    const orders_cursor = ordersCollection.find();
    let orders = await orders_cursor.toArray();
    orders.forEach(order => {
      order._id = order._id.toHexString();
    });
    return orders;
  }

  static async getOne(id) {
    const ordersCollection = await getOrdersCollection();
    let order = await ordersCollection.findOne({ _id: ObjectID(id) });
    if (order !== null) {
      order._id = order._id.toHexString();
    }
    return order;
  }
  

  static async create(orderData) {
    const ordersCollection = await getOrdersCollection();
    const result = await ordersCollection.insertOne(orderData);
    let order = await ordersCollection.findOne({ _id: result.insertedId });
    order._id = order._id.toHexString();
    return order;
  }

  static async update(orderData) {
    const itemsCollection = await getItemsCollection();
    const result = await itemsCollection.updateOne(
      { _id: ObjectID(orderData._id) },
      { $set: { name: orderData.name } },
      { upsert: false }
    );
    if (result.modifiedCount < 1) {
      return null;
    } else {
      const order = await ordersCollection.findOne(
        { _id: ObjectID(orderData._id) }
      );
      order._id = order._id.toHexString();
      return orderData;
    }
  }

  static async deleteOne(id) {
    const ordersCollection = await getOrdersCollection();
    const result = await ordersCollection.deleteOne(
      { _id: ObjectID(id) }
    );
    return result.deletedCount >= 1;
  } 

  static async getOrdersByEmail(email){
    const ordersCollection = await getOrdersCollection();
    const orders_cursor = await ordersCollection.find({email:email});
    let order = orders_cursor.toArray();
    return order;
  }

  static async createItemToOrder(id, orderData){
    const ordersCollection = await getOrdersCollection();
    let order = await ordersCollection.update(
      { _id: ObjectID(id) },
      { $push: { items: { _id: orderData._id, name: orderData.name }}});
      return order;
  }

}

async function getOrdersCollection() {
  const database = await Database.get();
  return database.db("orders").collection("orders");
}

module.exports = Orders;
