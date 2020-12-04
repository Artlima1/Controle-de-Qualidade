const CompleteUnconformity = require("../models/CompleteUnconformityModel");
const ResolvedUnconformity = require("../models/resolvedUnconformityModel");
const RiskInUnconformity = require("../models/RiskInUnconformityModel");
const NormInUnconformity = require("../models/NormInUnconformityModel");
const Risk = require("../models/RiskModel");
const Users = require("../models/UserModel");

module.exports = {
  async createUnconformity(req, res) {
    try {
      let unconformity = req.body;
      const risks = req.body.risks;
      const norms = req.body.norms;

      const [resolved_unconformity] = await ResolvedUnconformity.read({
        resolved_unconformity_id: unconformity.resolved_unconformity_id,
      });
      if (!resolved_unconformity) {
        return res
          .status(400)
          .json({ message: "Resolved Unconformity not found" });
      }
      if (resolved_unconformity.completed) {
        return res
          .status(400)
          .json({
            message: "Resolved Unconformity has already been completed!",
          });
      }

      const existenceAmount = await Risk.checkExitence(risks);
      if (risks.length !== existenceAmount) {
        return res
          .status(400)
          .json({ message: "One or more of the risks doesn't exist" });
      }

      const completeUnconformity_id = await CompleteUnconformity.create(
        unconformity
      );

      return res.status(200).json({ completeUnconformity_id });
    } catch (error) {
      console.warn(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getAllUnconformities(req, res) {
    try {
      const filters = req.query;

      const unconformities = await CompleteUnconformity.read(filters);

      //Joining with users table, but storing responsable and user in keys insted of in the main object
      const response = await Promise.all(
        unconformities.map(async (unconformity) => {
          const created_by = await Users.read({
            user_id: unconformity.created_by,
          });
          const responsable = await Users.read({
            user_id: unconformity.responsable,
          });
          const response_risks = await RiskInUnconformity.getRisksInUnconformity(
            unconformity.complete_unconformity_id
          );
          const response_norms = await NormInUnconformity.getNormsInUnconformity(
            unconformity.complete_unconformity_id
          );

          unconformity.risks = response_risks;
          unconformity.norms = response_norms.map((norm) => {
            return norm.norm_item;
          });

          unconformity.created_by = created_by[0];
          unconformity.responsable = responsable[0];
          return unconformity;
        })
      );

      return res.status(200).json({ response });
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  async updateUnconformity(req, res) {
    try {
      const newFields = req.body;
      const complete_unconformity_id = req.params.complete_unconformity_id;

      const response = await CompleteUnconformity.update(
        complete_unconformity_id,
        newFields
      );

      if (response !== 1) {
        return res.status(400).json("Unconformity not found");
      } else {
        return res.status(200).json({ message: "Updated Successfully!" });
      }
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  async deleteUnconformity(req, res) {
    try {
      const complete_unconformity_id = req.params.complete_unconformity_id;

      const response = await CompleteUnconformity.delete(
        complete_unconformity_id
      );

      if (response !== 1) {
        return res.status(400).json("Unconformity not found");
      } else {
        return res.status(200).json({ message: "Deleted Successfully!" });
      }
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },
};
