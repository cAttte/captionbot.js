const fetch = require("node-fetch")

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
    else if (module.exports.ERROR_MAP[response])
        throw new TypeError(module.exports.ERROR_MAP[response])

    return response
}

module.exports.ERROR_MAP = {
    "Did you upload an image?": "Image URL not specified.",
    "I really can't describe the picture 😳": "Invalid image URL.",
    "I'm not sure what you're asking": "Invalid image URL."
}