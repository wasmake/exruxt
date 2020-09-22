const fs = require('fs');
const express = require('express');
const path = require('path');

let i = 0;
let length = 0;
const walk = (directory, router, debug) => {

	const items = fs.readdirSync(directory);
	length += items.length;
	for (const item of items) {
		i++;
		const itemPath = path.join(directory, item);
		const stat = fs.statSync(itemPath);
		if(debug) console.info("Loading route " + item + " (" + i + "/" + length + ")");
		if (stat.isFile() && !(item.includes(".js") || item.includes(".ts"))) {
			if(debug) console.info(item + " not right file termination");
			continue;
		} else {
			let itemName = item.split(".")[0];
			let routePath;
			if (itemName == 'index') {
				routePath = '/'
			} else if (itemName[0] == '_') {
				routePath = `/:${itemName.substr(1)}`
			} else {
				routePath = `/${itemName}`
			}

			if (stat.isFile()) {
				router.use(routePath, require(path.resolve(itemPath)))
			} else if (stat.isDirectory()) {
				router.use(routePath, middleware(itemPath))
			}
		}

	}

}

const middleware = (directory, debug) => {
	const router = express.Router({ mergeParams: true });
	walk(directory, router, debug);
	return router;
}

module.exports = middleware;