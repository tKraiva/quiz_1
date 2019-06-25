const express = require("express");
const knex = require("../db/client");
const router = express.Router();


// GET notes/
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("clucks")
    .orderBy("createdAt", "DESC")
    .then(clucks => {
      res.render("../clucks/index", { clucks: clucks ,username: req.cookies.username});
    });
});

// GET notes/new
router.get("/new", (req, res) => {
  res.render("../clucks/new",{username: req.cookies.username});
});

//POST notes/
router.post("/", (req, res) => {
  
  
  knex('clucks')
    .insert({
      image_url: req.body.title,
      content: req.body.body
    })
   
    .then(clucks => {
      res.redirect(`/clucks`);
    });
});



// SHOW note
// GET notes/:id
router.get("/:id", (req, res) => {
  const clucksId = req.params.id;
  knex("clucks")
    .where("id", clucksId)
    .first()
    .then((clucks) => {
      if (clucks) {
        res.render("../clucks/show",{username: req.cookies.username, clucks: clucks})
      } else {
        res.send(`<div>Cannot find note with id=${clucksId}</div>`)
      }
    })
});





module.exports = router;
