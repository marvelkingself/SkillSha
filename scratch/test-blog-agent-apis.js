const http = require("http");

function fetchApi(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      `http://localhost:3000${path}`,
      {
        method: options.method || "GET",
        headers: {
          "x-admin-secret": "skillsha-admin-secret-2026",
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );
    req.on("error", reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function testAll() {
  console.log("--- Testing Blog Agent APIs ---");
  try {
    const runsRes = await fetchApi("/api/blog-agent/runs");
    console.log("GET /api/blog-agent/runs:", runsRes.status, runsRes.data);

    const manageRes = await fetchApi("/api/blog-agent/manage");
    console.log("GET /api/blog-agent/manage:", manageRes.status, manageRes.data);

    const settingsRes = await fetchApi("/api/blog-agent/settings");
    console.log("GET /api/blog-agent/settings:", settingsRes.status, settingsRes.data);
  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

testAll();
