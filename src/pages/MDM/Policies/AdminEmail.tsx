/** @format */

import { Textfield } from "../../../components/MUI/mui.index";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  data: any;
  setData: any;
  setActive: any;
  editData: any;
};

const AdminEmail: React.FC<Props> = ({
  data,
  setData,
  setActive,
  editData,
}) => {
  const [email, setEmail] = useState("");
  const [_emailError, setEmailError] = useState("");
  const [_isEmailValid, setIsEmailValid] = useState(true);

  const onClear = () => {
    setData("");
  };

  const handleEmail = () => {
    let Arr = [];
    Arr.push(email);
    setData({ ...data, ["frpAdminEmails"]: Arr });
  };

  async function emailValidation(e: any) {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(e) === false) {
      setIsEmailValid(false);
      setEmailError("Mail ID is Invalid");
    } else {
      setIsEmailValid(true);
    }
  }

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
        Admin Email
      </Typography>

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
            Email
            <Box component="span" sx={{ color: "red" }}>
              *
            </Box>
          </Typography>

          <Textfield
            type="text"
            value={editData?.frpAdminEmails?.[0]}
            onChange={(e) => {
              setEmail(e.target.value);
              emailValidation(e.target.value);
            }}
            sx={{ width: "100%" }}
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
              onClick={() => {
                handleEmail();
                setTimeout(() => {
                  setActive("createPolicy");
                }, 500);
              }}
              variant="contained"
              color="primary"
              // sx={{ width: '30%' }}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={(_e) => onClear()}
              // sx={{ width: '0%' }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AdminEmail;
