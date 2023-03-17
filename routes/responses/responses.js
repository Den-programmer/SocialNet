class StandartRes {
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

const catchRes = new StandartRes(1, "Something is gone wrong...")

exports.StandartRes = StandartRes
exports.catchRes = catchRes