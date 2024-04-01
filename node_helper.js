const Log = require("logger");
const path = require("path");
const updater = require("./updater");
const NodeHelper = require("node_helper");

const MODULE_BASE_DIR = path.normalize(`${__dirname}/../`);

module.exports = NodeHelper.create({
	config: {
		// defaultCmd: ["git pull", "npm ci"],
		// customExecs: {
		// 	"MMM-Pir": [
		// 	  "npm run update"
		// 	]
		// },
	},

	async socketNotificationReceived(notification, payload) {
		switch (notification) {
			case "LOG":
				this.updaterCustomLog(JSON.stringify(payload));
				break;
			case "CONFIG":
				this.config = payload;
				this.updaterCustomLog(`update config`);
				break;
			case "UPDATES_AVAILABLE":
				this.updaterCustomLog(
					`updates available for: ${payload.map((v) => v.module).join(", ")}`
				);
				for (const moduleData of payload) {
					const moduleName = moduleData.module;
					// const originBranch = moduleData.tracking;

					let cmd = [
						...this.config.preCmd,
						`cd ${path.join(MODULE_BASE_DIR, moduleName)}`,
					].join(" && ");
					cmd += " && ";

					if (
						this.config.hasOwnProperty("customExecs") &&
						this.config.customExecs.hasOwnProperty(moduleName)
					) {
						cmd += this.config.customExecs[moduleName].join(" && ");
					} else {
						cmd += this.config.defaultCmd.join(" && ");
					}
					this.updaterCustomLog(`run cmd: '${cmd}'`);
					const result = await updater.run(cmd);
					this.updaterCustomLog(result.stdout);

					this.updaterCustomLog(`update finish for ${moduleName}`);
				}
				break;
		}
	},

	updaterCustomLog(msg) {
		Log.info(`${this.name}: ${msg}`);
	},
});
