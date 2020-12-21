import { createHmac } from 'crypto';
import axios from 'axios';
import {IDaoWallet,
  ECryptoCurrency,
  IDaoWalletResultData,
  IAddressTakeResult,
  IInvoiceResult,
  EFiatCurrencyName,
  ISubAccountItem,
  ISubAccountFromMasterExchangeData,
  ISubAccountToMasterExchangeData,
  ISubAccountExchangeResult,
  ISubAccountWithdrawalInput
} from './DaoWallet.interface';
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
    return result.data;
  }

  public async InvoiceCreate(amount: number, fiat_currency: EFiatCurrencyName): Promise<IInvoiceResult> {

    const data = {
      fiat_currency,
      amount,
    };
    const result = (await axios({
      url: this.url + '/api/v2/invoice/new',
      method: 'POST',
      data,
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature(data)
      }
    })).data;
  
    return result 
  }

  public async InvoiceStatus(foreignId: string): Promise<IInvoiceResult> {

    const data = {
      id: foreignId
    };
    const result = (await axios({
      url: this.url + '/api/v2/invoice/status',
      method: 'GET',
      params: data,
    })).data;
  
    return result 
  }

  public async SubAccountCreate(currency_name: ECryptoCurrency): Promise<ISubAccountItem> {
    const data = {
      currency_name
    };
    const result = (await axios({
      url: this.url + '/api/v2/sub-account/add',
      method: 'POST',
      data,
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature(data)
      }
    })).data;
  
    return result 
  }

  public async SubAccountList(): Promise<ISubAccountItem[]> {
    const result = (await axios({
      url: this.url + '/api/v2/sub-account',
      method: 'GET',
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature({})
      }
    })).data;
  
    return result 
  }

  public async SubAccountFromMasterExchange(data: ISubAccountFromMasterExchangeData): Promise<ISubAccountExchangeResult> {
    const result = (await axios({
      url: this.url + '/api/v2/sub-account/from-master',
      method: 'POST',
      data,
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature(data)
      }
    })).data;
  
    return result 
  }

  public async SubAccountToMasterExchange(data: ISubAccountToMasterExchangeData): Promise<ISubAccountExchangeResult> {
    const result = (await axios({
      url: this.url + '/api/v2/sub-account/to-master',
      method: 'POST',
      data,
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature(data)
      }
    })).data;
  
    return result 
  }

  public async SubAccountWithdrawal(data: ISubAccountWithdrawalInput): Promise<boolean> {
    const result = (await axios({
      url: this.url + '/api/v2/sub-account/withdrawal',
      method: 'POST',
      data,
      headers: {
        'X-Processing-Key': this.apiKey,
        'X-Processing-Signature': this.getSignature(data)
      }
    })).data;
  
    return result 
  }

  public async SubAccountHistory(accountId: string, page: number): Promise<boolean> {
    const result = (await axios({
      url: this.url + '/api/v2/sub-account/history',
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
  
    return result 
  }

  private getSignature(body: object): string {
    return createHmac('sha512', this.secretKey)
      .update(JSON.stringify(body))
      .digest('hex');
  }
}