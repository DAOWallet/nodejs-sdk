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


export enum EInvoiceStatus {
  created = 'created',
  paid = 'paid',
  expired = 'expired',
  declined = 'declined'
}

export enum EFiatCurrencyName {
  USD = 'USD',
  EUR = 'EUR',
}

export interface IInvoiceAddress {
  address: string
  expected_amount: number
  crypto_currency: ECryptoCurrency
  rate_usd: number
  rate_eur: number
}

export interface IInvoiceResult {
  foreign_id: string
  addresses: IInvoiceAddress[]
  client_amount: number
  client_currency: EFiatCurrencyName
  status: EInvoiceStatus
  expired_at: string
  paid_at: string
  paid_currency: ECryptoCurrency
  paid_tx: string
}

export interface ISubAccountItem {
  account_id: string
  balance: number
  created_at: string
}

export interface ISubAccountExchangeResult {
  currency: string
  amount: number
}

export interface ISubAccountWithdrawalInput {
  accountId: string
  amount: number
  address: string
}

export interface ISubAccountFromMasterExchangeData {
  to: string
  currency_from: string
  amount: number
}

export interface ISubAccountToMasterExchangeData {
  from: string
  currency_to: string
  amount: number
}