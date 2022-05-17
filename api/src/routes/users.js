const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY_WORD_JWT } = process.env;
// Register User

// router.post("/create", async (req, res, next) => {
//   const { userName, email, password, firstName, lastName, phone } = req.body;

//   try {
//     let Hashpassword = bcrypt.hashSync(password, 10);
//     const userFound = User.findOne({ where: { email } });
//     if (userFound) {
//       return response.status(401).json({
//         error: "email is already used",
//       });
//     }
//     const newUser = await User.create({
//       userName,
//       email,
//       password: Hashpassword,
//       firstName,
//       lastName,
//       phone,
//     });

//     res.status(200).send(newUser);
//   } catch (error) {
//     next(error);
//   }
// });
router.post("/create", async (req, res, next) => {
  const { userName, email, password, firstName, lastName, phone } = req.body;

  try {

    let Hashpassword = bcrypt.hashSync(password, 10);
    const userFound = await User.findOne({ where: { email } });
    if (userFound) {
      return res.status(200).json({
        error: "email is already used",
      });
    }

    const newUser = await User.create({
      userName,
      email,
      password,
      firstName,
      lastName,
      phone,
    });

    res.status(200).send("done");
  } catch (error) {
    next(error);
  }
});

// Login User

router.post("/login", async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ where: { userName } });
    //console.log(user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCorrect)) {
      response.status(400).json({
        error: "invalid user or password",
      });
    }
    const userforToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userforToken, KEY_WORD_JWT);
    res.status(200).send({
      firstName: user.firstName,
      username: user.userName,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const { firstName } = req.query;

  try {
    if (firstName) {
      const findByName = await User.findAll({
        include: [
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"],
              },
            ],
          },
        ],
      });
      const found = await findByName?.filter((e) =>
        e.firstName.toLowerCase().includes(firstName.toLowerCase())
      );

      found.length
        ? res.status(200).json(found)
        : res.json("User not found, please try another search");
    } else {
      const getAll = await User.findAll({
        include: [
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"],
              },
            ],
          },
        ],
      });
      return res.status(200).send(getAll);
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    if (userId) {
      const findById = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Ask,
            attributes: ["content"],
            include: [
              {
                model: Answer,
                attributes: ["content"],
              },
            ],
          },
        ],
      });

      console.log(findById);
      return res.send(findById);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
