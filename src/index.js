const fetch = require("node-fetch")
const URLError = require("./URLError")

module.exports = (imageURL) => {

    if (typeof imageURL !== "string")
        throw new URLError("Invalid image URL.")

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
        throw new URLError(module.exports.ERROR_MAP[response])

    return response
}

module.exports.ERROR_CAPTIONS = [
    "Did you upload an image? I'm more of a visual person (bot) and can only reply to images",
    "I really can't describe the picture 😳",
    "I'm not sure what you're asking"
]