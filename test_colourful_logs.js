#!winpty node
// ↑↑↑↑↑ #For windows you need to prefix "winpty node" to be able to .

// #!/usr/bin/env node
// ↑↑↑↑↑ #For linux/macos you can use /usr/bin/env though.

const { logError, logInfo, logSuccess } = require("./utils");

logError("this is error message!");
logInfo("this is info message!");
logSuccess("this is success message!");
