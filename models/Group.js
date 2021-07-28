const fetch = require('node-fetch');
let users = require('./userList');

function findUser(currentUser) {
    return users.find( user => user.name == currentUser);
}

function isRegion(currentUser,region) {
    let usergroup = Group.findUserGroup(currentUser);
    return usergroup.find(el => el.name == region);
}

class Group {

    static findUserGroup(currentUser) {
        let user = findUser(currentUser);
        if(user) {
            return user.group;
        }
        return "404 User not present";
    }

    static findUserCitiesForgroup(currentUser,region) {
        let userGroup = Group.findUserGroup(currentUser);
        let city = userGroup.filter(data => data.name == region);
        if(city.length >0)
        return city[0].city;

    }

    static async findCityWeather(currentUser,region,city) {
        let iscity = Group.findUserCitiesForgroup(currentUser,region);
        if(iscity && iscity[0].name == city) {
            let qstring = `q=${city}&appid=258b8b0c3eb4c22db7d38e0011ee59a2`
            let resdata = await fetch('http://api.openweathermap.org/data/2.5/weather?' + qstring);
            let weatherData = await resdata.json();
            return weatherData;
        }
    }

    static addUserNewGroup(currentUser,region,city) {
        let user = findUser(currentUser);
        if(!user) {
            users.push({
                name: currentUser,
                group : [{
                    name : region,
                    city : city
                }]
            })
            return users;
        }
        
        if(user.group.find(el => el.name == region)) {
            return "this region already exists";
        }
        user.group.push({
            "name" : region,
            "city" : city
        })
        return users;

    }

    static addUserCityInGroup(currentUser,region,city) {
        let usergroup = Group.findUserGroup(currentUser);
        let requiredRegion = isRegion(currentUser,region);
        console.log(requiredRegion);
        if(typeof(usergroup) == "object" && requiredRegion){
            requiredRegion.city.push({
                id: Math.random().toString(36).substr(2, 9),
                name: city
            })
            return users;
        }
        return "create this region for adding cities"
    }

    static removeUserCity(currentUser,region,deletedCity) {
        let requiredRegion = isRegion(currentUser,region);
        if(!requiredRegion){
            return "this region is not present";
        }
        let ind = requiredRegion.city.findIndex(function(c){
            return c.name == deletedCity
        })
        if(ind < 0) {
            return "City not found"
        }
        requiredRegion.city.splice(ind,1);
        return "deleted successfully"
    }

    static removeUserGroup(currentUser,region) {
        let requiredRegion = isRegion(currentUser,region);
        if(!requiredRegion){
            return "this region is not present";
        }
        users.find( user => user.name == currentUser).group = Group.findUserGroup(currentUser).filter(el => el.name != region )
        return users;
    }

}

module.exports = Group;