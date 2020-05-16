export const required = value => {
    if (value) {
        return undefined;
    } else {
        return "Field is required!"
    }
}

export const maxLengthCreator = (countSymbols) => (value) => {
    if (value && value.length > countSymbols) {
        return `Max length is ${countSymbols}`;
    } else {
        return undefined;
    }
}

export const minLengthCreator = (countSymbols) => {
    return (value) => {
        if (value && value.length < countSymbols) {
            return "Min length is" + " " + countSymbols;
        } else {
            return undefined;
        }
    }
}