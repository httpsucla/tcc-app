const express = require("express");
const medicamentoRouter = express.Router();

medicamentoRouter.get("/listAllMedicamento", (req, res) => {
    return res.json("aaaaah");
});

medicamentoRouter.post("/newMedicamento", (req, res) => {
    
})