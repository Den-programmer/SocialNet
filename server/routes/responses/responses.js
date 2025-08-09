export class StandartRes {
    constructor(resultCode, message, data = {}) {
        this.resultCode = resultCode
        this.message = message
        this.data = data
    }
    getResultCode() {
        return this.resultCode
    }
    getMessage() {
        return this.message
    }
    getData() {
        return this.data
    }
}

export const catchRes = new StandartRes(1, "Something is gone wrong...")

