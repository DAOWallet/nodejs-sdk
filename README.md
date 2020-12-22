# Getting Started
Install dao-node-sdk using [`yarn`](https://yarnpkg.com/en/package/jest):
```bash
yarn add DAOWallet/nodejs-sdk.git
```

Or [`npm`](https://www.npmjs.com/):

```bash
npm install DAOWallet/nodejs-sdk.git
```

# Import
Import
```javascript
import { DaoWallet } from 'dao-node-sdk'
```
Or
```javascript
const { DaoWallet } = require('dao-node-sdk')
```

# Usage
For using module need initialed class:
```javascript
const dw = new DaoWallet('your_api_key', 'your_secret_key');
```

# Methods
## General
#### `AddressesTake`
Method `AddressesTake` returns crypto address by `user_id` and `currency`.
Usage example:
```javascript
const address = await dw.AddressesTake('userId any random string less than 128 chars', 'BTC')
```
Method returns object:
```javascript
{
  id: number,
  address: string,
  currency: 'BTC' | 'ETH',
  foreign_id: string,
  tag: string
}
```

#### `CryptoWithdrawal`
Method `CryptoWithdrawal` withraw money from company balance to current address
Usage example:
```javascript
const withdrawalResult = await dw.CryptoWithdrawal('userId', 0.001, 'BTC', 'user_address')
```
Method returns object:
```javascript
{
  data: {
    type: 'withdrawal',
    amount: number,
    sender_currency: 'BTC' | 'ETH',
    receiver_currency: 'BTC' | 'ETH',
  }
}
```
---

## Invoices
#### `InvoiceStatus`
Method `InvoiceStatus` returns invoice\`s status by `id`
Usage example:
```javascript
const invoiceInfo = await dw.InvoiceStatus('invoice-id')
```
Method returns object:
```javascript
{
  foreign_id: string,
  addresses: {
    address: string,
    expected_amount: number,
    crypto_currency: 'BTC' | 'ETH',
    rate_usd: number,
    rate_eur: number,
  }[],
  client_amount: number,
  client_currency: 'USD' | 'EUR',
  status: 'created' | 'paid' | 'expired' | 'declined',
  expired_at: string,
  paid_at: string,
  paid_currency: 'BTC' | 'ETH',
  paid_tx: string
}
```
#### `InvoiceCreate`
Method `InvoiceCreate` create new invoice
Usage example:
```javascript
const createdInvoice = await dw.InvoiceCreate(20, 'EUR');
```
Method returns object:
```javascript
{
  foreign_id: string,
  addresses: {
    address: string,
    expected_amount: number,
    crypto_currency: 'BTC' | 'ETH',
    rate_usd: number,
    rate_eur: number,
  }[],
  client_amount: number,
  client_currency: 'USD' | 'EUR',
  status: 'created' | 'paid' | 'expired' | 'declined',
  expired_at: string,
  paid_at: string,
  paid_currency: 'BTC' | 'ETH',
  paid_tx: string,
}
```
---
## SubAccounts
#### `SubAccountCreate`
Method `SubAccountCreate` create new SubAccount
usage example:
```javascript
const createdSubAccount = await dw.SubAccountCreate('ETH')
```
Method returns object:
```javascript
  {
    account_id: string,
    balance: number,
    created_at: string
  }
```

#### `SubAccountList`
Method `SubAccountList` returns all company SubAccounts
usage example:
```javascript
const list = await dw.SubAccountList()
```
Method returns array:
```javascript
  {
    account_id: string,
    balance: number,
    created_at: string
  }[]
```

#### `SubAccountFromMasterExchange`
Method `SubAccountFromMasterExchange` excahnge from masterAccount to subAccount
usage example:
```javascript
const exchange = await dw.SubAccountFromMasterExchange({
  to: 'C.111.ETH.ZZZ',
  currency_from: 'BTC',
  amount: 0.02,
  memo: 'any-string'
})
```
Method returns object:
```javascript
  {
    amount_from: number,
    amount_to: nubmer,
    currency_from: string,
    currency_to: string,
    rate: number,
    memo: string
  }
```

#### `SubAccountToMasterExchange`
Method `SubAccountToMasterExchange` excahnge from subAccount to masterAccount
usage example:
```javascript
const exchange = await dw.SubAccountToMasterExchange({
  from: 'C.111.ETH.ZZZ',
  currency_to: 'BTC',
  memo: 'any-string',
  amount: 0.02
})
```
Method returns object:
```javascript
  {
    amount_from: number,
    amount_to: nubmer,
    currency_from: string,
    currency_to: string,
    rate: number,
    memo: string
  }
```

#### `SubAccountWithdrawal`
Method `SubAccountWithdrawal` withdraw crypto from SubAccounts
usage example:
```javascript
const withdrawal = await dw.SubAccountWithdrawal({
  accountId: 'C.111.ETH.ZZZ',
  amount: 0.001,
  address: 'some_eth_address'
})
```
Method returns boolean value:
```javascript
  true/false
```

#### `SubAccountHistory`
Method `SubAccountHistory` returns history of subAccount with pagination
2 params:
* subAccount id
* page 

usage example:
```javascript
const history = await dw.SubAccountHistory('C.111.ETH.ZZZ', 1)
```
Method returns array:
```javascript
  {
    created_at: string,
    amount: number,
    result: number,
    currency_name: string
  }[]
```

#### `SubAccountRate`
Method `SubAccountRate` returns rate
usage example:
```javascript
const rate = await dw.SubAccountRate({
  currency_from: 'ETH',
  currency_to: 'BTC',
  amount: 0.037,
})
```
Method returns object:
```javascript
  {
    currency_from: string,
    currency_to: string,
    amount_from: number,
    amount_to: number,
    rate: number
  }
```
---
## Total usage example
```javascript
import { ECryptoCurrency, EFiatCurrencyName } from './src/DaoWallet.interface';
import { DaoWallet } from './src/DaoWallet'
const { BTC, ETH } = ECryptoCurrency;
const { EUR, USD } = EFiatCurrencyName;

const dw = new DaoWallet('your_api_key', 'your_secret_key');
const takeAddressResult = await dw.AddressesTake('userId', BTC);

const { address } = takeAddressResult.data;

const withdrawalResult = await dw.CryptoWithdrawal('userId', 0.001, BTC, 'user_address');

const invoiceInfo = await dw.InvoiceStatus('invoice-id');
const createdInvoice = await dw.InvoiceCreate(20, EUR);

const createdSubAccount = await dw.SubAccountCreate(ETH)
const list = await dw.SubAccountList()

const exchangeToSubAccount = await dw.SubAccountFromMasterExchange({
  to: 'C.111.ETH.ZZZ',
  currency_from: 'USDT',
  amount: 15,
  memo: 'some-string'
})

const exchangeFromSubAccount = await dw.SubAccountToMasterExchange({
  from: 'C.111.ETH.ZZZ',
  currency_to: 'BTC',
  amount: 0.02,
  memo: 'some-string'
})

const withdrawal = await dw.SubAccountWithdrawal({
  accountId: 'C.111.ETH.ZZZ',
  amount: 0.001,
  address: 'some_eth_address'
})

const history = await dw.SubAccountHistory('C.111.ETH.ZZZ', 1)

const rate = await dw.SubAccountRate({
  currency_from: 'ETH',
  currency_to: 'BTC',
  amount: 0.037,
})
```
