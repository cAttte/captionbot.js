module.exports = class URLError extends TypeError {
    constructor(message) {
        super(message)
        this.name = "URLError"
    }
}