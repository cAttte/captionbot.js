const request = require("request")

exports.caption = (imageURL, callback) => {

    const options = {

        "url": "https://captionbot.azurewebsites.net/api/messages",

        "method": "POST",

        "headers": {

            "Content-Type": "application/json; charset=utf-8"

        },

        "json": {

            "Content": imageURL,
            "Type": "CaptionRequest"

        }

    }

    function handleErrors(response) {

        if (response.includes("Did you upload an image?")) {

            return "Image URL not specified."

        } else if (response === "I really can't describe the picture 😳"
                || response === "I'm not sure what you're asking") {

            return "Invalid Image URL."

        }

    }

    if (!callback) {

        return new Promise((resolve, reject) => {

            request(options, (err, res, body) => {

                var error = err || handleErrors(res.body)
                if (error) reject(error)

                resolve(res.body)

            })

        })

    } else {

        request(options, (err, res, body) => {

            var error = err || handleErrors(res.body)
            if (error) {
                callback(error)
            } else {
                callback(error, res.body)
            }

        })

    }

}
