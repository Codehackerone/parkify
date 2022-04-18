const sanitizeHtml = require('sanitize-html');

// sanitizer configuration
const sanitizer = {
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: [],
};

/* ------------ Html sanitizer Middleware ----------- */

// SanitizerMiddleware ... receives a JSON object as parameter and sanitizes the html
const SanitizerMiddleware = () => {
    return async (req, res, next) => {
        let m = 0;
        for (let [key, value] of Object.entries(req.body)) {
            // checks if a value of the object contains html
            if (
                value !== sanitizeHtml(value, sanitizer) &&
                key !== 'user_id' &&
                key !== 'verified'
            ) {
                console.log(value + ' ' + sanitizeHtml(value, sanitizer));
                res.status(500).send(key + ' must not include HTML!');
                m = 1;
            }
        }
        // pass the request to the next middleware if no html is found
        if (m == 0) next();
    };
};

module.exports = SanitizerMiddleware;
