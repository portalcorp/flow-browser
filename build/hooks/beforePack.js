const { signAppWithVMP } = require("./components/castlabs-evs.js");
const path = require("path");

/** @type {(context: import("./types.js").PackContext) => void} */
async function handler(context) {
  // Header
  console.log("\n---------");
  console.log("Executing beforePack hook");

  // Sign the Electron binary in node_modules before packing
  if (process.platform === "darwin") {
    // Use process.cwd() to get the project root
    const electronPath = path.join(process.cwd(), "node_modules/electron/dist");
    console.log(`Signing Electron binary at: ${electronPath}`);
    await signAppWithVMP(electronPath, "Electron")
      .then(() => true)
      .catch(() => false);
  }

  // Footer
  console.log("---------\n");
}

module.exports = handler;
