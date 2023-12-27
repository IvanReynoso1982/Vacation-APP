const mysql = require('mysql2/promise');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";

const queryTableData = [
    //long term properties
    {
        id: 1,
        name: "\"The Dome\"",
        isShortTerm: false,
        price: 143,
        bedrooms: 2,
        bathrooms: 1,
        rating: 4.9,
        allowsPets: true
    },
    {
        id: 2,
        name: "\"Neptune Place\"",
        isShortTerm: false,
        price: 373,
        bedrooms: 2,
        bathrooms: 2,
        rating: 4.9,
        allowsPets: false
    },
    {
        id: 3,
        name: "\"Jorge's House\"",
        isShortTerm: false,
        price: 245,
        bedrooms: 3,
        bathrooms: 2,
        rating: 3.8,
        allowsPets: false
    },
    {
        id: 4,
        name: "\"Beach Villa\"",
        isShortTerm: false,
        price: 306,
        bedrooms: 3,
        bathrooms: 2,
        rating: 4.7,
        allowsPets: true
    },
    {
        id: 5,
        name: "\"Longboard Studio\"",
        isShortTerm: false,
        price: 174,
        bedrooms: 1,
        bathrooms: 1,
        rating: 4.1,
        allowsPets: true
    },
    //short term properties
    {
        id: 6,
        name: "\"New 2-Story Loft\"",
        isShortTerm: true,
        price: 103,
        bedrooms: 1,
        bathrooms: 1,
        rating: 3.9,
        allowsPets: false
    },
    {
        id: 7,
        name: "\"Private Bed and Bath\"",
        isShortTerm: true,
        price: 46,
        bedrooms: 1,
        bathrooms: 1,
        rating: 3.2,
        allowsPets: false
    },
    {
        id: 8,
        name: "\"Clean Spare Room\"",
        isShortTerm: true,
        price: 64,
        bedrooms: 1,
        bathrooms: 1,
        rating: 4.7,
        allowsPets: false
    },
    {
        id: 9,
        name: "\"Stone Cottage\"",
        isShortTerm: true,
        price: 200,
        bedrooms: 1,
        bathrooms: 1,
        rating: 4.9,
        allowsPets: true
    },
    {
        id: 10,
        name: "\"San Diego Guesthouse\"",
        isShortTerm: true,
        price: 100,
        bedrooms: 1,
        bathrooms: 1,
        rating: 4.4,
        allowsPets: true
    },
];

const insertTableData = [
    {
        propertyId: 1,
        name: "\"John Smith\"",
        email: "\"jsfamily@gmail.com\"",
        checkIn: "\"2024-04-04\"",
        checkOut: "\"2024-04-11\"",
        creditCard: "\"2526747427918336\"",
        notes: "\"Looking forward to my stay!\""
    },
    {
        propertyId: 4,
        name: "\"Jane Doe\"",
        email: "\"doeseedoe@gmail.com\"",
        checkIn: "\"2023-11-11\"",
        checkOut: "\"2023-11-20\"",
        creditCard: "\"5903409053890197\"",
        notes: "\"\""
    },
    {
        propertyId: 9,
        name: "\"Luz Clingman\"",
        email: "\"luzlc@gmail.com\"",
        checkIn: "\"2023-12-24\"",
        checkOut: "\"2023-12-25\"",
        creditCard: "\"4433912277505220\"",
        notes: "\"Will be arriving late in the evening\""
    },
    {
        propertyId: 3,
        name: "\"Charles Gilmore\"",
        email: "\"charli3g@gmail.com\"",
        checkIn: "\"2024-01-27\"",
        checkOut: "\"2024-02-12\"",
        creditCard: "\"2488887923375920\"",
        notes: "\"\""
    },
    {
        propertyId: 6,
        name: "\"Ashley Rollins\"",
        email: "\"rollinstones@gmail.com\"",
        checkIn: "\"2024-03-01\"",
        checkOut: "\"2024-03-03\"",
        creditCard: "\"2660778508315942\"",
        notes: "\"Thank you for letting me stay :)\""
    },
];

const mongodbData = [
   {
    _id:1,
    description: "Enjoy a one of a kind experience in one of the only Domes in San Diego! This is the ideal place to relax in your own private space in a quiet neighborhood while still close to all that San Diego has to offer! Just featured on fox 5 San Diego as one of the top 5 unique Airbnb stays in the area! Right when you walk in you will be amazed at the architecture of the space. This Dome was originally built in 1967 as a project for college students majoring in Art. Now, many years later it has been renovated and has everything you could possibly need in a living space. It is a separate structure from our main house which allows you privacy in your home away from home. The kitchen comes equipped with everything needed to cook a complete meal; even down to the spices. You have a full size refrigerator with ice maker, filtered water, toaster, stove, oven, microwave, coffee maker, George Forman grill & popcorn maker. Coffee, tea and popcorn are all provided!"
   },
   {
    _id:2,
    description: "Welcome to our exquisite coastal two-bedroom retreat, where every detail has been carefully curated to offer you an unforgettable vacation experience. Nestled along the beachfront, this high-end space boasts breathtaking panoramic views of the Pacific Ocean. Whether you are traveling with family or friends, we have spared no expense in providing you with all the amenities you need to live like a local and enjoy the best of San Diego and La Jolla."
   },
   {
    _id:3,
    description: "Welcome to your ultimate family getaway in sunny San Diego. Experience the excitement of endless fun with arcades, a backyard putting green, and a back yard fire pit lounge for cozy evenings. Plus, our location puts you just moments away from the sun-kissed beaches, the amazing San Diego Zoo, the wonders of Sea World, and Old Town San Diego State Park. Here you can create memories and spend quality time together. Your family getaway starts here."
   },
   {
    _id:4,
    description: "Welcome to Casa Con Vista! Entertain family and friends at this sumptuous villa offering spectacular ocean views in almost every rooms. The house is fully equipped with relaxed and sophisticated style that echoes throughout the home. Guests can unwind around the fire pit while making smores on balmy evenings, or have a family barbecue in the private backyard before heading to the beach for sunset...."
   },
   {
    _id:5,
    description: "Your affordable La Jolla getaway! Your private guest quarters comes with a dedicated carport for parking, your own private entrance, crisp white bathroom, large bright bedroom and living area with flat screen TV and a kitchenette all to yourselves. The location cannot be beat. You will be just minutes from all that UCSD, La Jolla & the San Diego area has to offer."
   },
   {
    _id:6,
    description: "Second floor loft in recently built ultra-modern building. Minimal and clean, but with all of the essentials. Large private terrace. Conveniently located in the heart of Hillcrest, only 2 blocks to Whole Foods, Trader Joes, Ralphs grocery store, and many great restaurants and bars and boutique shops. Other nearby attractions include Balboa Park, Downtown San Diego, SeaWorld, The San Diego Zoo, and Mission Beach. Enjoy a stylish experience at this centrally-located place."
   },
   {
    _id:7,
    description: "Quiet, upstairs private bedroom & bathroom in Mira Mesa. Near to all San Diego has to offer: Sorrento Valley 5 min, Beaches & UCSD 15 min, Zoo/Balboa Park/Downtown/SeaWorld/Legoland/Airport are all 25 to 30 minutes. Room has desk, TV, Netflix/Disney+, coffee/tea/water provided, mini frig, microwave, kettle, fans, portable room A/C. Front door has a key pad for easy self entry. Private bathroom just outside your room door."
   },
   {
    _id:8,
    description: "Enjoy a private bedroom in sunny San Diego! Just 5 miles to beaches and 10-15 minute drive to downtown, Balboa Park, La Jolla and more! Uber and public transportation are both available in this area of Clairemont Mesa. Plenty of restaurants and a grocery store within walking distance. My place is good for couples, solo adventurers, and business travelers. My home has 5 bedrooms which share two guest bathrooms and a spacious backyard for sunning, or just relaxing. Meet other travelers too!"
   },
   {
    _id:9,
    description: "Welcome to the Historic Stone Cottage! The 110 year old cottage has been transformed into the perfect combination of romantic and rustic for a dream-worthy getaway. The 280sq ft cottage features stunning, panoramic views of the San Diego skyline while offering rooftop seating for sunrise and sunset viewing. The Cottage is conveniently located 20 minutes from the world famous San Diego zoo and most other must-see, tourist spots."
   },
   {
    _id:10,
    description: "This cozy studio has a kitchenette, cable w/HBO, wifi, linens, towels, a stainless steel outdoor BBQ, peaceful outdoor patio, and best of all, is only one block from one of the most beautiful beaches! Please note: This studio is located under the two bedroom apartment and priced accordingly. You will hear the guests above. We try to book families with older kids to decrease the noise level. If the noise level is particularly bad, please let us know so we can talk to the other guests."
   }
];

async function initSqlDbs() {
    var con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "blazer123",
    });

    //Recreate and use database ijdmSqlDb
    await con.query("DROP DATABASE IF EXISTS ijdmSqlDb");
    await con.query("CREATE DATABASE ijdmSqlDb");
    await con.query("USE ijdmSqlDb");

    //Create and populate ijdmQueryTable
    await con.query("CREATE TABLE ijdmQueryTable (id INT NOT NULL PRIMARY KEY, name VARCHAR(32), isShortTerm BOOLEAN, price INT, bedrooms INT, bathrooms INT, rating INT, allowsPets BOOLEAN)");
    queryTableData.forEach(async (property) => {
        var query = "INSERT INTO ijdmQueryTable VALUES("+property.id+", "+property.name+", "+property.isShortTerm+", "+property.price+", "+property.bedrooms+", "+property.bathrooms+", "+property.rating+", "+property.allowsPets+")";
        await con.query(query);
    });

    //Create and populate ijdmInsertTable
    await con.query("CREATE TABLE ijdmInsertTable (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, propertyId INT NOT NULL, name VARCHAR(32), email VARCHAR(32), checkIn DATE, checkOut DATE, creditCard VARCHAR(19), notes VARCHAR(256))");
    insertTableData.forEach(async (reservation) => {
        var query = "INSERT INTO ijdmInsertTable VALUES("+0+", "+reservation.propertyId+", "+reservation.name+", "+reservation.email+", "+reservation.checkIn+", "+reservation.checkOut+", "+reservation.creditCard+", "+reservation.notes+")";
        await con.query(query);
    });

    await con.end();
}

async function initMongodb() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        var dbo = client.db("ijdmMongodb");
        await dbo.dropDatabase();
        await dbo.createCollection("ijdmMongoCol");
        await dbo.collection("ijdmMongoCol").insertMany(mongodbData);
    } finally {
        await client.close();
    }
}

initSqlDbs();
initMongodb().catch(console.dir);