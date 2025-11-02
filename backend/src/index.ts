import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql, { RowDataPacket } from 'mysql2/promise';

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors({
  origin: ["http://localhost:5173", "https://flatbricks.com"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());
console.log(process.env.DB_HOST);
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
const wpPool = mysql.createPool({
  host: process.env.WP_DB_HOST,
  user: process.env.WP_DB_USER,
  password: process.env.WP_DB_PASS,
  database: process.env.WP_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.post("/api/post-properties", async (req, res): Promise<any> => {
  try {
    const { property_title, property_type, property_description, property_id, property_status, 
      property_rooms ,property_beds, property_baths, property_garages, property_price, property_location, 
      property_address, property_maplocation, property_featurediamge, property_gallery, property_attachments, } = req.body;
  }catch(err){
    console.error("Error Posting properties ", err)
  }
})

app.get("/api/properties-popular", async (req, res) => {
  try {
    // Query from the fb_uservisits database (analytics)
    const [visitRows] = await pool.query<RowDataPacket[]>(`
      SELECT 
        propertyid, 
        COUNT(*) AS visit_count
      FROM fb_uservisits
      WHERE createdate > (UNIX_TIMESTAMP(CURDATE() - INTERVAL 7 DAY) * 1000)
      GROUP BY propertyid
    `);

    if (visitRows.length === 0) {
      return res.json([]); // no recent visits → return empty
    }

    // Extract property IDs
    const propertyIds = visitRows.map((row) => row.propertyid);

    // Query from WordPress DB for those IDs
    const [propertyRows] = await wpPool.query<RowDataPacket[]>(
    `
    SELECT 
      p.ID, 
      p.post_title, 
      p.post_type, 
      p.post_status, 
      p.post_date, 
      p.post_content,
      addr.meta_value AS post_address,
      beds.meta_value AS post_beds,
      baths.meta_value AS post_baths
    FROM a8wo_posts p
    LEFT JOIN a8wo_postmeta addr 
      ON p.ID = addr.post_id AND addr.meta_key = '_property_address'
    LEFT JOIN a8wo_postmeta beds 
      ON p.ID = beds.post_id AND beds.meta_key = '_property_beds'
    LEFT JOIN a8wo_postmeta baths 
      ON p.ID = baths.post_id AND baths.meta_key = '_property_baths'
    WHERE p.post_type = 'property'
    AND p.ID IN (?);

    `,
      [propertyIds]
    );

    // Merge both sets of results
    const visitMap = Object.fromEntries(
      visitRows.map((v) => [v.propertyid, v.visit_count])
    );

    const merged = propertyRows.map((p) => ({
      ...p,
      visit_count: visitMap[p.ID] || 0,
      popular: (visitMap[p.ID] || 0) > 0
    }));

    // Return combined JSON
    res.json(merged);
  } catch (err) {
    console.error("Error getting popular properties", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders');
 
    res.json({ dbData: rows, staticData: ['one', 'two', 'three'] });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get('/buildings', async (req, res) => {
  const page = parseInt(String(req.query.page)) || 1;
  const limit = parseInt(String(req.query.limit)) || 10;
  
  const offset = (page - 1) * limit;

try {
  const [rows] = await pool.query(
    'SELECT name, location, seen, modifieddate FROM fb_buildings LIMIT ? OFFSET ?',
    [limit, offset]
  );

  const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM fb_buildings')as any[];
  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  res.json({
    data: rows,
    currentPage: page,
    totalPages,
    totalItems: total
  });
} catch (err) {
  res.status(500).json({ error: err });
}

});

app.post('/update-approval', async (req, res): Promise<any> => {
 const { id, status } = req.body;

  if (!id || typeof status !== 'number') {
    return res.status(400).json({ error: 'ID and status are required' });
  }

  const statusText = status === 1 ? 'Approved' : 'Rejected';

  try {
    const [result] = await pool.query(
      'UPDATE fb_listing SET approvalstatus = ? WHERE listingid = ?',
      [statusText, id]
    );

    res.json({ success: true, message: 'Building approved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to approve building' });
  }
});


app.post("/api/fb_callbackrequests", async (req, res): Promise<any> => {
  try {
    const { name, phone, email, date, propertyId, propertyName,message} = req.body;
    let epochtime=Math.floor (new Date(date).getTime());
    if (!name || !phone || !email || !propertyId) {
      console.log(req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
      INSERT INTO fb_callbackrequests
      (name, phone, email, preferredtime, listingid, propertyName,message)
      VALUES (?, ?, ?, ?, ?, ?,?)
    `;

    const [result] = await pool.query(query, [
      name,
      phone,
      email,
      epochtime,
      propertyId,
      propertyName || "",
      message
    ]);

    res.status(201).json({success: true, message: "User Visit CallBack ", result});
  } catch (err) {
    console.error("Error inserting callback request:", err);
    res.status(500).json({ error: "Server error" });
  }
});

///////////////////

app.get("/api/wp_post/:id", async (req, res): Promise<any> => {
  try {
    const { id } = req.params; 
    console.log(id);
    const [rows] = await wpPool.query<RowDataPacket[]>(
      `
      SELECT ID, post_title, post_type
      FROM a8wo_posts
      WHERE post_type = 'property' AND ID = ?
      LIMIT 1
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(rows[0]); // return single object instead of array
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/property-clicks", async (req, res) => {
  try {
    const { propertyId, propertyName, clickedAt,userId,username } = req.body;

    await pool.query(
      "INSERT INTO fb_uservisits (propertyid, propertyname, createdate,peopleid,peoplename) VALUES (?, ?, ?,?,?)",
      [propertyId, propertyName, clickedAt,userId,username]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error logging property click:", err);
    res.status(500).json({ error: "Failed to log click" });
  }
});

app.get("/api/property-views/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

      const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS views FROM fb_uservisits WHERE propertyid = ?",
      [propertyId]
    );

    res.json({ views: rows[0].views });
  } catch (err) {
    console.error("Error fetching property views:", err);
    res.status(500).json({ error: "Failed to fetch views" });
  }
});

app.get("/api/top-visitors", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT propertyid, propertyname, COUNT(*) as visitors
      FROM fb_uservisits
      GROUP BY propertyid, propertyname
      ORDER BY visitors DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching visitors:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/api/top-interests", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT listingid, propertyname, COUNT(*) as interests
      FROM fb_callbackrequests
      GROUP BY listingid, propertyname
      ORDER BY interests DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching interests:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/api/flats/ownership-summary", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        SUM(CASE WHEN flatbricksowned = 'yes' THEN 1 ELSE 0 END) AS owned,
        SUM(CASE WHEN flatbricksowned = 'no' THEN 1 ELSE 0 END) AS notOwned
      FROM fb_flats
    `);

     res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.get("/api/flats/owned-availability", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        SUM(CASE WHEN availability = 'available' THEN 1 ELSE 0 END) AS available,
        SUM(CASE WHEN availability = 'unavailable' THEN 1 ELSE 0 END) AS unavailable
      FROM fb_flats
      WHERE flatbricksowned = 'yes'
    `);

    res.json(rows); // { available: 50, unavailable: 30 }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

 app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
}); 
