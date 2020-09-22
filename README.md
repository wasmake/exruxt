# Exruxt

A Nuxt like router for Express, supports JavaScript and TypeScript files

[![NPM](https://nodei.co/npm/exruxt.png)](https://nodei.co/npm/exruxt/)

# install

```bash
npm install exruxt
```

# Usage

Exruxt will generate the routes based on your file tree inside the routes directory.

```javascript
const express = require('express')
const exruxt = require('exruxt')

const app = express()

app.use(exruxt('routes'))

app.listen(8080)
```

# Basic routes

This file tree:

```
routes/
--| user/
-----| index.js
-----| one.js
--| index.js
```

will automatically generate:

- /
- /user
- /user/one

# Dynamic routes

To define a dynamic route with a parameter, you need to define a JavaScript file OR a directory prefixed by an underscore.

This file tree:

```
routes/
--| _slug/
-----| comments.js
-----| index.js
--| users/
-----| _id.js
--| index.js
```

will automatically generate:

- /
- /users/:id
- /:slug
- /:slug/comments

> Note: For dynamic routes to work properly, you must use the `mergeParams: true`javascript option when calling the `express.Router` function

```javascript
const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res) => {
	res.send(req.params.slug);
});

module.exports = router;
```
