# captionbot.js

A tiny JavaScript wrapper for Microsoft's Captionbot API.

# Install

    npm install captionbot.js

# Usage

### With a callback function

```javascript
const caption = require("captionbot.js").caption
var imageURL = "https://www.tinypetstube.com/wp-content/uploads/cute-puppy-picture-1.jpg"

caption(imageURL, (caption) => {

    console.log("Caption: " + caption)
    // => Caption: I think it's a dog standing on grass.

})
```

If a callback is not passed to the function, a promise will be returned:

### With promises, using .then()

```javascript
const caption = require("captionbot.js").caption
var imageURL = "https://zuwanu.com/wp-content/uploads/2019/09/cars-zuwanu.jpg"

caption(imageURL)
    .then((caption) => {

        console.log("Caption: " + caption)
        // => Caption: I think it's a car parked in a parking lot.

    })
```

### With promises, using async/await

```javascript
const caption = require("captionbot.js").caption
var imageURL = "http://www.aridzoneafforestation.org/wp-content/uploads/2018/01/europeslostf.jpg"

async function printCaption(url) {

    var result = await caption(url)
    console.log("Caption: " + result)

}

printCaption(imageURL)
// => Caption: I think it's a tree in a forest.
```

# Errors

**Three types of errors can occur while using Captionbot.js:**

**[1]** The first one is an error from the `request` package. It's not related to Captionbot.js. It can be caused if Microsoft has modified the Captionbot API URL or the request couldn't be made at all (you don't have an Internet connection). You will have to read the error message to figure it out.

The second and third ones are related.

**[2]** If the Captionbot API replies with "Did you upload an image?" an error `Image URL not specified.` will be thrown:

```javascript
const caption = require("captionbot.js").caption
var problematicURLs = [null, undefined, ""]

var imageURL = problematicURLs[Math.floor(Math.random() * problematicURLs.length)]

caption(imageURL)
    .then((caption) => console.log(caption))
    .catch((error) => console.log("ERROR: " + error))
    // => ERROR: Image URL not specified.
```

**[3]** If the Captionbot API replies with "I really can't describe the picture 😳" or "I'm not sure what you're asking" an error `Invalid image URL.` will be thrown

```javascript
const caption = require("captionbot.js").caption
var problematicURLs = ["not a url", [], {}, "http://real.site/broken_img_404"]

var imageURL = problematicURLs[Math.floor(Math.random() * problematicURLs.length)]

caption(imageURL)
    .then((caption) => console.log(caption))
    .catch((error) => console.log("ERROR: " + error))
    // => ERROR: Invalid image URL.
```

# Example captions

The example images used in the usage section along their captions.

### "I think it's a dog standing on grass."
<img src="https://www.tinypetstube.com/wp-content/uploads/cute-puppy-picture-1.jpg" width="300" >


### "I think it's a car parked in a parking lot."
<img src="https://zuwanu.com/wp-content/uploads/2019/09/cars-zuwanu.jpg" width="300" >

### "I think it's a tree in a forest."
<img src="http://www.aridzoneafforestation.org/wp-content/uploads/2018/01/europeslostf.jpg" width="300" >

(as we can see in the last two captions, Captionbot is not very good at counting :P)
