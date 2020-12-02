const ResolvedUnconformity = require("../models/ResolvedUnconformityModel");
const PendingUnconformity = require("../models/PendingUnconformityModel");
const Users = require("../models/UserModel");

module.exports = {
  async createUnconformity(req, res) {
    try {
      let unconformity = req.body;

      const responsable_id = await PendingUnconformity.getFieldById(unconformity.pending_unconformity_id, "responsable");
			if(responsable_id === 0) {
        return res.status(400).json({message: "Unconformity not found"});
      }
      if (responsable_id !== req.session.user.user_id) {
        return res.status(403).json({message: "You're not responsable for this unconformity!"});
      }
      
      const response = await ResolvedUnconformity.create(unconformity);

      return res.status(200).json({response});
    } catch (error) {
      console.warn(error);
      return res.status(500).json({message: "Internal Server Error"});
    }
  },

  async getAllUnconformities(req, res) {
    try {
      const filters = req.query;

      const unconformities = await ResolvedUnconformity.read(filters);

			//Joining with users table, but storing responsable and user in keys insted of in the main object
      const response = await Promise.all(
        unconformities.map(async (unconformity) => {
          const created_by = await Users.read({
            user_id: unconformity.created_by,
          });
          const responsable = await Users.read({
            user_id: unconformity.responsable,
          });
          unconformity.created_by = created_by[0];
          unconformity.responsable = responsable[0];
          return unconformity;
        })
      );

      return res.status(200).json({response});
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  async updateUnconformity(req, res) {
    try {
      const newFields = req.body;
      const resolved_unconformity_id = req.params.resolved_unconformity_id;

      const response = await ResolvedUnconformity.update(
        resolved_unconformity_id,
        newFields
      );

      if (response !== 1) {
        return res.status(400).json("Unconformity not found");
      } else {
        return res.status(200).json({message: "Updated Successfully!"});
      }
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },

  async deleteUnconformity(req, res) {
    try {
      const Resolved_unconformity_id = req.params.Resolved_unconformity_id;

      const response = await ResolvedUnconformity.delete(Resolved_unconformity_id);

      if (response !== 1) {
        return res.status(400).json("Unconformity not found");
      } else {
        return res.status(200).json({message: "Deleted Successfully!"});
      }
    } catch (error) {
      console.warn(error);
      return res.status(500).json("Internal Server Error");
    }
  },
};
