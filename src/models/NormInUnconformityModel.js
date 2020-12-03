const { response } = require("express");
const connection = require("../database/connection");

module.exports = {
  async create(norm_in_unconformity) {
    return await connection("norm_in_unconformity").insert(
      norm_in_unconformity
    );
  },

  async read(filters) {
    let response;
    response = await connection("norm_in_unconformity").where(filters).select("*");
    return response;
  },

  async getNormsInUnconformity(unconformity_id) {
    const response = await connection("norm_in_unconformity")
    .where({unconformity_id})
    .select("norm_item");
    return response;
  },

  async getUnconformityCountByNorm(){
    const response = await connection("norm_in_unconformity")
    .count("unconformity_id AS count")
    .groupBy("norm_id")
    .select("norm_id")
    return response;
  },

  async delete(norm_item, unconformity_id) {
    const query = { norm_item, unconformity_id };
    const response = await connection("norm_in_unconformity")
    .where(query)
    .del();
    return response;
  },
};
