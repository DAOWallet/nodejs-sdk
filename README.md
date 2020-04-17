# Usage

```javascript
import { ECryptoCurrency } from './src/DaoWallet.interface';
const {BTC, ETH} = ECryptoCurrency;

const dw = new DaoWallet('your_api_key', 'your_secret_key');
const takeAddressResult = await dw.AddressesTake('userId', BTC);

const { address } = takeAddressResult.data;

const withdrawalResult = await dw.CryptoWithdrawal('userId', 0.001, BTC, 'user_address');
```
