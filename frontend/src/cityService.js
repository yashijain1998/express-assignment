import axios from "axios";
let url ="http://localhost:7000/users";

export async function getUsers() {
  let returnedData = [];
  returnedData = await axios.get(url);
  return returnedData.data;
}

export async function getRegionCity(uname,region) {
  let returnedData = [];
  returnedData = await axios.get(url + `/${uname}/groups/${region}`);
  return returnedData.data;
}

export async function getCityWeather(uname,region,city) {
  const u = url + `/${uname}/groups/${region}/${city}`;
  let returnedData = {};
  returnedData = await axios.get(u);
  return returnedData.data;
}

export async function addGroup(uname,region,city,cityId) {
  const u = url + `/${uname}/groups`;
  let returnedData = [];
  returnedData = await axios.post(u, {
    region: region,
    city: [{
      // id: Math.random().toString(36).substr(2, 9),
      id: cityId,
      name: city
    }]
  });
  console.log("returneddata",returnedData);
}

export async function deleteGroup(uname,region) {
  const u = url + `/${uname}/groups/${region}`;
  await axios.delete(u);
}

export async function addNewCity(uname,region,newCity) {
  const u = url + `/${uname}/groups/${region}`;
  await axios.post(u, {
    city: newCity
  })
}

export async function deleteCity(uname,region,city) {
  const u = url + `/${uname}/groups/${region}/${city}`;
  console.log(u);
  await axios.delete(u);
}

//module.exports = { getGroup }
