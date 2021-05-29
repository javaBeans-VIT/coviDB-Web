let env = require("./environment");
module.exports.getInferMecdicaKey = () => {
  return {
    "APP-ID": env.infermeciaAPPID,
    "App-Key": env.infermeciaAppKey,
  };
};
