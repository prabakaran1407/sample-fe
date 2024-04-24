import { useState, useMemo } from "react";
import {
  ActionIconButton,
  ActionModal,
  ContainerBoxV2,
  // TabMenus,
  Textfield,
} from "../../../components/MUI/mui.index";
import Typography from "@mui/material/Typography";
import { Stack, Grid, Box, Button } from "@mui/material";
import table from "./table";
import report from "./report";
import { getTimeStamp } from "../../../utils/datetime.ts";
import { CustomDivier } from "../../../components/APP/app.index.tsx";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ACTION_ICON_TYPES } from "../../../../src/data/AppConst.ts";
import { COLORS } from "../../../../src/utils/globals.ts";

const VisitManagement = () => {
  // const [tabs, _setTab] = useState([
  // {
  //   label: 'Table',
  // },
  // {
  //   label: "Reports",
  // },
  // ]);
  const [filterOption, setFilterOption] = useState<Record<string, any>>({
    start: "",
    end: "",
    filterBy: null,
    fromDateTimeStamp: 0,
    toDateTimeStamp: 0,
  });
  const [tempFilters, setTempFilters] = useState({
    start: "",
    end: "",
  });

  const [activatedTab, _setActivatedTab] = useState<number>(0);
  const [openModel, setOpenModel] = useState(false);

  // const handleTabSelect = (_element: HTMLElement, selection: number) => {
  //   setActivatedTab(selection);
  // };

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return table;
      case 1:
        return report;
      default:
        return <></>;
    }
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );
  const handleClearFilters = () => {
    setTempFilters({ start: "", end: "" });
    setFilterOption({ start: "", end: "" });
  };
  const handleApplyFilters = () => {
    setFilterOption({ ...tempFilters });
    setOpenModel(false);
  };
  // const handleFilterChange = (field: any, value: any) => {
  //   console.log("Updating filterOptions:", { [field]: value });
  //   setFilterOption({
  //     ...filterOption,
  //     [field]: value,
  //   });
  // };

  return (
    <>
      <ContainerBoxV2 styles={{ zIndex: 999 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Visit Management
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
            {/* <Grid container spacing={2} justifyContent={"end"}>
              <Grid item xs={4}>
                <Textfield
                  fullWidth
                  label="From Date"
                  type="date"
                  name="fromDate"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    setFilterOption({
                      ...filterOption,
                      start: getTimeStamp(selectedDate),
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <Textfield
                  fullWidth
                  label="To Date"
                  type="date"
                  name="toDate"
                  onChange={(e: any) => {
                    const selectedDate: any = new Date(e.target.value);
                    selectedDate.setHours(23, 59, 59, 999).toString();
                    setFilterOption({
                      ...filterOption,
                      end: getTimeStamp(selectedDate),
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid> */}
            <ActionIconButton
              actionType={ACTION_ICON_TYPES[11]}
              sx={{
                background: COLORS.primary,
                borderRadius: 1,
                width: 38,
                height: 38,
                "&:hover": {
                  background: COLORS.secondary,
                },
              }}
              onClick={() => {
                setOpenModel(true);
              }}
              title="Filter"
            >
              <FilterListIcon sx={{ color: "white", fontSize: 16 }} />
            </ActionIconButton>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <Grid item xs={12}>
        <SelectedPageContent filterOption={filterOption} />
      </Grid>
      <ActionModal
        open={openModel}
        onClose={() => {
          setOpenModel(false);
        }}
        title="Advance filter | select atleast one filter"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box style={{ width: "100%" }}>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6} sx={{ height: "30px" }}>
                <Textfield
                  fullWidth
                  label="From Date"
                  type="date"
                  name="fromDate"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    setFilterOption({
                      ...filterOption,
                      start: getTimeStamp(selectedDate),
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <Textfield
                  fullWidth
                  label="To Date"
                  type="date"
                  name="toDate"
                  onChange={(e: any) => {
                    const selectedDate: any = new Date(e.target.value);
                    selectedDate.setHours(23, 59, 59, 999).toString();
                    setFilterOption({
                      ...filterOption,
                      end: getTimeStamp(selectedDate),
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Box
                style={{ width: "100%", marginTop: "20px", marginLeft: "35px" }}
              >
                <Grid container xs={12} spacing={4}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setOpenModel(false);
                        handleClearFilters();
                        setFilterOption({
                          fromDate: "",
                          toDate: "",
                          companyName: "",
                          name: "",
                          designation: "",
                          phoneNumber: "",
                          email: "",
                        });
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setOpenModel(false);
                        handleApplyFilters();
                      }}
                    >
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
      </ActionModal>
    </>
  );
};

export default VisitManagement;
