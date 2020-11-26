const admin = require("firebase-admin");
const firebase = require("firebase/app");

require("firebase/auth");

var serviceAccount = require("../../serviceAccountKey.json");
var firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://controle-de-qualidade-5e700.firebaseio.com",
});

module.exports = {
  async createNewUser(email, password) {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return result.user.uid;
  },

  async deleteUser(uid) {
    const result = await admin.auth().deleteUser(uid);
    return result;
  },

  async sendPasswordChangeEmail(emailAddress) {
    const result = await firebase.auth().sendPasswordResetEmail(emailAddress);
    return result;
  },

  async login(email, password) {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return result.user.uid;
  },
};
