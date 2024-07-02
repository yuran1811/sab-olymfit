export const APP_NAME = "SAB Olymfit";

export const PUBLIC_ROUTES = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/payment/",
    name: "Payment",
  },
] as const;

export const SPORT_LIST = [
  { value: "soccer", label: "Bóng đá", price: 20 },
  { value: "badminton", label: "Cầu lông", price: 20 },
  { value: "athletics", label: "Điền kinh", price: 20 },
  { value: "chess", label: "Cờ vua", price: 20 },
] as const;

export type SportEnum = (typeof SPORT_LIST)[number]["value"];

export const BANK_ACCOUNT = {
  name: "VO THANH TU",
  number: "0886542499",
  bank: "BIDV",
  branch: "",
};

export type BankAccountType = typeof BANK_ACCOUNT;
