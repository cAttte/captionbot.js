/**
 * Thrown by `caption()` when the specified URL is invalid, and the `error` option is `true`.
 */
module.exports = class URLError extends TypeError {
    /**
    * @param {String} message The error message.
    */
    constructor(message) {
        super(message)
        this.name = "URLError"
    }
}