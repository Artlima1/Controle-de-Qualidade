const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async create(resolved_unconformity) {
    resolved_unconformity.resolved_unconformity_id = uuidv4();
    await connection("resolved_unconformity").insert(resolved_unconformity);
    return resolved_unconformity.resolved_unconformity_id;
  },

  async read(filters) {
    let response;
    response = await connection("resolved_unconformity")
      .join("pending_unconformity", "pending_unconformity.pending_unconformity_id", "resolved_unconformity.pending_unconformity_id")
      .where(filters)
      .select("*");
    return response;
  },

  async update(resolved_unconformity_id, updated_resolved_unconformity) {
    const response = await connection("resolved_unconformity")
      .where("resolved_unconformity_id", resolved_unconformity_id)
      .update(updated_resolved_unconformity);
    return response;
  },

  async delete(resolved_unconformity_id) {
    const response = await connection("resolved_unconformity")
      .where("resolved_unconformity_id", resolved_unconformity_id)
      .del();
    return response;
  },
};
