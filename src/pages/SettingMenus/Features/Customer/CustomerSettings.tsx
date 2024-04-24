/** @format */

import React from 'react';
import BillingParty from './Settings/BIllingParty/BillingParty';
import CustomerDetails from './Settings/CustomerDetail/CustomerDetails';


type Props = {
  userChoice: string;
};

const CustomerSettingsItems: React.FC<Props> = ({ userChoice }) => {
  switch (userChoice) {
    case 'Billing Party':
      return <BillingParty />;
    case 'Customer Details':
      return <CustomerDetails />;
  
    default:
      return <h1>{userChoice}</h1>;
  }
};

export { CustomerSettingsItems };
