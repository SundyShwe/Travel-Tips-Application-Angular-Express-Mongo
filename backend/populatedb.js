#! /usr/bin/env node

console.log(
  'This script populates dummy data to your database. Specified database as argument - e.g.: node populatedb "mongodb://127.0.0.1:27017/traveltips?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import User from "./models/user.js";
import City from "./models/city.js";
import Activity from "./models/activity.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const users = [];
const cities = [];

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createCities();
  await createActivities();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function createUsers() {
  console.log("Adding Users");
  const password = await bcrypt.hash("111111", 10);
  await Promise.all([
    userCreate(
      "Captain Jack",
      "Sparrow",
      "jack@miu.edu",
      password,
      "",
      [],
      0
    ),
    userCreate(
      "Peter",
      "Quill",
      "peter@miu.edu",
      password,
      "",
      [],
      0
    ),
    userCreate(
      "John",
      "Snow",
      "john@miu.edu",
      password,
      "",
      [],
      0
    ),
    userCreate(
      "Tyrion",
      "Lannister",
      "tyrion@miu.edu",
      password,
      "",
      [],
      0
    ),
    userCreate(
      "Bruce",
      "Wayne",
      "bruce@miu.edu",
      password,
      "",
      [],
      0
    ),
  ]);
}

async function userCreate(firstName, lastName, email, password, profilePic, badges, totalActivities) {
  const userdetail = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    profilePic: profilePic,
    badges: badges,
    totalActivities: totalActivities
  };

  const user = new User(userdetail);
  await user.save();
  users.push(user);
  console.log(`Added user: ${firstName} ${lastName}`);
}

async function createCities() {
  console.log("Adding Cities");
  await Promise.all([
    cityCreate(
      "Chicago",
      "Illinois",
      [-87.61661, 41.88155],
      []
    ),
    cityCreate(
      "New York",
      "New York",
      [-73.97556, 40.71467],
      []
    ),
    cityCreate(
      "San Francisco",
      "California",
      [-122.415631, 37.776126],
      []
    ),
    cityCreate(
      "Austin",
      "Texas",
      [-97.717360, 30.27058],
      []
    ),
    cityCreate(
      "Miami",
      "Florida",
      [-80.187920, 25.761051],
      []
    ),
    cityCreate(
      "Hawaii",
      "",
      [-159.011170, 19.877379],
      []
    ),
    cityCreate(
      "Los Angeles",
      "California",
      [-118.241111, 34.052938],
      []
    ),
    cityCreate(
      "Washington",
      "",
      [-77.013905, 38.915546],
      []
    ),
    cityCreate(
      "Houston",
      "Texas",
      [-95.354670, 29.761945],
      []
    )
  ]);
}

async function cityCreate(name, state, location, transports) {
  const citydetail = {
    name: name,
    state: state,
    location: location,
    transports: transports
  };

  const city = new City(citydetail);
  await city.save();
  cities.push(city);
  console.log(`Added city: ${name}`);
}


async function createActivities() {
  console.log("Adding Activities");
  const act1 = { title: "to eat pizza", description: "Pizza  is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as various types of sausage, anchovies, mushrooms, onions, olives, vegetables, meat, ham, etc.), which is then baked at a high temperature, traditionally in a wood-fired oven. A small pizza is sometimes called a pizzetta. A person who makes pizza is known as a pizzaiolo.", category: "Food", completed: false };
  const act2 = { title: "to eat fried chicken", description: "Fried chicken, also known as Southern fried chicken, is a dish consisting of chicken pieces that have been coated with seasoned flour or batter and pan-fried, deep fried, pressure fried, or air fried. The breading adds a crisp coating or crust to the exterior of the chicken while retaining juices in the meat.", category: "Food", completed: false };
  const act3 = { title: "to eat noodles", description: "Noodles are a type of food made from unleavened dough which is either rolled flat and cut, stretched, or extruded, into long strips or strings. Noodles are a staple food in many cultures and made into a variety of shapes.", category: "Food", completed: false };
  const act4 = { title: "to eat steak", description: "A steak is a thick cut of meat generally sliced across the muscle fibers, sometimes including a bone. It is normally grilled or fried. Steak can be diced, cooked in sauce, such as in steak and kidney pie, or minced and formed into patties, such as hamburgers.", category: "Food", completed: false };
  const act5 = { title: "to eat buffet", description: "A buffet can be either a sideboard or a system of serving meals in which food is placed in a public area where the diners serve themselves. A form of service à la française, buffets are offered at various places including hotels, restaurants, and many social events.", category: "Food", completed: false };
  await Promise.all([
    activityCreate(
      users[0],
      cities[0],
      [act1, act2, act5, act3, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[1],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[2],
      [act1, act4, act5],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[5],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[3],
      [act3, act2],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[4],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[5],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[6],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[5],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[7],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[0],
      cities[5],
      [act1, act2, act3, act5, act4],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[4],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[0],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[2],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[1],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[3],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[7],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[6],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[3],
      cities[5],
      [act4, act3, act5, act1, act2],
      0,
      []
    ),
    activityCreate(
      users[1],
      cities[2],
      [act1, act5],
      0,
      []
    ),
    activityCreate(
      users[2],
      cities[6],
      [act1, act2],
      0,
      []
    ),
  ]);
}

async function activityCreate(user, city, activities, avgRating) {
  const activitydetail = {
    user: user,
    city: city,
    items: activities,
    avgRating: avgRating,
    ratings: []
  };

  const activity = new Activity(activitydetail);
  await activity.save();
  console.log(`Added activity:`);
}