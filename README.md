# captionbot.js
A tiny JavaScript wrapper for Microsoft's Captionbot API.

All image recognition is made by the Captionbot; this package only makes requesting the captions a little easier.

# Installation
```
npm install captionbot.js
```

# Usage
```js
const { caption } = require("captionbot.js")
const imageURL = "https://zuwanu.com/wp-content/uploads/2019/09/cars-zuwanu.jpg"

// using then()
caption(imageURL)
    .then(imageCaption => console.log(`Caption: ${imageCaption}`))
    .catch(error => console.log(`Error: ${error.message}`))
    // => Caption: I think it's a car parked in a parking lot.

// using async/await
async function logCaption(imageURL) {
    try {
        const imageCaption = await caption(imageURL)
        console.log(`Caption: ${caption}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}
logCaption()
// => Caption: I think it's a car parked in a parking lot.
```

# API

## captionbot.caption()
Caption an image given its URL.

### Parameters
| name          | description                                                                                                                                                                 | default |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| imageURL      | The URL of the image to caption                                                                                                                                             |         |
| options       |                                                                                                                                                                             | `{}`    |
| options.error | Whether to throw an error/reject when the provided URL is invalid/missing, but a response is still obtained—this will be irrelevant if there's a network error, for example | `false` |

### Returns
    Promise<String>

## captionbot.URLError *extends TypeError*
Thrown by `caption()` when the specified URL is invalid, and the `error` option is `true`.

```js
new URLError(message)
```

## captionbot.ERROR_CAPTIONS
A list of captions the API returns when the specified URL is invalid.

### Type
    Array<String>

# Example captions
Some examples of captions returned by the API.

## "I think it's a dog standing on grass."
<img src="https://www.tinypetstube.com/wp-content/uploads/cute-puppy-picture-1.jpg" width="300">

## "I think it's a car parked in a parking lot."
<img src="https://zuwanu.com/wp-content/uploads/2019/09/cars-zuwanu.jpg" width="300">

## "I think it's a view of water and a mountain in the background."
<img src="https://eskipaper.com/images/cool-mountain-landscape-1.jpg" width="300">