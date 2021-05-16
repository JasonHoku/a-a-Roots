module.exports.YouTubeTools = async function (props) {
  // const { YTSearcher, validOptions } = require("ytsearcher");
  // const admin = require("firebase-admin");
  // let youTubeAPIKey = "";
  // var dbData = {};
  // let userID = props.userID;
  // console.log("|Y| Running YouTube API");
  // async function getDBData() {
  //   var db = admin.firestore();
  //   db.collection("Secrets")
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         var key = doc.id;
  //         var data = doc.data();
  //         data["key"] = key;
  //         dbData[key] = data;
  //       });
  //       console.log("|Y| Got Keys, Connecting Now");
  //       youTubeAPIKey = String(dbData.APIKeys.YTAPI);
  //       if (dbData.MetaData.YouTubeOn === false) {
  //         async function setYouTubeOnline() {
  //           var db3 = admin.firestore();
  //           db3
  //             .collection("Secrets")
  //             .doc("MetaData")
  //             .set({ YouTubeOn: true }, { merge: true });
  //         }
  //         console.log("|Y| Set Online To True");
  //         async function getYouTubeData() {
  //           var db = admin.firestore();
  //           db.collection("Secrets")
  //             .get()
  //             .then((snapshot) => {
  //               snapshot.forEach((doc) => {
  //                 var key = doc.id;
  //                 var data = doc.data();
  //                 data["key"] = key;
  //                 dbData[key] = data;
  //               });
  //               const searcher = new YTSearcher(dbData.APIKeys.YTAPI);
  //               let content = [];
  //               let concResults = [];
  //               console.log("|Y|Connected Getting Data");
  //               async function runSendData() {
  //                 let result = await searcher.search("CollegeHumor", {
  //                   type: "video, channel",
  //                   publishedAfter: "2021-02-01T00:00:00Z",
  //                   order: "date",
  //                   maxResults: 5,
  //                 });
  //                 result.currentPage.forEach((ele) => {
  //                   if (ele.channelTitle === "CollegeHumor") {
  //                     content.push(ele);
  //                   }
  //                 });
  //                 console.log("|Y| Sending Results");
  //                 content.forEach((ele) => {
  //                   concResults.push({
  //                     Title: ele.title + "%br",
  //                     URL: ele.url + "%br",
  //                     PublishedAt: ele.publishedAt + "%br %br",
  //                   });
  //                 });
  //                 console.log(concResults);
  //                 console.log(
  //                   `This is an automated JavaScript bot that queries YouTube channels incrementally for new releases. \r\n Total Loads:  \r\n \r\n ${JSON.stringify(
  //                     concResults
  //                   )
  //                     .replace("[", "")
  //                     .replace("},{", "")
  //                     .replace(/%br/g, "\r\n")
  //                     .replace(/","/g, "")
  //                     .replace(/}/g, "")
  //                     .replace(/{/g, "\n")
  //                     .replace(/\n"/g, "")
  //                     .replace(/\n "/g, "")
  //                     .replace("]", " ")}`
  //                 );
  //                 // Database
  //                 var db3 = admin.firestore();
  //                 db3
  //                   .collection("Secrets")
  //                   .doc("MetaData")
  //                   .set({ YouTubeOn: true }, { merge: true });
  //                 //begin detection of YouTubeOnOff
  //                 if (!dbData.MetaData.YouTubeOn) {
  //                   //Call Database Every 60s For OffOn Switch
  //                 }
  //                 // Detect FireStoreData
  //                 function buildGeneratedData() {
  //                   addCount();
  //                   let todoList = "";
  //                   let listArray = [];
  //                   var dbData2 = {};
  //                   var db = admin.firestore();
  //                   db.collection("Secrets")
  //                     .get()
  //                     .then((snapshot) => {
  //                       snapshot.forEach((doc) => {
  //                         var key = doc.id;
  //                         var data = doc.data();
  //                         data["key"] = key;
  //                         dbData[key] = data;
  //                       });
  //                       db.collection("Public")
  //                         .get()
  //                         .then((snapshot) => {
  //                           snapshot.forEach((doc) => {
  //                             var key2 = doc.id;
  //                             var data2 = doc.data();
  //                             data2["key"] = key2;
  //                             dbData2[key2] = data2;
  //                           });
  //                           console.log("|Y| Building GeneratedData");
  //                           //Got Secrets then Build Public Data
  //                           var db = admin.firestore();
  //                           db.collection("Users")
  //                             .doc(String(dbData.Admins[0]))
  //                             .get()
  //                             .then((doc) => {
  //                               todoList = JSON.parse(
  //                                 JSON.stringify(doc.data())
  //                               ).Todo;
  //                               todoList.forEach((todo) =>
  //                                 listArray.push(String(todo + " "))
  //                               );
  //                               //Got Admin ToDo Now Generate Text
  //                               async function sendGeneratedData() {
  //                                 var db2 = admin.firestore();
  //                                 db2
  //                                   .collection("Public")
  //                                   .doc("GeneratedData")
  //                                   .set(
  //                                     {
  //                                       LatestRun: admin.firestore.FieldValue.serverTimestamp(),
  //                                       RawText: ` ${
  //                                         Date(
  //                                           dbData2.GeneratedData.LatestRun
  //                                         ).split("(")[0]
  //                                       } -@!%!%!@-  ${String(
  //                                         parseInt(dbData2.RunCounter.count) + 1
  //                                       )}
  //                 -@!%!%!@-  ${String(listArray).replace(/,/g, " ")}`,
  //                                     },
  //                                     { merge: true }
  //                                   );
  //                               }
  //                               sendGeneratedData();
  //                             });
  //                         });
  //                     });
  //                 }
  //                 buildGeneratedData();
  //               }
  //             });
  //         }
  //         getYouTubeData().then(runSendData());
  //         setYouTubeOnline();
  //       }
  //     });
  // }
  // getDBData();
};
