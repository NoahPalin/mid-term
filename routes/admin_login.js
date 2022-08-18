const express = require("express");
const { getFeaturedCards } = require("../database");
const router = express.Router();
var cookieParser = require('cookie-parser')


// Note: the "/" really means /admin, this is specified in the server.js file where all the routes are mounted.
router.get("/", (req, res) => {
  res.cookie("account", 1);

  //////////////////////////////////////////////// This code is just for testing purposes and will be removed later.
  getFeaturedCards().then((featuredCards) => {
    const templateVars = {
      featuredCards,
    };
    res.render("landing", templateVars);
  });
  ////////////////////////////////////////////////

  // res.render("admin_homepage", templateVars); Render page once made.
});
module.exports = router;