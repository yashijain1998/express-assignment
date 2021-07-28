const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.use(express.json());

/* Home page */
router.get('/' , (req,res) => {
    res.redirect('/users/:user/groups');
})

/* Get all group with their cities */
router.get('/users/:user/groups' , (req,res) => {
    res.send(cityController.findGroup(req.params.user));
})

/* Get all cities for a single group with their weather data*/
router.get('/users/:user/groups/:region' , (req,res) => {
    res.send(cityController.findCity(req.params.user,req.params.region));
})

/* For a group get a single city along with its weather data */
router.get('/users/:user/groups/:region/:city' , async (req,res) => {
    let wdata = await cityController.cityWeather(req.params.user,req.params.region,req.params.city)
    res.send(wdata);
})

/* Create a group with a min of one city. */
router.post('/users/:user/groups' , (req,res) => {
    res.send(cityController.addNewGroup(req.params.user, req.body.region, req.body.city));
})

/* Add a city in a group.*/
router.post('/users/:user/groups/:region' , (req,res) => {
    res.send(cityController.addCityInGroup(req.params.user, req.params.region, req.body.city));
})

/* Remove a city from the group. */
router.delete('/users/:user/groups/:region/:city' , (req,res) => {
    res.send(cityController.removecity(req.params.user,req.params.region,req.params.city));
})

/*Remove a group. */
router.delete('/users/:user/groups/:region' , (req,res) => {
    res.send(cityController.removeGroup(req.params.user,req.params.region))
})

module.exports = router;