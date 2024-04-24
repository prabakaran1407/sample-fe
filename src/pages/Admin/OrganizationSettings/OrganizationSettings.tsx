import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import { useAppSelector } from "../../../hooks/index.ts";

import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  ContainerBoxV2,
  ButtonV1,
  InfoIcon,
} from "../../../components/MUI/mui.index.tsx";
import { CustomDivier } from "../../../components/APP/app.index.tsx";

// **************  Icons

import { ORG_SETTINGS } from "../../../data/AppConst.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrganizationService from "../../../services/super-admin/organization/organization.service.ts";

export default function OrganizationSettings(_props: any) {
  //   const location = useLocation();
  const AUTH = useAppSelector((state) => state?.auth);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    is_multi_attendance: null,
  });

  const [_userData, _setUserData] = useState<Record<string, any>[]>([]);
  const [_loading, setLoading] = useState(false);

  const handleSubmit = async (_value: Record<string, any>) => {
    try {
      const payload = {
        ...formik?.values,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      setLoading(true);
      await OrganizationService.createOrUpdateOrgSettings(
        AUTH?.data?.userRecord?.organization_id,
        payload
      );
      await getOrgSetting();
      // navigate(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName);
      setLoading(false);
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    validationSchema: null,
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });
  const getOrgSetting = async () => {
    try {
      let res_data = await OrganizationService.getOneOrgSetting(
        AUTH?.data?.userRecord?.organization_id
      );
      if (res_data?.data?.status) {
        res_data = res_data?.data?.response?.data;
        setFormValue({
          ...formvalue,
          is_multi_attendance: res_data?.is_multi_attendance,
        });
      }
    } catch (error) {
      console.log("error >>>>>", error);
    }
  };
  useEffect(() => {
    getOrgSetting();
  }, []);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Organization settings(Master)
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <ContainerBoxV2>
        <form onSubmit={formik.handleSubmit}>
          {
            <Grid container xs={12} spacing={1}>
              <Grid container item xs={12}>
                <Accordion
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {ORG_SETTINGS?.ATTENDANCE?.title}
                    </Typography>
                  </AccordionSummary>
                  <Divider />

                  <AccordionDetails>
                    <Grid container xs={12}>
                      {ORG_SETTINGS?.ATTENDANCE?.fields?.map((menu: any) => (
                        <>
                          <Grid container item xs={12 / 2}>
                            <Grid item xs={4}>
                              <div>
                                <label>{menu?.label}</label>
                              </div>
                            </Grid>
                            <Grid item xs={8}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <label className="switch">
                                  <input
                                    name={menu?.name}
                                    type="checkbox"
                                    checked={
                                      formik?.values[menu?.name] || false
                                    }
                                    onChange={(event: any) => {
                                      formik.setFieldValue(
                                        menu?.name,
                                        event?.target?.checked
                                      );
                                    }}
                                  />
                                  <span className="slider round"></span>
                                </label>
                                {menu?.info && <InfoIcon info={menu?.info} />}
                              </div>
                            </Grid>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid container item xs={12}>
                <Accordion
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {ORG_SETTINGS?.INVENTORY?.title}
                    </Typography>
                  </AccordionSummary>
                  <Divider />

                  <AccordionDetails>
                    <Grid container xs={12}>
                      {ORG_SETTINGS?.INVENTORY?.fields?.map((menu: any) => (
                        <>
                          <Grid container item xs={12 / 2}>
                            <Grid item xs={4}>
                              <div>
                                <label>{menu?.label}</label>
                              </div>
                            </Grid>
                            <Grid item xs={8}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <label className="switch">
                                  <input
                                    name={menu?.name}
                                    type="checkbox"
                                    checked={
                                      formik?.values[menu?.name] || false
                                    }
                                    onChange={(event: any) => {
                                      formik.setFieldValue(
                                        menu?.name,
                                        event?.target?.checked
                                      );
                                    }}
                                  />
                                  <span className="slider round"></span>
                                </label>
                                {menu?.info && <InfoIcon info={menu?.info} />}
                              </div>
                            </Grid>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid container item xs={12} justifyContent={"end"}>
                <ButtonV1
                  type="submit"
                  disabled={formik?.isSubmitting && formik?.isValid}
                >
                  {" "}
                  Submit
                </ButtonV1>
              </Grid>
            </Grid>
          }
        </form>
      </ContainerBoxV2>
    </>
  );
}
