import { type SportEnum } from "~/constants";

export interface FormDataType {
  teamName: string;
  name: string;
  mssv: number;
  name2: string;
  mssv2: number;
  selectedSport: SportEnum;
  extraMember: boolean;
}

export interface FormErrorsType {
  teamName: string;
  name: string;
  mssv: string;
  name2: string;
  mssv2: string;
}
