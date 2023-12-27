//initialize routing
const mysql = require('mysql2/promise');
const path = require("path");
const express = require("express");
const app = express();
app.use("/", express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:true}));
const options = {
   root: path.join(__dirname) 
};
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017"

//page routes
app.get("/", (req, resp) => {
   resp.sendFile("index.html", options, (err) => {
      if (err) {
         console.log(err);
         resp.status(404).send("File Not Found");
      }
   });
});

app.get("/shortTerm", (req, resp) => {
   resp.sendFile("shortTerm.html", options, (err) => {
      if (err) {
         console.log(err);
         resp.status(404).send("File Not Found");
      }
   });
});

app.get("/longTerm", (req, resp) => {
   resp.sendFile("longTerm.html", options, (err) => {
      if (err) {
         console.log(err);
         resp.status(404).send("File Not Found");
      }
   });
});

app.get("/reservation", (req, resp) => {
   resp.sendFile("reservation.html", options, (err) => {
      if (err) {
         console.log(err);
         resp.status(404).send("File Not Found");
      }
   });
});

app.get("/about", (req, resp) => {
   resp.sendFile("about.html", options, (err) => {
      if (err) {
         console.log(err);
         resp.status(404).send("File Not Found");
      }
   });
});

//query routes
app.get('/queryST', async (request, response) => {
   response.writeHead(200, {'Content-Type': 'text/html'})
   response.write(await buildPropertyTable(1, request.query.price, request.query.beds, request.query.baths, request.query.rating, request.query.pets));
   response.end();
})

app.get('/queryLT', async (request, response) => {
   response.writeHead(200, {'Content-Type': 'text/html'})
   response.write(await buildPropertyTable(0, request.query.price, request.query.beds, request.query.baths, request.query.rating, request.query.pets));
   response.end();
})

//query functions
async function createConnection() {
    return conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'blazer123',
        database: 'ijdmSqlDb'
    })
}

async function querySql(query) {
    const conn = await createConnection();
    let rows = await conn.execute(query);
    await conn.end();
    return rows;
}

async function queryMongo(id){
   const client = await MongoClient.connect(url)
   .catch(err => { console.log(err); return});
   try {
      const query = { "_id":id };
      const resp = await client.db("ijdmMongodb").collection("ijdmMongoCol").findOne(query);
      return d = resp["description"];
   } catch (err) {
      console.log(err);
   } finally {
      await client.close();
   }
}

//Table building code
async function buildPropertyTable(shortTerm, price,beds,baths,rating,pets){
    tableString="<table id=\"testTable\" class=\"propertyTable\">";
    var tableString = tableString + buildPropertyHead();
    var qString= 'SELECT * FROM ijdmQueryTable WHERE isShortTerm="'+shortTerm+'"';
    if(price) {
      qString=qString+' AND price<='+price;
    }
    if(beds) {
      qString=qString+' AND bedrooms>='+beds;
    }
    if(baths) {
      qString=qString+' AND bathrooms>='+baths;
    }
    if(rating) {
      qString=qString+' AND rating>='+rating;
    }
    if(pets) {
      qString=qString+' AND allowsPets="'+(pets?"1\"":"0\"");
    }
    const rows = await querySql(qString);
    for (const p of rows[0]) {
      tableString = tableString + await buildPropertyRow(p);
    }
    return ("<link type=\"text/css\" rel=\"Stylesheet\" href=\"styles.css\" />"+tableString+"</table>");
}

function buildPropertyHead() {
    return "<tr><th>Property</th><th>Name</th><th>Id</th><th>Price</th><th>Beds</th><th>Baths</th><th>Allows Pets</th><th>Rating</th>"
}

async function buildPropertyRow(prop){
   var descr = await queryMongo(prop.id);
   clickString="onClick=\"alert('"+descr+"')\"";
    imageString = "<td><img src=\"images/rentals/"+prop.name+".jpg\" "+clickString+"/></td>";
    nameString = "<td>"+prop.name+"</td>";
    idString = "<td>"+prop.id+"</td>";
    priceString="<td>$"+prop.price+"</td>";
    bedString="<td>"+prop.bedrooms+"</td>";
    bathString="<td>"+prop.bathrooms+"</td>";
    var yn = prop.allowsPets ? "Yes" : "No"
    petString="<td>"+yn+"</td>";
    ratingString="<td>"+prop.rating+"</td>";
    return "<tr>"+imageString+nameString+idString+priceString+bedString+bathString+petString+ratingString+"</tr>";
}

function formatReservation(data) {
   var reservationData = '<table><tr>Reservation Information:</tr><tr>';
   reservationData = reservationData + '<td><ul><li>Property ID: '
   + data.propertyId +'</li><li>Name: ' + data.custName + '</li><li>Eamil: '
   + data.email +'</li><li>Check In Date: ' + data.checkIn + '</li><li>Check Out Date: '
   + data.checkOut +'</li><li>Credit Car Number: ' + data.ccn + '</li><li>Optional Notes: '
   + data.notes + '</li></ul></td>';
   return reservationData;
}

async function insertDB(data) {
   const conn = await createConnection();
   await conn.query("INSERT INTO ijdmInsertTable(propertyId, name, email, checkIn, checkOut, creditCard, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",[data.propertyId, data.custName, data.email, data.checkIn, data.checkOut, data.ccn, data.notes]);
   await conn.end();
}

app.post("/submitReservation", async (req, rsp) => {
   const data = req.body;
   await insertDB(data);
   rsp.write(formatReservation(data));
   rsp.end();
})


app.listen(8080, () => {
   console.log("IJDM server listening on port 8080");
});