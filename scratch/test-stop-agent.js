const http = require("http");

function stopAgent() {
  return new Promise((resolve, reject) => {
    const req = http.request(
      "http://localhost:3000/api/blog-agent/manage",
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
        res.on("end", () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
      }
    );
    req.on("error", reject);
    req.write(JSON.stringify({ action: "stop" }));
    req.end();
  });
}

async function test() {
  console.log("=== Testing Stop Agent Action ===");
  const res = await stopAgent();
  console.log("Stop response:", res);
}

test();
