const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  //   console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(201, {
        message: "Invalid username or password",
      });
    }
    // console.log(user.sex);
    let newUser = {
      email: user.email,
      id: user._id,
      gender: user.gender,
      age: user.age,
    };
    return res.json(200, {
      message: "Sign in successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(newUser, "covidDB", { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    console.log("********", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.signUp = function (req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.json(401, {
      data: {
        message: "password and confirm password doesnot match",
      },
    });
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      return res.json(402, {
        data: {
          message: "user already exsits",
          success: false,
        },
      });
    } else {
      User.create(
        {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
        },
        (err, user) => {
          if (user) {
            return res.json(202, {
              data: {
                message: "user created",
                success: true,
              },
            });
          } else if (err) {
            return res.json(201, {
              data: {
                message: "Validation Error Please Input All The field",
                success: false,
              },
            });
          }
        }
      );
    }
  });
};

module.exports.failiureRedirect = (req, res) => {
  return res.json("402", {
    data: {
      message: "invalid username or password",
      success: false,
    },
  });
};

module.exports.upadate = function (req, res) {
  console.log("update");
  let { email, password, age, gender, oldPass } = req.body;
  User.find({ email: email }, function (err, user) {
    if (user && user[0].password == oldPass) {
      user[0].password = password;
      user[0].age = age;
      user[0].gender = gender;
      user[0].save().then(
        function () {
          return res.json(201, {
            data: {
              message: "successfully updated",
              success: true,
            },
          });
        },
        function (errr) {
          return res.json(401, {
            data: {
              message: "updated error",
              success: false,
            },
          });
        }
      );
    } else {
      return res.json(201, {
        data: {
          message: "updated error please check your password",
          success: false,
        },
      });
    }
    //
  });
};
