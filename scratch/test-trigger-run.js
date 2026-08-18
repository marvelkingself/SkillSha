const http = require("http");

const req = http.request(
  "http://localhost:3000/api/blog-agent/run",
  {
    method: "POST",
    headers: {
      "x-admin-secret": "skillsha-admin-secret-2026",
      "Content-Type": "application/json",
    },
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => console.log("Run response:", res.statusCode, data));
  }
);

req.on("error", console.error);
req.end();
