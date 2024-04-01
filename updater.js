const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function execCommand(cmd) {
	const { stdout = "", stderr = "" } = await exec(cmd);
	return { stdout, stderr };
}

module.exports = {
	run: async (exeCmd) => {
		return await execCommand(exeCmd);
	},
};
