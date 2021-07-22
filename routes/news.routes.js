const router = require("express").Router();
const axios = require("axios");

router.post("/fetchNews", (req, res, next) => {
    const { interests } = req.body;

    let myPromises = [];
    interests.map((interest) => {
      myPromises.push(axios.get(`https://api.nytimes.com/svc/topstories/v2/${interest}.json?api-key=aE2ooFQxAx0es9T0hnh0CI0I54wQzTtM`)); //pushing n promises in this array
    });
    Promise.all(myPromises)
        .then((response) => {
            let results = response.map((obj) => {
                return [obj.data.results];
            })
            
            res.status(200).json({ data: results });
        })
        .catch((err) => {
            next(err);
        }) 
});

module.exports = router;