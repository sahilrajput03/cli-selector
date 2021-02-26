#!winpty node
// ↑ ↑ ↑ ↑  For windows.

// #!/usr/bin/env node
// ↑ ↑ ↑ ↑  For linux/macos.
const cliSelect = require("cli-select");
const parseArgs = require("minimist");
const { blue, underline } = require("chalk");
const path = require("path");
const fs = require("fs");

const args = parseArgs(process.argv.slice(2));
const commandOrDirectory = args._[0] || process.cwd();

function logInfo(message) {
	console.log(blue(message));
}

let log = console.log;
const TEMPLATES = {
	static: "github/codesandbox-app/static-template/tree/master",
	react: "new",
	"react-ts": "react-typescript-react-ts",
	"react-native-web": "react-native-q4qymyp2l6",
	vanilla: "vanilla",
	preact: "preact",
	vue2: "vue",
	vue3: "vue-3",
	angular: "angular",
	svelte: "svelte",
	reason: "reason-reason",
	dojo: "github/dojo/dojo-codesandbox-template/tree/master",
	cxjs: "github/codaxy/cxjs-codesandbox-template/tree/master",
};

function validateNewProject(projectName, template) {
	const projectPath = path.join(process.cwd(), projectName);

	if (fs.existsSync(projectPath)) {
		logError(`😢 Sorry a directory with name ${projectName} already exists!`);

		process.exit(1);
	}

	const availableTemplates = Object.keys(TEMPLATES).join(", ");

	if (!projectName) {
		logError(`Required argument project name was not provided`);

		process.exit(1);
	}

	if (template && !TEMPLATES[template]) {
		logError(
			`Unknown template ${template}, available options are ${availableTemplates}`
		);

		process.exit(1);
	}

	return new Promise((resolve) => {
		if (!template) {
			logInfo("What template you want to use?");

			cliSelect({
				values: Object.keys(TEMPLATES),
				cleanup: true,
				selected: "👉",
				unselected: "  ",
				valueRenderer: (value, selected) => {
					if (selected) {
						return blue(underline(value));
					}

					return value;
				},
			})
				.then((answer) => {
					logInfo(`🔨 Creating ${answer.value} based project...`);

					resolve(TEMPLATES[answer.value]);
				})
				.catch(() => resolve(null));
		} else {
			resolve(TEMPLATES[template]);
		}
	});
}

if (args.version) {
	console.log(`v${pkg.version}`);
} else {
	switch (commandOrDirectory) {
		case "create": {
			const projectName = args._[1];
			const template = args.template;

			validateNewProject(projectName, template).then((templateId) => {
				if (templateId) {
					logInfo(templateId);
					logInfo(projectName);
					// createProject({
					// 	projectName,
					// 	templateId,
					// 	startServer: false,
					// 	port: PORT,
					// });
				}
			});

			break;
		}
		default:
			log("default case executed...");
	}
}
