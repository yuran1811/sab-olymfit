import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { Form, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Modal } from "@qwik-ui/headless";

import PWithCopy from "~/components/shared/p-with-copy";
import QrPayment from "~/components/shared/qr-payment";

import { BANK_ACCOUNT, SPORT_LIST, type SportEnum } from "~/constants";
import {
  classnames,
  generatePaymentInfo,
  getHeadInfo,
  toNonAccentVietnamese,
} from "~/utils";

export const useFormLoader = routeLoader$(
  () =>
    ({
      teamName: "",
      name: "",
      mssv: 23127001,
      name2: "",
      mssv2: 23127001,
      selectedSport: "soccer",
      extraMember: false,
    }) as {
      teamName: string;
      name: string;
      mssv: number;
      name2: string;
      mssv2: number;
      selectedSport: SportEnum;
      extraMember: boolean;
    },
);

export default component$(() => {
  const formLoader = useFormLoader();

  const formData = useStore(formLoader.value);
  const formErrors = useStore({
    teamName: "",
    name: "",
    mssv: "",
    name2: "",
    mssv2: "",
  });

  const addMember = useSignal(false);
  const showModal = useSignal(false);
  const paymentInfo = useSignal("");

  const validateForm$ = $(() => {
    const errors = {
      teamName: "",
      name: "",
      mssv: "",
      name2: "",
      mssv2: "",
    };

    if (
      formData.selectedSport === "soccer" &&
      formData.teamName.trim() === ""
    ) {
      errors.teamName = "Team name is required";
    }

    formData.teamName = toNonAccentVietnamese(formData.teamName || "");
    formData.name = toNonAccentVietnamese(formData.name || "");
    formData.name2 = toNonAccentVietnamese(formData.name2 || "");

    errors.name = formData.name.trim() === "" ? "Name is required" : "";
    errors.name2 =
      formData.extraMember && formData.name2.trim() === ""
        ? "Name is required"
        : "";

    errors.mssv =
      isNaN(formData.mssv) || String(formData.mssv).length !== 8
        ? "MSSV must be a valid number at length of 8"
        : "";
    errors.mssv2 =
      formData.extraMember &&
      (isNaN(formData.mssv2) || String(formData.mssv2).length !== 8)
        ? "MSSV must be a valid number at length of 8"
        : " ";

    return {
      validated: Object.values(errors).every((_) => !_.trim().length),
      errors,
    };
  });

  const clearFormErrs$ = $(() => {
    Object.keys(formErrors).forEach((key: string) => {
      formErrors[key as keyof typeof formErrors] = "";
    });
  });

  return (
    <div class="container mx-auto grid grid-cols-1 gap-6 p-6">
      <Form class="container mx-auto grid max-w-xs grid-cols-1 gap-6">
        <label class="space-y-4">
          <p class="font-semibold">Chọn môn thể thao bạn muốn đăng ký</p>
          <select
            name="selectedSport"
            class="style-input"
            onChange$={(event) => {
              formData.selectedSport = (event.target as HTMLSelectElement)
                .value as SportEnum;
              clearFormErrs$();
            }}
          >
            {SPORT_LIST.map((sport, idx) => (
              <option value={sport.value} key={idx}>
                {sport.label}
              </option>
            ))}
          </select>
        </label>

        <label
          class={classnames(
            "space-y-4",
            formData.selectedSport !== "soccer" && "hidden",
          )}
        >
          <p class="font-semibold">Tên đội</p>
          <input
            class="style-input"
            name="teamName"
            type="text"
            placeholder="VD: FFF"
            value={formData.teamName}
            onInput$={(e) => {
              formData.teamName = (e.target as HTMLInputElement).value;
              clearFormErrs$();
            }}
          />
          {!!formErrors && !!formErrors.teamName.length && (
            <p class="form-err">{formErrors.teamName}</p>
          )}
        </label>
        <label class="space-y-4">
          <p class="font-semibold">Họ và tên</p>
          <input
            required
            class="style-input"
            name="name"
            type="text"
            placeholder="VD: Nguyen Van A"
            value={formData.name}
            onInput$={(e) => {
              formData.name = (e.target as HTMLInputElement).value;
              clearFormErrs$();
            }}
          />
          {!!formErrors && !!formErrors.name.length && (
            <p class="form-err">{formErrors.name}</p>
          )}
        </label>
        <label class="space-y-4">
          <p class="font-semibold">MSSV</p>
          <input
            required
            class="style-input"
            name="mssv"
            type="number"
            min={19000000}
            max={23999999}
            value={formData.mssv}
            onInput$={(e) => {
              formData.mssv = +(e.target as HTMLInputElement).value;
              clearFormErrs$();
            }}
          />
          {!!formErrors && !!formErrors.mssv.length && (
            <p class="form-err">{formErrors.mssv}</p>
          )}
        </label>

        <button
          class={classnames(
            "style-btn mx-auto",
            formData.selectedSport !== "badminton" && "hidden",
          )}
          type="button"
          onClick$={() =>
            (formData.extraMember = addMember.value = !addMember.value)
          }
        >
          {!addMember.value ? "Thêm đồng đội" : "Xóa đồng đội"}
        </button>
        <label
          class={classnames(
            "space-y-4",
            formData.selectedSport !== "badminton" && "hidden",
            !addMember.value && "hidden",
          )}
        >
          <p class="font-semibold">Họ và tên</p>
          <input
            class="style-input"
            name="name2"
            type="text"
            placeholder="VD: Nguyen Van B"
            value={formData.name2}
            onInput$={(e) => {
              formData.name2 = (e.target as HTMLInputElement).value;
              clearFormErrs$();
            }}
          />
          {!!formErrors && !!formErrors.name2.length && (
            <p class="form-err">{formErrors.name2}</p>
          )}
        </label>
        <label
          class={classnames(
            "space-y-4",
            formData.selectedSport !== "badminton" && "hidden",
            !addMember.value && "hidden",
          )}
        >
          <p class="font-semibold">MSSV</p>
          <input
            class="style-input"
            name="mssv2"
            type="number"
            min={19000000}
            max={23999999}
            value={formData.mssv2}
            onInput$={(e) => {
              formData.mssv2 = +(e.target as HTMLInputElement).value;
              clearFormErrs$();
            }}
          />
          {!!formErrors && !!formErrors.mssv2.length && (
            <p class="form-err">{formErrors.mssv2}</p>
          )}
        </label>
      </Form>

      <div class="container mx-auto grid max-w-xs grid-cols-1 gap-6">
        <button
          class="style-btn mx-auto"
          onClick$={$(async () => {
            const { validated, errors } = await validateForm$();
            if (!validated) {
              Object.assign(formErrors, errors);
              return;
            }

            showModal.value = true;
            paymentInfo.value = generatePaymentInfo(
              formData.selectedSport,
              formData,
            );
          })}
        >
          Xác nhận
        </button>

        <Modal.Root
          bind:show={showModal}
          class={classnames(
            "container mx-auto hidden flex-wrap items-start justify-center gap-6 p-3",
            showModal.value && "!flex",
          )}
        >
          <Modal.Panel class=" max-h-[calc(100vh-300px)] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-md border-2 border-violet-400 bg-gray-900 p-6 text-gray-100 shadow-xl dark:border-violet-600 dark:bg-gray-50 dark:text-gray-800">
            <Modal.Title class="flex items-center justify-between gap-2 bg-gray-900 text-xl font-semibold leading-tight tracking-wide dark:bg-gray-50">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="h-6 w-6 shrink-0 fill-current text-violet-400 dark:text-violet-600"
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
              <p class="mt-4 flex-1 font-semibold text-gray-400 dark:text-gray-600">
                Nội dung chuyển khoản
              </p>
              <PWithCopy content={paymentInfo.value} />

              <p class="flex-1 font-semibold text-gray-400 dark:text-gray-600">
                STK
              </p>
              <PWithCopy content={BANK_ACCOUNT.number} />
            </div>

            <div class="mt-4 flex flex-col justify-end gap-3 sm:flex-row">
              {showModal.value && (
                <QrPayment
                  amount={
                    (SPORT_LIST.find((_) => _.value === formData.selectedSport)
                      ?.price || 20) * 1000
                  }
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
