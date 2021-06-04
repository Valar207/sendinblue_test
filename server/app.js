const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const port = process.env.port || 8080;
const axios = require("axios");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyparser.json());

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on ${port}`);
});

const group = "department";
const mode = "json";
const site = "sendinblue";

const api_url = "https://api.lever.co/v0/postings";

app.get("/sendinblue", async (req, res) => {
  try {
    const url = `${api_url}/${site}?mode=${mode}&group=${group}`;
    const fetch = await axios.get(url);
    json = await fetch.data;
    res.send(json);
  } catch (err) {
    console.log(err);
  }
});

app.get("/filter", async (req, res) => {
  const { location, department, jobType } = req.query;
  try {
    const url = `${api_url}/${site}?mode=${mode}&group=${group}&location=${location}&commitment=${jobType}&department=${department}`;
    const fetch = await axios.get(url);
    json = await fetch.data;
    res.send(json);
  } catch (err) {
    console.log(err);
  }
});
