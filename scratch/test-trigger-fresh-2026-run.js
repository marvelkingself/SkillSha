const http = require("http");

function postJSON(urlPath, data) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(data || {});
    const req = http.request(
      `http://localhost:3000${urlPath}`,
      {
        method: "POST",
        headers: {
          "x-admin-secret": "skillsha-admin-secret-2026",
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
        },
      },
      (res) => {
        let text = "";
        res.on("data", (chunk) => (text += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(text) }));
      }
    );
    req.on("error", reject);
    req.write(bodyStr);
    req.end();
  });
}

async function testFreshRun() {
  console.log("1. Stopping any active runs...");
  await postJSON("/api/blog-agent/manage", { action: "stop" });

  console.log("2. Triggering fresh AI Blog Agent run...");
  const triggerRes = await postJSON("/api/blog-agent/run", {});
  console.log("Trigger response:", triggerRes);
}

testFreshRun();
