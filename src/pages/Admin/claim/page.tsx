/** @format */

import { useState } from "react";

import { ProductSelectCards } from "./ProductSelectCards";
import Grid from "@mui/material/Grid";

import { ClaimSettingsItems } from "./claimManagementSettings/ClaimSettingsItems";
import { Stack, Typography } from "@mui/material";
import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import DepartmentIcon from "../../../assets/svg/department.svg";

const cardData = [
  {
    title: "Claim Type",
    icon: DepartmentIcon,
    backgroundColor: "#F8F5FF",
    fontColor: "black",
  },
  {
    title: "Mode Of Transport",
    icon: DepartmentIcon,
    backgroundColor: "#FFF5F8",
    fontColor: "black",
  },
  {
    title: "Split Sub Category",
    icon: DepartmentIcon,
    backgroundColor: "#EBFFF6",
    fontColor: "black",
  },

  {
    title: "Grade Type",
    icon: DepartmentIcon,
    backgroundColor: "#FFF8DD",
    fontColor: "black",
  },
  {
    title: "Amount Allocation",
    icon: DepartmentIcon,
    backgroundColor: "#F8F5FF",
    fontColor: "black",
  },
];

export function ClaimSettings() {
  const [choice, setChoice] = useState(cardData[0].title);
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Claim Management Settings
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <div className="card d-flex w-100 mt-0 p-5 justify-content-center">
          <Grid container spacing={1}>
            {cardData.map(
              ({ title, icon, backgroundColor, fontColor }, index) => {
                return (
                  <Grid item sm={2.4} md={2.4}>
                    <div
                      key={index}
                      className={
                        title === choice ? "shadow rounded" : "rounded"
                      }
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(_e) => setChoice(title)}
                    >
                      <ProductSelectCards
                        title=""
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
        </div>
      </ContainerBoxV2>

      <ClaimSettingsItems userChoice={choice} />
    </>
  );
}
