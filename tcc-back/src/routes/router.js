const express = require("express");
const medicamentoRouter = require("./medicamentoRouter");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("It's working!");
});

router.use("/medicamento", medicamentoRouter);

module.exports = router;