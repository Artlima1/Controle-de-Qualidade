const Users = require("../models/UserModel");
const Firebase = require("../utils/Firebase");

module.exports = {
  async createUser(req, res) {
    let firebase_uid;
    try {
      const user = req.body;

      try {
        firebase_uid = await Firebase.createNewUser(
          user.email,
          user.password
        );
      } catch (error) {
        console.warn(error.message);
        return res.status(402).json({error});
      }

      user.firebase_uid = firebase_uid;
      delete user.password;

      const user_id = await Users.create(user);
      return res.status(200).json({ user_id });
    } catch (error) {
      if (firebase_uid) {
        Firebase.deleteUser(firebase_uid);
        throw new Error("Erro no firebase");
      }

      console.warn(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async forgetPassword(req, res) {
    try {
      const email = req.body.email;

      await Firebase.sendPasswordChangeEmail(email);

      return res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async getUsers(req, res) {
    try {
      const filters = req.query;
      const users = await Users.read(filters);
      return res.status(200).json(users);
    } catch (error) {
      console.warn(error.message);
      return res.status(500).json("internal server error");
    }
  },

  async deleteUser(req, res) {
    try {
      const {user_id} = req.params;
      const result = await Users.read({user_id: user_id});
      const firebase_uid = result[0].firebase_uid;
      await Firebase.deleteUser(firebase_uid);
      await Users.delete(user_id);
      return res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
      console.warn(error.message);
      return res.status(500).json("internal server error");
    }
  }
};
