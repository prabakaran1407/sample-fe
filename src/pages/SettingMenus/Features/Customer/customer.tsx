import { Typography, Grid } from "@mui/material";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";
import { useMemo, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CustomerDetails from "./Settings/CustomerDetail/CustomerDetails";
import BillingParty from "./Settings/BIllingParty/BillingParty";
import Group from "./Settings/Group/Group";

import UserCustomerBillingMappingSetting from "./Settings/Mapping/MappingSetting";
import { Store } from "lucide-react";
import { StoreSettings } from "./Settings/store";
// const cardData = [
//   {
//     title: 'Customer Details',
//     icon: DepartmentIcon,
//     backgroundColor: '#F8F5FF',
//     fontColor: 'black',
//   },
//   {
//     title: 'Billing Party',
//     icon: DepartmentIcon,
//     backgroundColor: '#FFF5F8',
//     fontColor: 'black',
//   },
// ];

function Customer() {
  const PROD_TAB_MENU = useMemo(() => {
    return [
      {
        label: "Customer details",
        icon: <PersonIcon fontSize="small" />,
      },
      {
        label: "Billing Party",
        icon: <PersonIcon fontSize="small" />,
      },
      {
        label: "Group",
        icon: <PersonIcon fontSize="small" />,
      },
      {
        label: "Mapping",
        icon: <PersonIcon fontSize="small" />,
      },
      {
        label: "Store",
        icon: (
          <Store
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        ),
      },
    ];
  }, []);
  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return CustomerDetails;
      case 1:
        return BillingParty;
      case 2:
        return Group;
      case 3:
        return UserCustomerBillingMappingSetting;
      case 4:
        return StoreSettings;
      default:
        return CustomerDetails;
    }
  };

  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };
  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );
  // const [choice, setChoice] = useState(cardData[0].title);
  // console.log('choice', choice);
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12} rowSpacing={3}>
          <Grid item xs={12} sx={{ borderBottomColor: "black" }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Customer Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TabMenus
              tabMenus={PROD_TAB_MENU}
              selectedTab={handleTabSelect}
              value={activatedTab}
              variant="scrollable"
              scrollButtons="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectedPageContent />
          </Grid>
        </Grid>
      </ContainerBoxV2>

      {/* <ContainerBoxV2>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Grid container spacing={1} direction='row'>
            {cardData.map(
              ({ title, icon, backgroundColor, fontColor }, index) => {
                return (
                  <Grid item sm={6} md={6}>
                    <div
                      key={index}
                      className={
                        title === choice ? 'shadow rounded' : 'rounded'
                      }
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={(_e) => setChoice(title)}>
                      <ProductSelectCards
                        title=''
                        height={110}
                        width={150}
                        icon={icon}
                        description={title}
                        color={backgroundColor}
                        fontColor={fontColor}
                      />
                    </div>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Paper>
        <CustomerSettingsItems userChoice={choice} />
      </ContainerBoxV2> */}
    </>
  );
}

export default Customer;
