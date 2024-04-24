/** @format */

import { useLocation } from "react-router-dom";
import {
  FC,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ContainerBoxV2 } from "../../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../../components/APP/app.index";
import TimeAgo from "./timeago";

interface CommentObject {
  comment:
    | string
    | number
    | boolean
    | ReactPortal
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | null
    | undefined;
  updatedTime?: number;
}

const LeadManagement: FC<any> = () => {
  const location = useLocation();
  const { leadData } = location.state;

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const handleToggleMoreDetails = () => {
    setShowMoreDetails((prev) => !prev);
  };

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Lead Details
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        {/* Top Left Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  First Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{leadData.firstName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Last Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{leadData.lastName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Company Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{leadData.companyName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{leadData.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Designation:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{leadData.designation}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Phone Number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{leadData.phoneNumber}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {showMoreDetails && (
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Assignee:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData?.assignee?.firstName + " " +leadData?.assignee?.lastName ||"-"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Alternate Mobile Number:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.alternatePhonenumber || "-"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Website:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.website || "-"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Lead Source:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData?.leadSource?.leadSource}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Lead Status:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData?.leadStatus?.leadStatus}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Lead Priority:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {leadData?.leadPriority?.leadPriority}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Number of Employees:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.numEmployees}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Address:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.address}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Address line 1:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.addressLine1}</Typography>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    District
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.district}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    City
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.postalLocation}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    State:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.state}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Country:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.country?.name}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Zip Code:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.zipcode}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Description:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{leadData.description || "-"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleToggleMoreDetails}
              >
                Less
              </Typography>
            </Grid>
          </Grid>
        )}
        {!showMoreDetails && (
          <Typography
            variant="subtitle1"
            style={{ cursor: "pointer", color: "blue" }}
            onClick={handleToggleMoreDetails}
          >
            More
          </Typography>
        )}
        <CustomDivier />
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Remarks and Activities
        </Typography>
        {leadData.comments && leadData.comments.length > 0 ? (
          <ul style={{ fontWeight: "bold", color: "#949494" }}>
            <Grid style={{ padding: "5px", paddingLeft: "20px" }}>
              {leadData.comments.map(
                (
                  commentObject: CommentObject,
                  index: Key | null | undefined
                ) => (
                  <li key={index}>
                    <h4>
                      <span style={{ color: "#3d004d" }}>
                        {leadData.firstName}
                      </span>
                      &nbsp;&nbsp;
                      <span style={{ color: "#666666" }}>

                       updated comment:{" "}
                       </span>

                      <span style={{ color: "#404040" }}>
                        {commentObject.comment}
                      </span>
                      &nbsp;&nbsp;
                      {commentObject.updatedTime !== undefined && (
                        <TimeAgo updateTime={commentObject.updatedTime} />
                      )}
                    </h4>
                  </li>
                )
              )}
              {/* Adding lead status */}
              {leadData.leadStatus?.leadStatus !== undefined && (
                <li>
                  <h4>
                    <span style={{ color: "#3d004d" }}>
                      {leadData.firstName}
                    </span>
                    &nbsp;&nbsp;
                    <span style={{ color: "#666666" }}>

                     updated status:{" "}
                     </span>

                    <span style={{ color: "#404040" }}>
                      {leadData.leadStatus?.leadStatus}
                    </span>
                    &nbsp;&nbsp;

                    {leadData.updatedAt !== undefined && (
                      <TimeAgo updateTime={leadData.updatedAt} />
                    )}

                  </h4>
                </li>
              )}
            </Grid>
          </ul>
        ) : (
          <Typography>No comments available.</Typography>
        )}
      </Paper>
    </>
  );
};

export default LeadManagement;
