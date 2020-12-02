const connection = require("../database/connection");

module.exports = {
  async create(risk) {
    return await connection("risk").insert(risk);
  },

  async read(filters) {
    let response;
    response = await connection("risk").where(filters).select("*");
    return response;
  },

  async update(risk_id, updated_risk) {
    const response = await connection("risk")
      .where("risk_id", risk_id)
      .update(updated_risk);
    return response;
  },

  async delete(risk_id) {
    const response = await connection("risk").where("risk_id", risk_id).del();
    return response;
  },
};
