let users = require('../models/userList');
const group = require('../models/Group');


function findGroup(currentUser) {
    const data = group.findUserGroup(currentUser);
    return data;

}

function findCity(currentUser,region) {
    let city = group.findUserCitiesForgroup(currentUser,region);
    if(city && city.length != 0) {
        return city;
    }
    return "city not present in this group";
}

async function cityWeather(currentUser,region,city) {
    let weatherData = await group.findCityWeather(currentUser,region,city);
    if(weatherData) {
        return weatherData;
    }
    return "weather data for city doesn't found";
}

function addNewGroup(currentUser,region,city) {
    return group.addUserNewGroup(currentUser,region,city);
}

function addCityInGroup(currentUser, region,city) {
    return group.addUserCityInGroup(currentUser, region,city);   
}

function removecity(currentUser,region,deletedCity) {
    return group.removeUserCity(currentUser,region,deletedCity);
}

function removeGroup(currentUser,region) {
    return group.removeUserGroup(currentUser,region);
}


module.exports = {addNewGroup,findGroup,cityWeather,addCityInGroup,removecity,removeGroup,findCity}