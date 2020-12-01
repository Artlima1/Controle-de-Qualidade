const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(pending_unconformity) {
    pending_unconformity.pending_unconformity_id = uuidv4();
    await connection("pending_unconformity").insert(pending_unconformity);
    return pending_unconformity.pending_unconformity_id;
  },

  async read(filters) {
    let response;
    response = await connection("pending_unconformity")
      .where(filters)
      .select("*");
    return response;
  },

  async update(pending_unconformity_id, updated_pending_unconformity) {
    const response = await connection("pending_unconformity")
      .where("pending_unconformity_id", pending_unconformity_id)
      .update(updated_pending_unconformity);
    return response;
  },

  async delete(pending_unconformity_id) {
    const response = await connection("pending_unconformity")
      .where("pending_unconformity_id", pending_unconformity_id)
      .del();
    return response;
  },
};
