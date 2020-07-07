const fetch = require("node-fetch")
const URLError = require("./URLError")
const ERROR_CAPTIONS = require("./errorCaptions.json")

module.exports = (imageURL) => {

    if (typeof imageURL !== "string")
        throw new TypeError("Invalid image URL.")

    const response = await fetch(imageURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            Content: imageURL,
            Type: "CaptionRequest"
        })
    }).then(res => res.json())

    if (typeof response !== "string")
        throw new TypeError("Response body is invalid.")
    else if (ERROR_CAPTIONS.includes(response))
        throw new URLError("The specified URL is invalid")

    return response
}

module.exports.URLError = URLError
module.exports.ERROR_CAPTIONS = ERROR_CAPTIONS