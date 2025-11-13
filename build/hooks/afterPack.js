const { createNotarizationApiKeyFile } = require("./components/notarization.js");

/** @type {(context: import("./types.js").PackContext) => void} */
async function handler(context) {
  // Header
  console.log("\n---------");
  console.log("Executing afterPack hook");

  // macOS needs to notarize the app with a path to APPLE_API_KEY
  if (process.platform === "darwin") {
    await createNotarizationApiKeyFile()
      .then(() => true)
      .catch(() => false);
  }

  // Footer
  console.log("---------\n");
}

module.exports = handler;
