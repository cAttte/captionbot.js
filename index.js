const fetch = require("node-fetch")

exports.caption = (imageURL) => {
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
    else if (response === "Did you upload an image?")
        throw new TypeError("Image URL not specified.")
    else if (["I really can't describe the picture 😳", "I'm not sure what you're asking"]
    .includes(response))
        throw new TypeError("Invalid image URL.")

    return response
}