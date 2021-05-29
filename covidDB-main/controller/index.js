const getStatesData = require("../utils/stateHelper").getStatesData;
const search = require("../utils/stateHelper").queryData;
const transformData = require("../utils/stateHelper").transformData;
const queriedStatesData = require("../utils/stateHelper").queriedStatesData;
const getStateWiseData = require("../utils/stateHelper").getStateWiseData;

module.exports.getStates = async (req, res) => {
  const { apiName } = req.query;
  let data = await getStatesData(apiName);
  return res.json(201, {
    message: "Succesfully Queried States",
    data: {
      data: data,
    },
  });
};

module.exports.getByStateName = async (req, res) => {
  const { apiName, location } = req.query;
  let data = await getStatesData(apiName);
  let result = search(data.finalDataArray, location);
  return res.json(201, {
    data: result,
  });
};

module.exports.getInidaSeriesData = async (req, res) => {
  const { apiName, key } = req.query;
  let searchResult = await getStatesData(apiName);
  let resultArray = await transformData({ key, searchResult });
  // console.log(resultArray);
  return res.json(201, {
    message: "Successfully Queried States",
    data: {
      data: resultArray,
      message: "success",
    },
  });
};

module.exports.getStateSeriesData = async (req, res) => {
  const { apiName, location } = req.query;

  let searchResult = await getStatesData(apiName);

  let resultArray = await queriedStatesData(
    searchResult.finalDataArray,
    location
  );
  return res.json("201", {
    message: "success in querying Data",
    data: resultArray,
  });
};

module.exports.districtWiseData = async (req, res) => {
  const { apiName, location } = req.query;
  let searchResult = await getStatesData(apiName);
  let dataOfGivenState = getStateWiseData(
    searchResult.finalDataArray,
    location
  );
  return res.json(201, {
    data: dataOfGivenState,
    message: "sucess",
  });
};
