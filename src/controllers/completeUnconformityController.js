const CompleteUnconformity = require("../models/CompleteUnconformityModel");
const ResolvedUnconformity = require("../models/resolvedUnconformityModel");
const RiskInUnconformity = require("../models/RiskInUnconformityModel");
const Risk = require("../models/RiskModel");
const Users = require("../models/UserModel");

module.exports = {
  async createUnconformity(req, res) {
    try {
      let unconformity = req.body;
      const risks = req.body.risks;
      delete unconformity.risks;

      const resolved_unconformity_id = await ResolvedUnconformity.read({resolved_unconformity_id: unconformity.resolved_unconformity_id})
      if (resolved_unconformity_id.length===0){
        return res.status(400).json({message: "Resolved Unconformity not found"});
      }

      const exists = await CompleteUnconformity.read({resolved_unconformity_id: unconformity.resolved_unconformity_id});
      if (exists.length !== 0) {
        return res.status(400).json({message: "This unconformity has already been completed!"});
      }
      
      const completeUnconformity = await CompleteUnconformity.create(unconformity);
      const existenceAmount = await Risk.checkExitence(risks);
      if (risks.length!==existenceAmount){
        return res.status(400).json({ message: "One or more of the risks doesn't exist"});
      }

      risks_in_unconformity = await risks.map(risk => {
        return {risk_id: risk, unconformity_id: completeUnconformity}
      });

      await RiskInUnconformity.create(risks_in_unconformity);

      return res.status(200).json({ completeUnconformity });
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
          const risks_in_unconformity = await RiskInUnconformity.getRisksInUnconformity(unconformity.complete_unconformity_id);
          console.log("🚀 ~ file: completeUnconformityController.js ~ line 49 ~ unconformities.map ~ unconformity.complete_unconformity_id", unconformity.complete_unconformity_id)
          console.log("🚀 ~ file: completeUnconformityController.js ~ line 49 ~ unconformities.map ~ risks_in_unconformity", risks_in_unconformity)
          
          unconformity.risks = risks_in_unconformity;
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
