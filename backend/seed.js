// seedProviders.js
const mongoose = require("mongoose");
const Provider = require("./models/Provider");

const MONGO_URI = "mongodb+srv://hariom-singh0708:eJsxXMpLXQVNoSUf@cluster0.aqetme5.mongodb.net/Hyperlocal-Services?retryWrites=true&w=majority&appName=Cluster0"; // change db name

// Realistic provider data
const providers = [
  {
    name: "Amit Sharma",
    email: "amit.sharma@gmail.com",
    password: "12345",
    phone: "9876543210",
    location: "Delhi",
    services: ["Electrician", "AC Repair"],
  },
  {
    name: "Priya Verma",
    email: "priya.verma@gmail.com",
    password: "12345",
    phone: "9876543211",
    location: "Mumbai",
    services: ["Cleaner", "Painter"],
  },
  {
    name: "Rahul Mehta",
    email: "rahul.mehta@gmail.com",
    password: "12345",
    phone: "9876543212",
    location: "Bangalore",
    services: ["Plumber", "Carpenter"],
  },
  {
    name: "Sneha Iyer",
    email: "sneha.iyer@gmail.com",
    password: "12345",
    phone: "9876543213",
    location: "Chennai",
    services: ["Salon", "Beauty Services"],
  },
  {
    name: "Rohit Patel",
    email: "rohit.patel@gmail.com",
    password: "12345",
    phone: "9876543214",
    location: "Ahmedabad",
    services: ["Plumber", "Electrician", "TV Repair"],
  },
  {
    name: "Neha Gupta",
    email: "neha.gupta@gmail.com",
    password: "12345",
    phone: "9876543215",
    location: "Pune",
    services: ["Cleaner", "Cooking"],
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    password: "12345",
    phone: "9876543216",
    location: "Jaipur",
    services: ["Painter", "Carpenter"],
  },
  {
    name: "Ananya Das",
    email: "ananya.das@gmail.com",
    password: "12345",
    phone: "9876543217",
    location: "Kolkata",
    services: ["Electrician", "AC Repair", "TV Repair"],
  },
  {
    name: "Karan Malhotra",
    email: "karan.malhotra@gmail.com",
    password: "12345",
    phone: "9876543218",
    location: "Gurgaon",
    services: ["Fitness Trainer", "Yoga Instructor"],
  },
  {
    name: "Ritika Jain",
    email: "ritika.jain@gmail.com",
    password: "12345",
    phone: "9876543219",
    location: "Noida",
    services: ["Salon", "Beauty Services"],
  },
  {
    name: "Arjun Nair",
    email: "arjun.nair@gmail.com",
    password: "12345",
    phone: "9876543220",
    location: "Kochi",
    services: ["Plumber", "Electrician", "TV Repair"],
  },
  {
    name: "Meera Reddy",
    email: "meera.reddy@gmail.com",
    password: "12345",
    phone: "9876543221",
    location: "Hyderabad",
    services: ["Cooking", "Cleaner"],
  },
  {
    name: "Suresh Yadav",
    email: "suresh.yadav@gmail.com",
    password: "12345",
    phone: "9876543222",
    location: "Lucknow",
    services: ["Carpenter", "Painter", "Car Wash"],
  },
  {
    name: "Divya Kapoor",
    email: "divya.kapoor@gmail.com",
    password: "12345",
    phone: "9876543223",
    location: "Chandigarh",
    services: ["Beauty Services", "Salon"],
  },
  {
    name: "Manoj Kumar",
    email: "manoj.kumar@gmail.com",
    password: "12345",
    phone: "9876543224",
    location: "Patna",
    services: ["Plumber", "AC Repair", "Car Wash"],
  },
  {
    name: "Alok Tripathi",
    email: "alok.tripathi@gmail.com",
    password: "12345",
    phone: "9876543225",
    location: "Varanasi",
    services: ["Electrician", "Painter", "Internet Setup"],
  },
  {
    name: "Shreya Sen",
    email: "shreya.sen@gmail.com",
    password: "12345",
    phone: "9876543226",
    location: "Kolkata",
    services: ["Cooking", "Cleaner"],
  },
  {
    name: "Deepak Joshi",
    email: "deepak.joshi@gmail.com",
    password: "12345",
    phone: "9876543227",
    location: "Dehradun",
    services: ["Carpenter", "Painter"],
  },
  {
    name: "Pooja Mishra",
    email: "pooja.mishra@gmail.com",
    password: "12345",
    phone: "9876543228",
    location: "Bhopal",
    services: ["Salon", "Beauty Services"],
  },
  {
    name: "Harsh Vora",
    email: "harsh.vora@gmail.com",
    password: "12345",
    phone: "9876543229",
    location: "Surat",
    services: ["Plumber", "Electrician"],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await Provider.deleteMany({});
    console.log("Cleared existing providers");

    await Provider.insertMany(providers);
    console.log("Inserted 20 providers");

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
