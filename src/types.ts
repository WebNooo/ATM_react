export interface banknotesType {
  [key: number]: number;
}

export interface messageType {
  text?: string;
  timeout?: number;
}

export interface calculateBanknotesType {
  banknotes?: banknotesType;
  amount?: number;
  remainder?: number;
}

export type screenTypes = 'main' | 'help';

export interface stateType {
  banknotes: banknotesType;
  amountBanknotes: number;
  calculateBanknotes: calculateBanknotesType;
  message: messageType;
  screen: screenTypes;
  value: string;
}
