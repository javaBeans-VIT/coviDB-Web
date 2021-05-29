const api = require("./api").api();
const os = require("os");
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");
const fetch = require("node-fetch");
module.exports.getStatesData = async (apiName) => {
  try {
    const target = api[apiName]; //file
    const res = await fetch(target, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
        //'Authorization': //in case you need authorisation
      },
    });

    if (res.status === 200) {
      let data = await res.text();
      let newdata = parse(data);
      let header = newdata[0];
      let finalDataArray = [];
      for (entry of newdata) {
        if (entry != header) {
          let object = {};
          for (let i = 0; i < header.length; i++) {
            let key = header[i];
            let value = entry[i];
            object[key] = value;
          }
          finalDataArray.push(object);
        }
      }
      let finalData = { finalDataArray };
      return finalData;
    } else {
      console.log(`Error code ${res.status}`);
      return undefined;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports.queryData = (data, location) => {
  let reqData = {};
  data.forEach((data) => {
    if (data.State === location) {
      reqData = data;
    }
  });
  return reqData;
};

function mapParamsToTableHeader(field) {
  if (field == "Confirmed") return "Total Confirmed";
  else if (field == "Recovered") return "Total Recovered";
  else if (field == "Deceased") return "Total Deceased";
  else return field;
}

module.exports.transformData = async (data) => {
  let keys = data.key.split(",");
  let searchResult = data.searchResult.finalDataArray;
  let result = [];
  searchResult.forEach((res) => {
    let instance = {};

    keys.forEach((field) => {
      let newField = mapParamsToTableHeader(field);

      instance[field] = res[newField];
    });
    result.push(instance);
  });

  return result;
};

function getMonth(date) {
  let dateArray = {
    01: "january",
    02: "february",
    03: "march",
    04: "april",
    05: "may",
    06: "june",
    07: "july",
    08: "august",
    09: "september",
    10: "october",
    11: "november",
    12: "december",
  };

  return dateArray[parseInt(date.split("-")[1])];
}
module.exports.queriedStatesData = async (data, location) => {
  let result = [];
  data.forEach((instance) => {
    if (instance.State == location) {
      instance["Month"] = getMonth(instance["Date"]);
      result.push(instance);
    }
  });
  return result;
};

function checkForLocation(data, location) {
  return data == location;
}
module.exports.getStateWiseData = function (data, location) {
  let result = [];
  data.forEach((element) => {
    if (element.State == location) {
      result.push(element);
    }
  });
  result.sort(function (x, y) {
    return y.Confirmed - x.Confirmed;
  });
  result.length = 5;
  return result;
};
