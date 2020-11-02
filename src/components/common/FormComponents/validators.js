

export const required = (value) => {
    if (!value) {
        return 'Field is required'
    }
    return undefined
}

export const maxLengthCreator = (lengthNumber) => (value) => {
    if (value.length > lengthNumber) {
        return `Message max symbol is ${lengthNumber}`
    }
    return undefined
}