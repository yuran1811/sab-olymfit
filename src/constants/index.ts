export const APP_NAME = "SAB Olymfit";

export const PUBLIC_ROUTES = [
  {
    path: "/payment/",
    name: "Thanh toán",
  },
] as const;

export const SPORT_LIST = [
  {
    value: "soccer",
    label: "Bóng đá",
    totalPrice: 300,
    price: 200,
    orderPrice: 100,
  },
  {
    value: "badminton",
    label: "Cầu lông",
    totalPrice: 70,
    price: 20,
    orderPrice: 50,
  },
  // {
  //   value: "athletics",
  //   label: "Điền kinh",
  //   totalPrice: 50,
  //   price: 0,
  //   orderPrice: 50,
  // },
  {
    value: "chess",
    label: "Cờ vua",
    totalPrice: 50,
    price: 0,
    orderPrice: 50,
  },
] as const;

export type SportEnum = (typeof SPORT_LIST)[number]["value"];

export const BANK_ACCOUNT = {
  name: "VO THANH TU",
  number: "0886542499",
  bank: "BIDV",
  branch: "",
};

export type BankAccountType = typeof BANK_ACCOUNT;
