const router = require("express").Router();
const postRouter = require("./postRoutes");
const getRouter = require("./getRoutes");

router.use("/", postRouter, getRouter);


module.exports = router;