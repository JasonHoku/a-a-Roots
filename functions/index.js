const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
var dbData = {};
let userID = {};

console.log("Initiating a-a Roots Backend");

exports.getAARootsData = functions.https.onRequest((req, res) => {
  res.status(200);
  const cors = require("cors")({ origin: true });
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  try {
    let runOnce = 0;
    //Declare CORs Rules
    const cors = require("cors")({ origin: true });
    res.status(200);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    cors(req, res, () => {
      const cors = require("cors")({ origin: true });
      res.status(200);
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      const gotUID = JSON.parse(req.headers["headertokens"]).uid;
      userID = JSON.parse(req.headers["headertokens"]).uid;
      const gotHeaders = JSON.stringify(req.headers["headertokens"]);
      async function getDBData() {
        var db = admin.firestore();
        db.collection("totalClicks")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var key = doc.id;
              var data = doc.data();
              data["key"] = key;
              dbData[key] = data;
              //Development block for localhost emulator
              //Begin Auth Comparison
              if (dbData.value) {
                //Successful Admin UID

                res.send(JSON.stringify(dbData.value.population));
                res.status(200).send();
              } else {
                //Not Admin UID
                res.send(JSON.stringify("Error Retrieving Data"));
                res.status(200).send();
              }
            });
          });
      }
      getDBData();
    });
  } catch (error) {}
});

exports.oneHourInterval = functions.pubsub
  .schedule("every 60 minutes")
  .onRun((context) => {
    // Detect FireStoreData
    function buildGeneratedData() {
      // console.log("||| Running Build Data");
      let todoList = "";
      let listArray = [];
    }
    buildGeneratedData();
  });
// const axios = require("axios");

// // "https://api.instagram.com/v1/users/aarootsmaui/media/recent/?client_id=1ed36ddb32788d6819e034233d9e00b8"

// // ("https://api.instagram.com/v1/users/search?q=aarootsmaui&client_id=1ed36ddb32788d6819e034233d9e00b8");

// return axios
//   .get(
//     "https://api.instagram.com/v1/users/search?q=aarootsmaui&client_id=1ed36ddb32788d6819e034233d9e00b8"
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(err.toJSON());
//   });
