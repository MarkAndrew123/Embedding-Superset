require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());


const SUPerset_URL = process.env.SUPERSET_URL;
const ADMIN_USERNAME = process.env.SUPERSET_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.SUPERSET_ADMIN_PASSWORD;
const DASHBOARD_ID = process.env.DASHBOARD_ID;
const JWT_SECRET = process.env.JWT_SECRET;

app.post("/api/token", async (req, res) => {
  try {
  
    const loginResponse = await axios.post(`${SUPerset_URL}/api/v1/security/login`, {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
      provider: "db",
      refresh: true,
    });

    const accessToken = loginResponse.data.access_token;

    
    const guestTokenPayload = {
      resources: [
        {
          type: "dashboard",
          id: DASHBOARD_ID,
        },
      ],
      rls: [], 
      user: {
        username: "report-viewer",
        first_name: "Report",
        last_name: "Viewer",
      },
    };

    const guestTokenHeaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const guestTokenResponse = await axios.post(
      `${SUPerset_URL}/api/v1/security/guest_token/`,
      guestTokenPayload,
      guestTokenHeaders
    );

    const guestToken = guestTokenResponse.data.token;

  
    res.status(200).json({ token: guestToken });
  } catch (error) {
    console.error("Error generating guest token:", error.message);
    res.status(500).json({ error: "Failed to generate guest token" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
