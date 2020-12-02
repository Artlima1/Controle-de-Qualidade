const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(complete_unconformity) {
    complete_unconformity.complete_unconformity_id = uuidv4();
    await connection("complete_unconformity").insert(complete_unconformity);
    return complete_unconformity.complete_unconformity_id;
  },

  async read(filters) {
    let response;
    response = await connection("complete_unconformity")
      .join("resolved_unconformity", "resolved_unconformity.resolved_unconformity_id", "complete_unconformity.resolved_unconformity_id")
      .join("pending_unconformity", "pending_unconformity.pending_unconformity_id", "resolved_unconformity.pending_unconformity_id")
      .where(filters)
      .select("*");
    return response;
  },

  async update(complete_unconformity_id, updated_complete_unconformity) {
    const response = await connection("complete_unconformity")
      .where("complete_unconformity_id", complete_unconformity_id)
      .update(updated_complete_unconformity);
    return response;
  },

  async delete(complete_unconformity_id) {
    const response = await connection("complete_unconformity")
      .where("complete_unconformity_id", complete_unconformity_id)
      .del();
    return response;
  },
};
