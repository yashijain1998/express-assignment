let users = require('../models/userList');
const group = require('../models/Group');

function findUSers() {
    let allUsers = group.findAllUsers();
    if(allUsers) {
        return {allUsers: allUsers , code:200}
    }
    return {allUsers: "no users", code: 404}
}

function findGroup(currentUser) {
    const allgroup = group.findUserGroup(currentUser);
    if(allgroup) {
        return {allgroup: allgroup , code:200}
    }
    return  {allgroup: "user not found" , code:404};

}

function findCity(currentUser,region) {
    let city = group.findUserCitiesForgroup(currentUser,region);
    if(city && city.length != 0) {
        return  {city: city , code:200} ;
    }
    return {city:"city not present in this group", code:404};
}

async function cityWeather(currentUser,region,city) {
    let weatherData = await group.findCityWeather(currentUser,region,city);
    if(weatherData) {
        return {weatherData:weatherData , code:200};
    }
    return {weatherData:"weather for this city can't be found" , code:404};
}

function addNewGroup(currentUser,region,city) {
    let newGroup = group.addUserNewGroup(currentUser,region,city);
    if(newGroup) {
        return {newGroup:newGroup , code:200};
    }
    return {newGroup:"this region already exists" , code:400};
}

function addCityInGroup(currentUser, region,city) {
    let newCity = group.addUserCityInGroup(currentUser, region,city);  
    if(newCity) {
        return {newCity:newCity , code : 200}
    }
    return {newCity: "first create this region for adding cities" , code : 400}
}

function removecity(currentUser,region,deletedCity) {
   let deleteCity = group.removeUserCity(currentUser,region,deletedCity);
   if(deleteCity == "deleted successfully") {
       return {deleteCity:deleteCity , code: 200}
   }
   return {deleteCity:deleteCity , code: 404}
}

function removeGroup(currentUser,region) {
    let deleteGroup = group.removeUserGroup(currentUser,region);
    if(deleteGroup) {
        return {deleteGroup:deleteGroup , code: 200}
    }
    return {deleteGroup:"This region is not present" , code: 400}
}


module.exports = {findUSers,addNewGroup,findGroup,cityWeather,addCityInGroup,removecity,removeGroup,findCity}