const connection = require("../database/connection");
const { v4: uuidv4 } = require("uuid");
const trxProvider = connection.transactionProvider();

module.exports = {
  async create(complete_unconformity) {
    complete_unconformity.complete_unconformity_id = uuidv4();

    risks_in_unconformity = await complete_unconformity.risks.map(risk => {
      return {risk_id: risk, unconformity_id: complete_unconformity.complete_unconformity_id}
    });
    delete complete_unconformity.risks;

    norms_in_unconformity = await complete_unconformity.norms.map(norm => {
      return {norm_item: norm, unconformity_id: complete_unconformity.complete_unconformity_id}
    });
    delete complete_unconformity.norms;

    const trx = await trxProvider();
    await trx("risk_in_unconformity").insert(risks_in_unconformity);
    await trx("norm_in_unconformity").insert(norms_in_unconformity);
    await trx("resolved_unconformity").where({resolved_unconformity_id: complete_unconformity.resolved_unconformity_id}).update({completed: true});
    await trx("complete_unconformity").insert(complete_unconformity);
    await trx.commit();
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
      .where({complete_unconformity_id})
      .update(updated_complete_unconformity);
    return response;
  },

  async delete(complete_unconformity_id) {
    const response = await connection("complete_unconformity")
      .where({complete_unconformity_id})
      .del();
    return response;
  },
};
