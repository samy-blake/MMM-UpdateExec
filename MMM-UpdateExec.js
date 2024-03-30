Module.register("MMM-UpdateExec", {
	defaults: {
		defaultCmd: `git pull && npm ci`,
		customExecs: {
			// "MMM-Pir": [ // module name
			//   "npm run update" // all commands run in there folder and its more than `git pull`
			// ]
		},
	},

	start() {
		Log.info(`Starting module: ${this.name}`);
		this.sendSocketNotification("CONFIG", this.config);
	},

	notificationReceived(notification, payload) {
		switch (notification) {
			case "UPDATES":
				// payload: array of modules that have updates
				this.sendSocketNotification("UPDATES_AVAILABLE", payload);
				break;
		}
	},
});
