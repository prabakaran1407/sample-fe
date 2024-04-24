import { ReactNode } from "react";
import { AuthModel } from "./AuthModel";
import { UserAddressModel } from "./UserAddressModel";
import { UserCommunicationModel } from "./UserCommunicationModel";
import { UserEmailSettingsModel } from "./UserEmailSettingsModel";
import { UserSocialNetworksModel } from "./UserSocialNetworksModel";

export interface UserModel {
  mobile: ReactNode;
  firstName: ReactNode;
  name: ReactNode;
  avatar: string | undefined;
  data: any;
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: Array<number>;
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  timeZone?: string;
  website?: "https://keenthemes.com";
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  address?: UserAddressModel;
  socialNetworks?: UserSocialNetworksModel;
  token: string;
  role?:string;
  organization_id?:string;
  permission_list?: Array<string>
}
