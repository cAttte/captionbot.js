const fetch = require("node-fetch")
const URLError = require("./URLError")
const ERROR_CAPTIONS = require("./ERROR_CAPTIONS")

/**
 * Caption an image given its URL.
 * @param {String} imageURL The URL of the image to caption
 * @param {Object} options
 * @param {Boolean} options.error Whether to throw an error/reject when the provided URL is invalid/missing, but a response is still obtained—this will be irrelevant if there's a network error, for example
 * @returns {Promise<String>}
 */
module.exports = async (imageURL, { error = true } = {}) => {
    if (error) {
        if (!imageURL || typeof imageURL !== "string")
            throw new TypeError("The image URL is not a string.")
        try {
            new URL(imageURL)
        }
        catch {
            throw new URLError("The image URL is invalid.")
        }
    }

    const response = await fetch("https://captionbot.azurewebsites.net/api/messages", {
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