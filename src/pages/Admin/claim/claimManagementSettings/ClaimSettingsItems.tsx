/** @format */

import React from 'react';
import { ApprovalLayerSettings } from './ApprovalLayerSettings';
import { ClaimCategorySettings } from './ClaimCategorySettings';
import { WalletSettings } from './WalletSettings';
import { DepartmentSettings } from './DepartmentSettings';
import { SpendingLimit } from './SpendingLimit';
import { SplitSubCategoryClaimSettings } from './ClaimSplitSubCategorySettings';
import { TypeClaimSettings } from './Type';
import { ModeOfTransport } from './ModeOfTransport';
import { City } from './CitySelection';
import { AmountAllocation } from './AmountAllocation';
import { SubCategoryClaimSettings } from './ClaimSubCategorySettings';

type Props = {
  userChoice: string;
};

const ClaimSettingsItems: React.FC<Props> = ({ userChoice }) => {
  switch (userChoice) {
    case 'Wallet Settings':
      return <WalletSettings />;
    case 'Department':
      return <DepartmentSettings />;
    case 'Category':
      return <ClaimCategorySettings />;
    case 'Sub Category':
      return <SubCategoryClaimSettings />;
    case 'User Spending Limit':
      return <SpendingLimit />;
    case 'Approval Layer':
      return <ApprovalLayerSettings />;
    case 'Split Sub Category':
      return <SplitSubCategoryClaimSettings />;
    case 'Claim Type':
      return <TypeClaimSettings />;
    case 'Mode Of Transport':
      return <ModeOfTransport />;
    // case "Grade":
    //   return <Grade />;
    case 'Grade Type':
      return <City />;
    case 'Amount Allocation':
      return <AmountAllocation />;
    default:
      return <h1>{userChoice}</h1>;
  }
};

export { ClaimSettingsItems };
