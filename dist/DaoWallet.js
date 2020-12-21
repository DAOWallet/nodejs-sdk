"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoWallet = void 0;
const tslib_1 = require("tslib");
const crypto_1 = require("crypto");
const axios_1 = tslib_1.__importDefault(require("axios"));
class DaoWallet {
    constructor(apiKey, secretKey, url = 'https://b2b.daowallet.com') {
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
            url: this.url + '/v2/addresses/take',
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
            url: this.url + '/v2/withdrawal/crypto',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        });
        return result.data;
    }
    async InvoiceCreate(amount, fiat_currency) {
        const data = {
            fiat_currency,
            amount,
        };
        const result = (await axios_1.default({
            url: this.url + '/v2/invoice/new',
            method: 'POST',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        })).data;
        return result;
    }
    async InvoiceStatus(foreignId) {
        const data = {
            id: foreignId
        };
        const result = (await axios_1.default({
            url: this.url + '/v2/invoice/status',
            method: 'GET',
            params: data,
        })).data;
        return result;
    }
    async SubAccountCreate(currency_name) {
        const data = {
            currency_name
        };
        const result = (await axios_1.default({
            url: this.url + '/v2/sub-account/add',
            method: 'POST',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        })).data;
        return result;
    }
    async SubAccountList() {
        const result = (await axios_1.default({
            url: this.url + '/v2/sub-account',
            method: 'GET',
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature({})
            }
        })).data;
        return result;
    }
    async SubAccountExcahnge(data) {
        const result = (await axios_1.default({
            url: this.url + '/v2/sub-account/exchange',
            method: 'POST',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        })).data;
        return result;
    }
    async SubAccountWithdrawal(data) {
        const result = (await axios_1.default({
            url: this.url + '/v2/sub-account/withdrawal',
            method: 'POST',
            data,
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature(data)
            }
        })).data;
        return result;
    }
    async SubAccountHistory(accountId, page) {
        const result = (await axios_1.default({
            url: this.url + '/v2/sub-account/history',
            method: 'GET',
            params: {
                accountId,
                page,
            },
            headers: {
                'X-Processing-Key': this.apiKey,
                'X-Processing-Signature': this.getSignature({})
            }
        })).data;
        return result;
    }
    getSignature(body) {
        return crypto_1.createHmac('sha512', this.secretKey)
            .update(JSON.stringify(body))
            .digest('hex');
    }
}
exports.DaoWallet = DaoWallet;
//# sourceMappingURL=DaoWallet.js.map