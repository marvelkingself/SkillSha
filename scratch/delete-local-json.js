const fs = require("fs");
const path = require("path");

const runsFile = path.join(__dirname, "..", "content", "agent-runs.json");
const settingsFile = path.join(__dirname, "..", "content", "agent-settings.json");

console.log("=== Deleting local JSON tracking files ===");
if (fs.existsSync(runsFile)) {
  fs.unlinkSync(runsFile);
  console.log(`Deleted: ${runsFile}`);
}
if (fs.existsSync(settingsFile)) {
  fs.unlinkSync(settingsFile);
  console.log(`Deleted: ${settingsFile}`);
}

console.log("Local JSON deletion complete!");
