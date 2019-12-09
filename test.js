const caption = require("./index.js").caption
var problematicURLs = [null, undefined, ""]

var imageURL = problematicURLs[Math.floor(Math.random() * problematicURLs.length)]

caption(imageURL)
    .then((caption) => console.log(caption))
    .catch((error) => console.log("ERROR: " + error))
