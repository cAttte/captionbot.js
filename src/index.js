const fetch = require("node-fetch")
const URLError = require("./URLError")
const ERROR_CAPTIONS = require("./errorCaptions.json")

module.exports = (imageURL, { error }) => {

    if (!imageURL || typeof imageURL !== "string")
        throw new TypeError("The image URL is not a string.")
    try {
        new URL(imageURL)
    }
    catch {
        throw new URLError("The image URL is invalid.")
    }

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
    else if (ERROR_CAPTIONS.includes(response) && error)
        throw new URLError("The image URL is missing, invalid, or not an image.")

    return response
}

module.exports.URLError = URLError
module.exports.ERROR_CAPTIONS = ERROR_CAPTIONS