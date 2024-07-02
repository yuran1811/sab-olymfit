import { component$ } from "@builder.io/qwik";

import type { BankAccountType } from "~/constants";

export default component$(
  ({
    desc = "",
    amount = 20,
    mode = "print",
    bankAccount,
  }: {
    desc?: string;
    amount?: number;
    mode?: "compact" | "compact2" | "print" | "qr_only";
    bankAccount: BankAccountType;
  }) => {
    return (
      <img
        width="600"
        height="776"
        src={`https://img.vietqr.io/image/${bankAccount.bank.toLowerCase()}-${bankAccount.number}-${mode}.png?amount=${amount}&accountName="${bankAccount.name}&addInfo=${desc}"`}
        alt="qrcode"
      />
    );
  },
);
