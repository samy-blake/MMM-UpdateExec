const Log = require("logger");
const path = require("path");
const updater = require("./updater");

const MODULE_BASE_DIR = path.normalize(`${__dirname}/../`);

module.exports = NodeHelper.create({
	config: {
		// defaultCmd: `git pull origin main`,
		// customExecs: {
		// 	"MMM-Pir": [
		// 	  "npm run update"
		// 	]
		// },
	},

	async socketNotificationReceived(notification, payload) {
		switch (notification) {
			case "CONFIG":
				this.config = payload;
				this.updaterCustomLog(`updates available for: ${payload.map(", ")}`);

				break;
			case "UPDATES_AVAILABLE":
				this.updaterCustomLog(`updates available for: ${payload.map(", ")}`);
				for (const moduleName of payload) {
					let cmd = `cd ${path.join(MODULE_BASE_DIR, moduleName)} &&`;

					if (
						this.config.hasOwnProperty("customExecs") &&
						this.config.customExecs.hasOwnProperty(moduleName)
					) {
						cmd += this.config.customExecs.join(" && ");
					} else {
						cmd += this.config.defaultCmd;
					}
					await updater.run(cmd);
					this.updaterCustomLog(`update finish for ${moduleName}`);
				}
				break;
		}
	},

	updaterCustomLog(msg) {
		Log.info(`${this.name}: ${msg}`);
	},
});
