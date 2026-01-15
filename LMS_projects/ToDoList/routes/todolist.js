const express = require("express");
const router = express.Router();

let items = [];


router.get("/", (req, res) => {
  res.render("index", { items });
});

router.post("/create", (req, res) => {
  console.log(items);
  const title = req.body.title;
  if (!title) return res.redirect("/");

  items.push({
    uid: Date.now().toString(),
    title
  });

  res.redirect("/");
});


router.post("/remove/:uid", (req, res) => {
  items = items.filter(i => i.uid !== req.params.uid);
  res.redirect("/");
});


router.get("/modify/:uid", (req, res) => {
  const current = items.find(i => i.uid === req.params.uid);
  if (!current) return res.redirect("/");

  res.render("update", { current });
});


router.post("/save/:uid", (req, res) => {
  const updatedTitle = req.body.title;

  items = items.map(i =>
    i.uid === req.params.uid ? { ...i, title: updatedTitle } : i
  );

  res.redirect("/");
});

module.exports = router;
