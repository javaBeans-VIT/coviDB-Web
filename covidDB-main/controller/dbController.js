// const Hospital = require("../models/hospital");
// const Oxygen = require("../models/oxygen");
// const axios = require("axios");

// function insertDb() {
//   let url = "https://life-api.coronasafe.network/data/oxygen_v2.json";
//   axios.get(url).then((data) => {
//     let arr = data.data;
//     arr = arr.data;
//     arr.forEach((element) => {
//       Oxygen.create({
//         state: element.state,
//         district: element.district,
//         state_id: element.state_id,
//         district_id: element.district_id,
//         title: element.title,
//       });
//     });
//   });
// }
