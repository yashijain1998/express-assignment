const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.use(express.json());

/* Home page */
router.get('/' , (req,res) => {
    res.redirect('/users/:user/groups');
})

/* get all users */
router.get('/users' , (req,res) => {
    let {allUsers,code} = cityController.findUSers();
    res.status(code).send(allUsers);
})

/* Get all group with their cities */
router.get('/users/:user/groups' , (req,res) => {
    let {allgroup,code} = cityController.findGroup(req.params.user)
    res.status(code).send(allgroup);
})

/* Get all cities for a single group with their weather data*/
router.get('/users/:user/groups/:region' , (req,res) => {
    let {city,code} = cityController.findCity(req.params.user,req.params.region);
    res.status(code).send(city);
})

/* For a group get a single city along with its weather data */
router.get('/users/:user/groups/:region/:city' , async (req,res) => {
    let {weatherData,code} = await cityController.cityWeather(req.params.user,req.params.region,req.params.city);
    res.status(code).send(weatherData);
})

/* Create a group with a min of one city. */
router.post('/users/:user/groups' , (req,res) => {
    let {newGroup,code} = cityController.addNewGroup(req.params.user, req.body.region, req.body.city);
    res.status(code).send(newGroup);
})

/* Add a city in a group.*/
router.post('/users/:user/groups/:region' , (req,res) => {
    let {newCity,code} = cityController.addCityInGroup(req.params.user, req.params.region, req.body.city);
    res.status(code).send(newCity);
})

/* Remove a city from the group. */
router.delete('/users/:user/groups/:region/:city' , (req,res) => {
    let {deleteCity,code} = cityController.removecity(req.params.user,req.params.region,req.params.city)
    res.status(code).send(deleteCity);
})

/*Remove a group. */
router.delete('/users/:user/groups/:region' , (req,res) => {
    let {deleteGroup,code} = cityController.removeGroup(req.params.user,req.params.region)
    res.status(code).send(deleteGroup);
})

module.exports = router;