/** @format */

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Textfield } from "../../../components/MUI/mui.index";
import { useAppSelector } from "../../../../src/hooks";

type Props = {
  data: any;
  setData: any;
  CreateNewPolicy: any;
  editData: any;
  setShow: any;
};

const createPolicy: React.FC<Props> = ({
  data,
  CreateNewPolicy,
  editData,
  setShow,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState(editData?.name?.split("/").slice(-1));
  const auth = useAppSelector((state) => state.auth);
  const org_data = auth?.data?.userRecord?.organizationData;

  const handlePost = async () => {
    let Obj: any = {};
    let Value = Object.keys(data);
    for (let index = 0; index < Value.length; index++) {
      const element = Value[index];
      if (data[element] !== null && data[element] !== undefined) {
        Obj[element] = data[element];
      }
    }
    const dataa = {
      policy_name: typeof name === "object" ? name[0] : name,
      enterprise_name: org_data?.enterprise_id,
      data: Obj,
    };
    delete dataa.data.name;
    // console.log(dataa);
    await CreateNewPolicy(dataa);
    setShow(true);
  };

  return (
    <div>
      <div>
        <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
          {editData ? "Update Policy" : "Create Policy"}
        </Typography>
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="body2">
            Policy Name
            <Box component="span" sx={{ color: "red" }}>
              *
            </Box>
          </Typography>

          <Textfield
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "100%" }}
            disabled={editData}
          />
        </Box>

        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => handlePost()}
              variant="contained"
              color="primary"
              // sx={{ width: '30%' }}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={(_e) => setShow(true)}
              // sx={{ width: '0%' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
      {/* <div>
        <div className='row mt-5'>
          <div className='col-md-4'>
            <div className='col-sm'>
              <label className='text-muted fw-bold text-muted d-block fs-7'>
                Policy Name
                <span className='text-danger'>*</span>
              </label>
              <input
                className='form-control form-control-sm'
                type='text'
                value={name}
                disabled={editData !== ''}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-4 mt-5 d-flex justify-content-end'>
            <button
              style={{ width: '180px' }}
              className='btn btn-sm btn-primary fw-bolder'
              onClick={() => handlePost()}
            >
              Save
            </button>
          </div>
          <div className='col-md-4 mt-5'>
            <button
              style={{ width: '180px' }}
              className='btn btn-sm btn-danger fw-bolder'
              onClick={(e) => setShow(true)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default createPolicy;
