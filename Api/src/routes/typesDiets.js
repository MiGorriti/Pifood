const { Router } = require('express');
const router = Router()
const axios = require("axios")
const { preLoadDiets } = require("../Controllers/diets");
const { Diet } = require("../db")


router.get("/", async (req,res,next) => {
    try {
        let dietDb = await Diet.findAll()
        res.status(200).send(dietDb)
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;