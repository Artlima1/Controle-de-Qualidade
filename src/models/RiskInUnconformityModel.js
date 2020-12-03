const connection = require("../database/connection");

module.exports = {
  async create(risk_in_unconformity) {
    return await connection("risk_in_unconformity").insert(
      risk_in_unconformity
    );
  },

  async read(filters) {
    let response;
    response = await connection("risk_in_unconformity").where(filters).select("*");
    return response;
  },

  async getRisksInUnconformity(unconformity_id) {
    const response = await connection("risk_in_unconformity")
    .where({unconformity_id})
    .join("risk", "risk.risk_id", "risk_in_unconformity.risk_id")
    .select("risk_in_unconformity.risk_id", "risk.description");
    return response;
  },

  async getUnconformityCountByRisk(){
    response = await connection("risk_in_unconformity")
    .count("unconformity_id")
    .groupBy("risk_id")
  },

  async delete(risk_id, unconformity_id) {
    const query = { risk_id, unconformity_id };
    const response = await connection("risk_in_unconformity")
      .where(query)
      .del();
    return response;
  },
};
