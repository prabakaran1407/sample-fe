/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tab, Tabs, TabProps, TabsProps, Box, styled } from "@mui/material";
import { FC } from "react";
import { COLORS } from "../../../utils/globals.ts";

interface TabItemProps extends TabProps {}
const TabItem = (props: TabItemProps) => {
  return <Tab {...props} />;
};

type TtabMenus = {
  label?: string;
};
interface TabMenuProps extends TabsProps {
  tabMenus: TtabMenus[];
  selectedTab: (value: void | any, valueTwo: any) => void | any;
  boxWidth?: string;
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export const TabMenus: FC<TabMenuProps> = ({
  tabMenus,
  selectedTab,
  value,
  boxWidth = "100%",
  ...rest
}: TabMenuProps) => {
  return (
    <Box sx={{ width: boxWidth, borderBottom: 1, borderColor: "divider" }}>
      <Tabs onChange={selectedTab} value={value} {...rest}>
        {tabMenus.map((menu: Record<string, any>, index: number) => (
          <TabItem
            label={menu?.label || "Unknown"}
            id={`simple-tab-${index}`}
            aria-controls={`simple-tabpanel-${index}`}
            value={index}
            icon={menu?.icon || ""}
            iconPosition="start"
            disableRipple
            wrapped
            sx={{ minHeight: "30px", textTransform: "none", fontSize: "15px" }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

const PillStyledTabs = styled((props: StyledTabsProps) => <Tabs {...props} />)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const PillStyledTab = styled((props: StyledTabProps | any) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: COLORS.primary,
  border: `1px solid ${COLORS.primary}`,
  borderRadius: 5,
  height: 38,
  "&.Mui-selected": {
    color: "#fff",
    background: COLORS.primary,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

export const PillTab: FC<TabMenuProps> = ({
  tabMenus,
  selectedTab,
  value,
  boxWidth = "100%",
  ...rest
}: TabMenuProps) => {
  return (
    <Box sx={{ width: boxWidth }}>
      <PillStyledTabs onChange={selectedTab} value={value} {...rest}>
        {tabMenus.map((menu: Record<string, any>, index: number) => (
          <PillStyledTab
            label={menu?.label || "Unknown"}
            aria-controls={`simple-tabpanel-${index}`}
            icon={menu?.icon || ""}
            iconPosition="start"
            sx={{ minHeight: "30px", textTransform: "none", fontSize: "15px" }}
          />
        ))}
      </PillStyledTabs>
    </Box>
  );
};
