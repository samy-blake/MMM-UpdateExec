Module.register("MMM-UpdateExec", {
	defaults: {
		preCmd: ["source ~/.bashrc"], // global
		defaultCmd: ["git reset --hard", "git pull", "npm ci"], // in module dir
		customExecs: {
			// "MMM-Pir": [ // module name
			//   "npm run update" // all commands run in there folder and its more than `git pull`
			// ]
		},
	},

	start() {
		this.sendSocketNotification("CONFIG", this.config);
	},

	getDom: function () {
		return document.createElement("div");
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
