require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Data = require("./models/data");

const app = express();

app.use(bodyParser.json());

app.get("/data", async (req, res, next) => {
  try {
    const data = await Data.find();
    res.status(200).json({ message: "Data fetch successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!!!" });
  }
});

app.post("/calculate", async (req, res, next) => {
  try {
    const { salary, salary_splite } = req.body;
    console.log(salary, salary_splite);

    if (!salary || salary <= 0) {
      return res.status(400).json({ message: "Salary is missing!!" });
    }
    let newSalary_splite = [];
    if (salary_splite && salary_splite.length > 0) {
      newSalary_splite = salary_splite.map((item) => {
        const total = (salary * item.percentage) / 100;
        return {
          ...item,
          total,
        };
      });
    }

    const data = new Data({
      salary,
      salary_splite: newSalary_splite,
    });

    await data.save();

    res.status(201).json({ message: "Data calculated successfull!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!!!" });
  }
});

mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
