/** @format */

import BackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import Policies from '.';

import { policesI, PoliciesValues } from './interfaces/interface';
import './policies.css';
// import Restrictions from "./Restrictions";
import { CreatePolicyData } from '../../../services/admin/mdm/policies.service';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';

import VerticalTabs from './tab';

type Props = {
  editData: any;
};

// const useStyles: any = makeStyles((theme: any) => ({
//   container: {
//     marginBottom: 5,
//     paddingBottom: 3,
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     display: 'flex',
//   },
//   button: {
//     width: 5,
//     height: 10,
//     background: 'grey',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

const PolicySettings: React.FC<Props> = ({ editData }) => {
  const [_active, setActive] = useState('application');

  const [data, setData] = useState<policesI>(
    editData === '' ? PoliciesValues : editData
  );

  const [show, setShow] = useState(false);

  const onInputChange = (e: any) => {
    console.log(e.target.name, e.target.checked);
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const onStatusReportingChange = (e: any) => {
    console.log(e.target.name, e.target.checked);
    if (e.target.name === 'applicationReportsEnabled' && !e.target.checked) {
      setData({
        ...data,
        statusReportingSettings: {
          ...data?.statusReportingSettings,
          [e.target.name]: e.target.checked,
          applicationReportingSettings: {
            ...data.statusReportingSettings?.applicationReportingSettings,
            ['includeRemovedApps']: false,
          },
        },
      });
    } else {
      setData({
        ...data,
        statusReportingSettings: {
          ...data?.statusReportingSettings,
          [e.target.name]: e.target.checked,
        },
      });
    }
  };

  const onApplicationReportingChange = (e: any) => {
    console.log(e.target.name, e.target.checked);
    setData({
      ...data,
      statusReportingSettings: {
        ...data.statusReportingSettings,
        applicationReportingSettings: {
          ...data?.statusReportingSettings?.applicationReportingSettings,
          ['includeRemovedApps']: e.target.checked,
        },
      },
    });
    // if (!data?.statusReportingSettings?.applicationReportsEnabled) {
    //   setData({
    //     ...data,
    //     statusReportingSettings: {
    //       ...data.statusReportingSettings,
    //       applicationReportingSettings: {
    //         ...data?.statusReportingSettings?.applicationReportingSettings,
    //         ["includeRemovedApps"]: false,
    //       },
    //     },
    //   });
    // }
  };

  const onAlwaysOnVpnPackageChange = (e: any) => {
    console.log(e.target.name, e.target.checked);
    setData({
      ...data,
      alwaysOnVpnPackage: {
        ...data.alwaysOnVpnPackage,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const CreateNewPolicy = async (data: any) => {
    await CreatePolicyData(data);
    setShow(true);
  };

  const handleFalse = () => {
    setShow(true);
    setData(PoliciesValues);
  };

  return (
    <div>
      {show ? (
        <Policies />
      ) : (
        <div style={{ maxHeight: 'auto', width: '100%' }}>
          <div
            style={{
              padding: 15,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 2,
              position: 'fixed',
              zIndex: 10,
              width: '77%',
              backgroundColor: '#fff',
              marginLeft: '1%',
            }}>
            <IconButton aria-label='delete' size='small' onClick={handleFalse}>
              <BackIcon fontSize='inherit' />
            </IconButton>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Policy Settings
            </Typography>
          </div>
          {/* <ContainerBoxV2>
            {" "}
            <Grid
              spacing={2}
              container
              direction="row"
              justifyContent="flex-start"
              sx={{ mt: 4 }}
            >
              <Grid item xs={2}>
                <Tabs
                  value={active}
                  textColor="primary"
                  indicatorColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  orientation="vertical"
                  sx={{
                    "&& .MuiTab-root": {
                      alignItems: "baseline",
                    },
                    position: "fixed",
                    borderRight: "1px solid #E5E8Eb",
                  }}
                >
                  <Tab
                    label="Admin Email"
                    value="email"
                    onClick={() => setActive("email")}
                    style={{
                      color: active === "email" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Application"
                    value="application"
                    onClick={() => setActive("application")}
                    style={{
                      color: active === "application" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Passcode"
                    value="passcode"
                    onClick={() => setActive("passcode")}
                    style={{
                      color: active === "passcode" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Restrictions"
                    value="restrictions"
                    onClick={() => setActive("restrictions")}
                    style={{
                      color: active === "restrictions" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Key Guard"
                    value="keyGuardDisabledFeatures"
                    onClick={() => setActive("keyGuardDisabledFeatures")}
                    style={{
                      color:
                        active === "keyGuardDisabledFeatures" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Cross Profile"
                    value="CrossProfilePolicies"
                    onClick={() => setActive("CrossProfilePolicies")}
                    style={{
                      color: active === "CrossProfilePolicies" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Device Radio"
                    value="deviceradiostate"
                    onClick={() => setActive("deviceradiostate")}
                    style={{
                      color: active === "deviceradiostate" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label="Policy Rule"
                    value="PolicyEnforcementRule"
                    onClick={() => setActive("PolicyEnforcementRule")}
                    style={{
                      color:
                        active === "PolicyEnforcementRule" ? "#40549C" : "",
                    }}
                  />
                  <Tab
                    label={editData ? "Update Policy" : "Create Policy"}
                    value="createPolicy"
                    onClick={() => setActive("createPolicy")}
                    style={{
                      color: active === "createPolicy" ? "#40549C" : "",
                    }}
                  />
                </Tabs>
              </Grid>
              <Grid item xs={10}>
                {active === "createPolicy" ? (
                  <CreatePolicy
                    data={data}
                    setData={setData}
                    CreateNewPolicy={CreateNewPolicy}
                    editData={editData}
                    setShow={setShow}
                  />
                ) : (
                  ""
                )}
                {active === "email" ? (
                  <Email
                    data={data}
                    setData={setData}
                    setActive={setActive}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "restrictions" ? (
                  <Restrictions
                    onInputChange={onInputChange}
                    onStatusReportingChange={onStatusReportingChange}
                    onApplicationReportingChange={onApplicationReportingChange}
                    onAlwaysOnVpnPackageChange={onAlwaysOnVpnPackageChange}
                    data={data}
                    setData={setData}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "application" ? (
                  <Application
                    applicationData={data}
                    applicationSetData={setData}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "keyGuardDisabledFeatures" ? (
                  <Key_Guard
                    data={data}
                    setData={setData}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "CrossProfilePolicies" ? (
                  <Cross_Profile
                    data={data}
                    setData={setData}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "deviceradiostate" ? (
                  <Device_Radio
                    data={data}
                    setData={setData}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "PolicyEnforcementRule" ? (
                  <PolicyEnforcementRule
                    data={data}
                    setData={setData}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
                {active === "passcode" ? (
                  <Passcode
                    data={data}
                    setData={setData}
                    setActive={setActive}
                    editData={editData}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </ContainerBoxV2> */}
          <div style={{ paddingTop: 50 }}>
            <VerticalTabs
              data={data}
              setData={setData}
              setShow={setShow}
              CreateNewPolicy={CreateNewPolicy}
              editData={editData}
              setActive={setActive}
              onInputChange={onInputChange}
              onApplicationReportingChange={onApplicationReportingChange}
              onStatusReportingChange={onStatusReportingChange}
              onAlwaysOnVpnPackageChange={onAlwaysOnVpnPackageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicySettings;
