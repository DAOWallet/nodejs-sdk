import { createHmac } from 'crypto';
import axios from 'axios';
import {IDaoWallet, ECryptoCurrency, IDaoWalletResultData, IAddressTakeResult} from './DaoWallet.interface';
export class DaoWallet implements IDaoWallet {
  private apiKey: string;
  private secretKey: string;
  private url: string;

  constructor(apiKey, secretKey, url = 'https://b2b.daowallet.com') {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.url = url;
  }

  public async AddressesTake(userId: string, currency: ECryptoCurrency): Promise<IDaoWalletResultData<IAddressTakeResult>> {
    const data = {
      currency,
      foreign_id: userId,
    };
    const result = await axios({
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

  public async CryptoWithdrawal(userId: string, amount: number, currency: ECryptoCurrency, address: string) {
    const data = {
      amount,
      address,
      foreign_id: userId,
      currency: currency,
    };
    const result = await axios({
      method: 'post',
      url: this.url + '/api/v2/withdrawal/crypto',
      data,
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature(data)
      }
    });
    console.log(result.data)
    return result.data;
  }

  private getSignature(body: object): string {
    return createHmac('sha512', this.secretKey)
      .update(JSON.stringify(body))
      .digest('hex');
  }
}