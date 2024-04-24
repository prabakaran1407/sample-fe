/** @format */

import { useState } from "react";
import { ProductSelectCards } from "../ProductSelectCards";
import Grid from "@mui/material/Grid";
import { ClaimSettingsItems } from "./ClaimSettingsItems";
import { Box } from "@mui/material";

const cardData = [
  {
    title: "Claim Type",
    icon: "/media/ui-icons/department.svg",
    backgroundColor: "#F8F5FF",
    fontColor: "black",
  },
  {
    title: "Mode Of Transport",
    icon: "/media/ui-icons/department.svg",
    backgroundColor: "#FFF5F8",
    fontColor: "black",
  },
  {
    title: "Split Sub Category",
    icon: "/media/ui-icons/department.svg",
    backgroundColor: "#EBFFF6",
    fontColor: "black",
  },

  {
    title: "Grade Type",
    icon: "/media/ui-icons/department.svg",
    backgroundColor: "#FFF8DD",
    fontColor: "black",
  },
  {
    title: "Amount Allocation",
    icon: "/media/ui-icons/department.svg",
    backgroundColor: "#F8F5FF",
    fontColor: "black",
  },
];

export function ClaimSettings() {
  const [choice, setChoice] = useState(cardData[0].title);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={1}>
          {cardData.map(
            ({ title, icon, backgroundColor, fontColor }, index) => {
              return (
                <Grid item sm={2.4} md={2.4}>
                  <div
                    key={index}
                    className={title === choice ? "shadow rounded" : "rounded"}
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
      </Box>

      <ClaimSettingsItems userChoice={choice} />
    </>
  );
}
