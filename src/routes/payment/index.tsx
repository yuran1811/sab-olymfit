import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Modal } from "@qwik-ui/headless";

import PWithCopy from "~/components/shared/p-with-copy";
import QrPayment from "~/components/shared/qr-payment";
import RegisterForm from "~/components/shared/register-form";

import { BANK_ACCOUNT, SPORT_LIST } from "~/constants";
import type { FormDataType, FormErrorsType } from "~/shared/types";
import {
  classnames,
  convertToVND,
  generatePaymentInfo,
  getHeadInfo,
  toNonAccentVietnamese,
} from "~/utils";

export const useFormLoader = routeLoader$<FormDataType>(() => ({
  teamName: "",
  name: "",
  mssv: 23127001,
  name2: "",
  mssv2: 23127001,
  selectedSport: "soccer",
  extraMember: false,
}));

export default component$(() => {
  const formLoader = useFormLoader();

  const formData = useStore<FormDataType>(formLoader.value);
  const formErrors = useStore<FormErrorsType>({
    teamName: "",
    name: "",
    mssv: "",
    name2: "",
    mssv2: "",
  });

  const addMember = useSignal(false);
  const showModal = useSignal(false);
  const sportItem = useSignal(
    SPORT_LIST.find((_) => _.value === formData.selectedSport),
  );
  const paymentInfo = useStore({
    content: "",
    price: 0,
  });

  const validateForm$ = $(() => {
    const errors = {
      teamName: "",
      name: "",
      mssv: "",
      name2: "",
      mssv2: "",
    };

    if (formData.selectedSport === "soccer") {
      if (formData.teamName.trim() === "")
        errors.teamName = "Bắt buộc phải có tên đội";
      else if (formData.teamName.trim().length > 3)
        errors.teamName = "Chỉ điền tên viết tắt, tối đa 3 kí tự";
    }

    formData.teamName = toNonAccentVietnamese(
      formData.teamName || "",
    ).toUpperCase();
    formData.name = toNonAccentVietnamese(formData.name || "");
    formData.name2 = toNonAccentVietnamese(formData.name2 || "");

    errors.name = formData.name.trim() === "" ? "Bắt buộc điền tên" : "";
    errors.name2 =
      formData.extraMember && formData.name2.trim() === ""
        ? "Bắt buộc điền tên"
        : "";

    errors.mssv =
      isNaN(formData.mssv) || String(formData.mssv).length !== 8
        ? "MSSV phải có 8 chữ số"
        : "";
    errors.mssv2 =
      formData.extraMember &&
      (isNaN(formData.mssv2) || String(formData.mssv2).length !== 8)
        ? "MSSV phải có 8 chữ số"
        : " ";

    return {
      validated: Object.values(errors).every((_) => !_.trim().length),
      errors,
    };
  });

  useTask$(({ track }) => {
    track(() => formData.selectedSport);

    sportItem.value = SPORT_LIST.find(
      (_) => _.value === formData.selectedSport,
    );
  });

  return (
    <div class="container mx-auto grid max-w-2xl grid-cols-1 gap-6 p-6 sm:grid-cols-2">
      <RegisterForm
        addMember={addMember}
        formData={formData}
        formErrors={formErrors}
      />

      <div class="flex flex-col items-center justify-start gap-4">
        {sportItem.value && (
          <div class="mx-auto grid w-max max-w-xs grid-cols-1 gap-6 rounded-md border-[1px] border-gray-400 p-6 dark:border-gray-300">
            <div class="font-semibold">Bảng phí</div>
            <div class="">
              Phí tham gia:
              <span class="ml-1 rounded-md">
                {convertToVND(
                  sportItem.value.price *
                    (sportItem.value.value === "badminton" &&
                    formData.extraMember
                      ? 2
                      : 1) *
                    1000,
                )}
              </span>
            </div>
            <div class="">
              Phí bảo chứng:
              <span class="ml-1 rounded-md">
                {convertToVND(
                  sportItem.value.orderPrice *
                    (sportItem.value.value === "badminton" &&
                    formData.extraMember
                      ? 2
                      : 1) *
                    1000,
                )}
              </span>
            </div>
            <div class="">
              Tổng chi phí:
              <span class="ml-1 rounded-md bg-green-500 px-2 py-1 font-semibold dark:bg-green-300">
                {convertToVND(
                  sportItem.value.totalPrice *
                    (sportItem.value.value === "badminton" &&
                    formData.extraMember
                      ? 2
                      : 1) *
                    1000,
                )}
              </span>
            </div>
          </div>
        )}

        <button
          class="style-btn mx-auto"
          onClick$={$(async () => {
            const { validated, errors } = await validateForm$();
            if (!validated) {
              Object.assign(formErrors, errors);
              return;
            }

            showModal.value = true;

            paymentInfo.content = generatePaymentInfo(
              formData.selectedSport,
              formData,
            );

            if (sportItem.value) {
              if (sportItem.value.value === "badminton")
                paymentInfo.price =
                  sportItem.value.totalPrice * (formData.extraMember ? 2 : 1) ||
                  0;
              else paymentInfo.price = sportItem.value.totalPrice;
            }
          })}
        >
          Xác nhận
        </button>

        <Modal.Root
          bind:show={showModal}
          class={classnames(
            "container mx-auto hidden",
            showModal.value && "!flex",
          )}
        >
          <Modal.Panel class="h-screen max-h-[calc(100vh-120px)] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-md border-2 border-violet-400 bg-gray-900 p-6 text-gray-100 shadow-xl dark:border-violet-600 dark:bg-gray-50 dark:text-gray-800 sm:max-h-[calc(100vh-200px)]">
            <Modal.Title class="flex items-center justify-between gap-2 bg-gray-900 text-xl font-semibold leading-tight tracking-wide dark:bg-gray-50">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="h-6 w-6 shrink-0 fill-current text-sab-color-3 dark:text-sab-color-3-dark"
                >
                  <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z"></path>
                  <rect width="32" height="136" x="240" y="112"></rect>
                  <rect width="32" height="32" x="240" y="280"></rect>
                </svg>
                Thông tin thanh toán
              </div>
              <Modal.Close class="flexcenter rounded-full p-2">
                <svg
                  class="text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12z"
                  />
                </svg>
              </Modal.Close>
            </Modal.Title>

            <div class="grid grid-cols-1 gap-4">
              <p class="mt-4 font-semibold text-gray-400 dark:text-gray-600">
                Ngân hàng thụ hưởng
              </p>
              <span class="style-p">{BANK_ACCOUNT.bank.toUpperCase()}</span>

              {/* <p class="font-semibold text-gray-400 dark:text-gray-600">STK</p>
              <PWithCopy content={BANK_ACCOUNT.number} /> */}

              <p class="flex-1 font-semibold text-gray-400 dark:text-gray-600">
                Nội dung chuyển khoản
              </p>
              <PWithCopy content={paymentInfo.content} />

              <p class="flex-1 font-semibold text-gray-400 dark:text-gray-600">
                Lưu ý
              </p>
              <span class="style-p">
                Để đơn đăng ký được ghi nhận hợp lệ, bạn vui lòng hoàn tất gửi
                thông tin tại Google Forms.
              </span>
            </div>

            <div class="mt-4 flex flex-col justify-end gap-3 sm:flex-row">
              {showModal.value && (
                <QrPayment
                  mode="compact2"
                  amount={paymentInfo.price * 1000}
                  desc={paymentInfo.content}
                  bankAccount={BANK_ACCOUNT}
                />
              )}
            </div>
          </Modal.Panel>
        </Modal.Root>
      </div>
    </div>
  );
});

export const head: DocumentHead = getHeadInfo("Payment");
