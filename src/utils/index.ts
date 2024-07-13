import type { DocumentHead, DocumentHeadValue } from "@builder.io/qwik-city";
import { toast } from "qwik-sonner";

import { APP_NAME, type SportEnum } from "~/constants";

export const getHeadInfo = (content: string, options?: DocumentHeadValue) =>
  ({
    title: `${APP_NAME} | ${content}`,
    ...options,
  }) as DocumentHead;

export const classnames = (...arg: (string | boolean)[]) =>
  arg.filter(Boolean).join(" ");

export const checkPathInclude = (path: string, pattern: string) =>
  pattern.length === 1
    ? path === pattern
    : path.substring(0, pattern.length) === pattern;

export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
  toast.success(`Copied '${data}'`);
  console.log("copied");
};

export const generatePaymentInfo = (type: SportEnum, data: any) => {
  return type === "soccer"
    ? `OLF SOC ${data.mssv} ${data.teamName}`
    : type === "badminton"
      ? `OLF BAD ${data.mssv}${data.extraMember ? " " + data.mssv2 : ""}`
      // : type === "athletics"
      //   ? `OLF RUN ${data.mssv}`
        : type === "chess"
          ? `OLF CHESS ${data.mssv}`
          : "";
};

export const convertToVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value,
  );

// https://gist.github.com/jarvisluong/f01e108e963092336f04c4b7dd6f7e45
export function toLowerCaseNonAccentVietnamese(str: string) {
  str = str.toLowerCase();
  //     We can also use this instead
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");

  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return str;
}

export function toNonAccentVietnamese(str: string) {
  str = str.replace(/Á|À|Ả|Ã|Ạ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ/g, "A");
  str = str.replace(/á|à|ả|ã|ạ|â|ầ|ấ|ẩ|ẫ|ậ|ă|ằ|ắ|ẳ|ẵ|ặ/g, "a");
  str = str.replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/, "E");
  str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/Í|Ì|Ỉ|Ĩ|Ị/g, "I");
  str = str.replace(/í|ì|ỉ|ĩ|ị/g, "i");
  str = str.replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");

  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return str;
}
