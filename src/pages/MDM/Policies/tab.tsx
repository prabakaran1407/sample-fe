import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Email from "./AdminEmail";
import CreatePolicy from "./CreatePolicy";
import Restrictions from "./Restriction";
import { Application } from "./Application";
import Key_Guard from "./Key_Guard";
import Cross_Profile from "./Cross_Profile";
import Device_Radio from "./Device_Radio";
import PolicyEnforcementRule from "./Policy_Enforcement_Rule";
import Passcode from "./Passcode";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props?: any) {
  const {
    data,
    setData,
    setShow,
    CreateNewPolicy,
    editData,
    setActive,
    onInputChange,
    onApplicationReportingChange,
    onStatusReportingChange,
    onAlwaysOnVpnPackageChange,
  } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={
        {
          // flexGrow: 1,
          // bgcolor: "background.paper",
          // display: "flex",
        }
      }
    >
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          position: "fixed",
          zIndex: 100,
          backgroundColor: "white",
          width: "77%",
        }}
      >
        <Tab
          label={props?.editData ? "Update Policy" : "Create Policy"}
          {...a11yProps(1)}
        />
        <Tab label="Application" {...a11yProps(1)} />
        <Tab label="Restrictions" {...a11yProps(2)} />
        <Tab label="Passcode" {...a11yProps(3)} />
        <Tab label="Key Guard" {...a11yProps(4)} />
        <Tab label="Cross Profile" {...a11yProps(5)} />
        <Tab label="Device Radio" {...a11yProps(6)} />
        <Tab label="Policy Rule" {...a11yProps(7)} />
        <Tab label="Admin Email" {...a11yProps(8)} />
      </Tabs>
      <div style={{ paddingTop: 20 }}>
        <TabPanel value={value} index={0}>
          <CreatePolicy
            data={data}
            setData={setData}
            CreateNewPolicy={CreateNewPolicy}
            editData={editData}
            setShow={setShow}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Application
            applicationData={data}
            applicationSetData={setData}
            editData={editData}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Restrictions
            onInputChange={onInputChange}
            onStatusReportingChange={onStatusReportingChange}
            onApplicationReportingChange={onApplicationReportingChange}
            onAlwaysOnVpnPackageChange={onAlwaysOnVpnPackageChange}
            data={data}
            setData={setData}
            editData={editData}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Passcode
            data={data}
            setData={setData}
            setActive={setActive}
            editData={editData}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Key_Guard data={data} setData={setData} editData={editData} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Cross_Profile data={data} setData={setData} editData={editData} />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Device_Radio data={data} setData={setData} editData={editData} />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <PolicyEnforcementRule
            data={data}
            setData={setData}
            editData={editData}
          />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <Email
            data={data}
            setData={setData}
            setActive={setActive}
            editData={editData}
          />
        </TabPanel>
      </div>
    </Box>
  );
}
