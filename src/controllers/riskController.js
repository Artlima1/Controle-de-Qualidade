const Risk = require("../models/RiskModel");
const RiskInUnconformity = require("../models/RiskInUnconformityModel")

module.exports = {
  async createrisk(req, res) {
    try {
      const risk = req.body;

      const risk_id = await Risk.create(risk);
      return res.status(200).json({ risk_id });

    } catch (error) {
      console.warn(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async getRisks(req, res) {
    try {
      const filters = req.query;
      const Risks = await Risk.read(filters);
      return res.status(200).json({Risks});
    } catch (error) {
      console.warn(error.message);
      return res.status(500).json("internal server error");
    }
  },

  async updatedRisk(req, res) {
    try {
      const newFields = req.body;
      const risk_id = req.params.risk_id;

      const response = await Risk.update(
        risk_id,
        newFields
      );

      if (response !== 1) {
        return res.status(400).json("Risk not found");
      } else {
        return res.status(200).json({message: "Updated Successfully!"});
      }
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  async deleterisk(req, res) {
    try {
      const {risk_id} = req.params;
      await Risk.delete(risk_id);
      return res.status(200).json({message: "risk deleted successfully!"});
    } catch (error) {
      console.warn(error.message);
      return res.status(500).json("internal server error");
    }
  },

  async getRiskUnconformitiesCount(req, res) {
    try {
      const response = await RiskInUnconformity.getUnconformityCountByRisk();
      return res.status(200).json({response});
    } catch (error) {
      console.warn(error.message);
      return res.status(500).json("internal server error");
    }
  }
};
