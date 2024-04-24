/** @format */

import { useEffect, useState } from "react";
import * as _ from "lodash";
import Loader from "react-spinners/BarLoader";
import { getPolicies } from "../../../services/admin/mdm/policies.service";
import { getDevices } from "../../../services/admin/mdm/enrollment.service";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import { useAppSelector } from "../../../../src/hooks";

const DeviceEnrollment = ({}) => {
  const [tableData, setTableData] = useState<any>([]);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAppSelector((state) => state.auth);
  const org_data = auth?.data?.userRecord?.organizationData;

  async function getPoliciesList() {
    await getPolicies(org_data?.enterprise_id).then((res: any) => {
      console.log(res, "sfdghjzfdxgchvjbk");
      console.log(res.data.policies, "sfdghjzfdxgchvjbk");

      // setTableData(res?.data?.policies);
      setTableData(_.get(res, "data.policies", []));
    });
  }

  const Data =
    tableData !== 0 &&
    tableData?.map((item: any) => {
      return item.name.split("/").slice(-1);
    });

  const generateToken = async () => {
    setLoading(true);
    if (value !== "") {
      await getDevices(value, org_data?.enterprise_id).then((res) => {
        console.log(res.data.link, "sugchxjskx");
        setImage(res?.data?.link);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getPoliciesList();
  }, []);

  console.log(tableData, "scghvxgc");

  return (
    // <>
    //   <div className='col-md-12'>
    //     <div className='row'>
    //       <div className='col-md-6'>
    //         <div>
    //           <Autocomplete
    //             disablePortal
    //             id='combo-box-demo'
    //             defaultValue={Data}
    //             options={Data}
    //             sx={{ width: 300, background: '#FFFFFF' }}
    //             renderInput={(params) => (
    //               <TextField {...params} label='Policy name' size='small' />
    //             )}
    //             onChange={(e, value) => {
    //               setValue(value);
    //             }}
    //           />
    //         </div>
    //       </div>
    //       <div className='col-md-6'>
    //         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //           <button
    //             style={{ width: '180px' }}
    //             className='btn btn-sm btn-danger fw-bolder'
    //             onClick={() => generateToken()}
    //           >
    //             Generate Token
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='col-md-12 d-flex justify-content-center'>
    //     <h3>QR Image Shows Here</h3>
    //   </div>
    //   <div
    //     className='col-md-12 d-flex justify-content-center'
    //     style={{ marginTop: '50px' }}
    //   >
    //     {loading ? (
    //       <Loader />
    //     ) : (
    //       <img src={image} alt='' height='400px' className='' />
    //     )}
    //   </div>
    // </>
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}>
      <Grid>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Device Enrollment
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={Data}
                options={Data}
                sx={{ width: 300, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField {...params} label="Policy name" size="small" />
                )}
                onChange={(_e, value) => {
                  setValue(value);
                }}
              />
            </Grid>
            <Grid
              item
              md={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={generateToken}
                style={{ width: "180px", fontWeight: "bold" }}
              >
                Generate Token
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              QR Image Shows Here
            </Typography>

            {loading ? (
              <Loader />
            ) : (
              <Paper elevation={3}>
                <img src={image} alt="" height="300px" className="" />
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeviceEnrollment;
