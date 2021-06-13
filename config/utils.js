const json_error = (title, message) => {
    return {
        code: title,
        message: message,
        timeStamp: Date(),
        source: 'User source'
    }
}

module.exports = json_error