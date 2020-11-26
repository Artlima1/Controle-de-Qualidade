const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(user) {
    user.user_id = uuidv4();
    await connection("users").insert(user);
    return user.user_id;
  },

  async read(filters) {
    let response;
    response = await connection("users").where(filters).select("*");
    return response;
  },

  async update(user_id, updated_user) {
    const response = await connection("users")
      .where("user_id", user_id)
      .update(updated_user);
    return response;
  },

  async delete(user_id) {
    const response = await connection("users").where("user_id", user_id).del();
    return response;
  },
};
