export interface IDaoWallet {
  AddressesTake(userId: string, currency: ECryptoCurrency): Promise<IDaoWalletResultData<IAddressTakeResult>>;
  CryptoWithdrawal(userId: string, amount: number, currency: ECryptoCurrency, address: string): Promise<IDaoWalletResultData<ICryptoWithdrawalResult>>;
}

export interface IDaoWalletResultData<T> {
  data: T;
}

export interface IAddressTakeResult {
  id: number;
  address: string;
  currency: string;
  foreign_id: string;
  tag: string;
}

export interface ICryptoWithdrawalResult {
  foreign_id: string;
  type: 'withdrawal';
  amount: number;
  sender_currency: ECryptoCurrency;
  receiver_currency: ECryptoCurrency
}

export enum ECryptoCurrency {
  BTC = 'BTC',
  ETH = 'ETH'
}