import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";
import { useLocation } from "react-router-dom";
import {
  FC,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import TimeAgo from "../../crm/leadManagement/leadManagement.edit.view/timeago";

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

const Viewtask: FC<any> = () => {
  const location = useLocation();
  const { viewTask } = location.state;
  console.log("ViewTask", viewTask);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                View Task
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  Task Type
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  :
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ fontSize: 14 }}>
                  {viewTask?.taskType?.taskType}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  :
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ fontSize: 14 }}>
                  {viewTask?.taskDescription|| "-"}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  Assignee
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  :
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ fontSize: 14 }}>
                  {viewTask?.user?.fullname}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  :
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ fontSize: 14 }}>
                  {viewTask?.taskStatus?.taskStatus}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  Priority
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  :
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ fontSize: 14 }}>
                  {viewTask?.taskPriority?.priority}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  Date
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                  :
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography sx={{ fontSize: 14 }}>
                  {viewTask?.dueDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CustomDivier />
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Remarks and Activities
        </Typography>
        {viewTask.comments && viewTask.comments.length > 0 ? (
          <ul style={{ fontWeight: "bold", color: "#949494" }}>
            <Grid style={{ padding: "5px", paddingLeft: "20px" }}>
              {viewTask.comments.map(
                (
                  commentObject: CommentObject,
                  index: Key | null | undefined
                ) => (
                  <li key={index}>
                    <h4>
                      <span style={{ color: "#3d004d" }}>
                        {viewTask.user.firstName + " " + viewTask.user.lastName}
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
              {/* Adding Task status */}
              {viewTask.leadStatus?.leadStatus !== undefined && (
                <li>
                  <h4>
                    <span style={{ color: "#3d004d" }}>
                      {viewTask.user.firstName + " " + viewTask.user.lastName}
                    </span>
                    &nbsp;&nbsp;
                    <span style={{ color: "#666666" }}>updated status: </span>
                    <span style={{ color: "#404040" }}>
                      {viewTask.taskStatus?.taskStatus}
                    </span>
                    &nbsp;&nbsp;
                    {viewTask.updatedAt !== undefined && (
                      <TimeAgo updateTime={viewTask.updatedAt} />
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

export default Viewtask;
