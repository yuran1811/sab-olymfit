import { $, component$, type Signal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";

import { SPORT_LIST, type SportEnum } from "~/constants";
import type { FormDataType, FormErrorsType } from "~/shared/types";
import { classnames } from "~/utils";

export default component$(
  ({
    addMember,
    formData,
    formErrors,
  }: {
    addMember: Signal<boolean>;
    formData: FormDataType;
    formErrors: FormErrorsType;
  }) => {
    const clearFormErrs$ = $(() => {
      Object.keys(formErrors).forEach((key: string) => {
        formErrors[key as keyof typeof formErrors] = "";
      });
    });

    return (
      <>
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
            <p class="font-semibold">Tên đội viết tắt (tối đa 3 ký tự)</p>
            <input
              class="style-input"
              name="teamName"
              type="text"
              placeholder="VD: FFF"
              value={formData.teamName}
              maxLength={3}
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
      </>
    );
  },
);
