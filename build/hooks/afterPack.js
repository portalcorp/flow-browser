const { signAppWithVMP } = require("./components/castlabs-evs.js");
const { createNotarizationApiKeyFile } = require("./components/notarization.js");
const { copyAssetsCar } = require("./components/macos.js");

const vmpSignPlatforms = ["darwin"];

/** @type {(context: import("./types.js").PackContext) => void} */
async function handler(context) {
  // Header
  console.log("\n---------");
  console.log("Executing afterPack hook");

  // macOS needs to add the Assets.car containing the Liquid Glass icon
  if (process.platform === "darwin") {
    await copyAssetsCar(context.appOutDir)
      .then(() => true)
      .catch(() => false);
  }

  // macOS needs to VMP-sign the app before signing it with Apple
  if (vmpSignPlatforms.includes(process.platform)) {
    await signAppWithVMP(context.appOutDir)
      .then(() => true)
      .catch(() => false);
  }

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
