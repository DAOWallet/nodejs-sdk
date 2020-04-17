"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = require("crypto");
const axios_1 = tslib_1.__importDefault(require("axios"));
class DaoWallet {
    constructor(apiKey, secretKey, url) {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.url = url;
    }
    async AddressesTake(userId, currency) {
        const data = {
            currency,
            foreign_id: userId,
        };
        const result = await axios_1.default({
            method: 'post',
            url: this.url + '/api/v2/addresses/take',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        });
        return result.data;
    }
    async CryptoWithdrawal(userId, amount, currency, address) {
        const data = {
            amount,
            address,
            foreign_id: userId,
            currency: currency,
        };
        const result = await axios_1.default({
            method: 'post',
            url: this.url + '/api/v2/withdrawal/crypto',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        });
        console.log(result.data);
        return result.data;
    }
    getSignature(body) {
        return crypto_1.createHmac('sha512', this.secretKey)
            .update(JSON.stringify(body))
            .digest('hex');
    }
}
exports.DaoWallet = DaoWallet;
//# sourceMappingURL=DaoWallet.js.map