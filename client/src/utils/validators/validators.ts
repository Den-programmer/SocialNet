export type FieldValidator = (value: string) => string | undefined

export const required:FieldValidator = (value) => {
    if (value) {
        return undefined;
    } else {
        return "Field is required!"
    }
}

export const maxLengthCreator = (countSymbols: number):FieldValidator => (value) => {
    if (value && value.length > countSymbols) {
        return `Max length is ${countSymbols}`;
    } else {
        return undefined;
    }
}

export const minLengthCreator = (countSymbols: number):FieldValidator => (value) => {
    if (value && value.length < countSymbols) {
        return "Min length is " + countSymbols;
    } else {
        return undefined;
    }
}
export const enteredNothingError:FieldValidator = (val) => {
    if (!val) return "You entered nothing!"
    
    return undefined;
}

export const runValidators = (
  value: string,
  validators: FieldValidator[]
): string | undefined => {
  for (const validate of validators) {
    const error = validate(value)
    if (error) return error
  }
  return undefined
}