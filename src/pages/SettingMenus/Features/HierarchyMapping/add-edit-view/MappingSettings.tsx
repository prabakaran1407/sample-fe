import { useState, useEffect, SyntheticEvent } from "react";

// ************ Component
import {
  Textfield,
  AutoComplete,
  ButtonV1,
} from "../../../../../components/MUI/mui.index";

import {
  Box,
  Grid,
  Chip,
  Checkbox,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";

// *********** formik
import { useFormik } from "formik";

// *********** Yup schema
import { hierarychyMappingSettings } from "../../../../../data/yup/settings/hierarchy.ts";

// ************** service
import SettingService from "../../../../../services/settings/settings.service.ts";
import HierarchyService from "../../../../../services/settings/hierarchy.service.ts";

// ******************* utils
import { uniqueArrayOfObj } from "../../../../../utils/getUnique.ts";

// ******** CONSTANT
import { ACTION_ICON_TYPES } from "../../../../../data/AppConst.ts";

interface TMappingSettingProps {
  selectedOption: Record<string, any>;
  CONSTANT_DATA: Record<string, any>;
  AUTH: Record<string, any>;
  onClose: any;
}

function MappingSetting({
  selectedOption,
  CONSTANT_DATA,
  AUTH,
}: TMappingSettingProps) {
  console.log("selectedOption >>>>>>>>>", selectedOption);
  console.log("AUTH >>>>>>>>>", AUTH);

  // ****************** State
  const [initialValue] = useState<Record<string, any>>({
    selectedDesignations: [],
  });

  const [designations, setDesignation] = useState<Record<string, any>[]>([]);
  const [addOrEdit, setAddOrEdit] = useState<string>(ACTION_ICON_TYPES[0]);
  const [getOneData, setGetOneData] = useState<Record<string, any>>({});
  // ************* Formik
  const formik = useFormik({
    validationSchema: hierarychyMappingSettings(),
    onSubmit: handleSubmit,
    initialValues: initialValue,
    enableReinitialize: true,
  });

  async function handleSubmit(value: Record<string, any>) {
    console.log("data >>>>>>>>", value);
    let payload = {
      designation: selectedOption?.data?._id,
      mappeddesignation: value?.selectedDesignations?.map(
        (m: Record<string, any>) => m?.value
      ),
      organization_id: AUTH?.data?.userRecord?.organization_id,
      updatedBy: AUTH?.data?.userRecord?.id,
    } as Record<string, any>;
    if (addOrEdit === ACTION_ICON_TYPES[1]) {
      let updateRes = await HierarchyService.updateDesignationMapping(
        getOneData?.id,
        payload
      );
      console.log("createRes >>>>>>>>>>>", updateRes);
    } else {
      payload.createdBy = AUTH?.data?.userRecord?.id;
      let createRes = await HierarchyService.createDesignationMapping(payload);
      console.log("createRes >>>>>>>>>>>", createRes);
    }
  }

  const getDesignation = async () => {
    try {
      let payload = {
        matchObj: {
          isActive: true,
          settingsType: CONSTANT_DATA?.SETTING_TYPES[1],
          subTypes: CONSTANT_DATA?.SETTING_SUB_TYPES[1],
          value: { $ne: selectedOption?.label },
        },
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      const listRes = await SettingService.list(payload, "?isCount=false");
      if (listRes?.status) {
        let filterData: Record<string, any>[] | any =
          listRes?.data?.response?.data?.data?.map((element: Record<string, any>) => ({
            label: element?.value,
            value: element?._id,
          }));
        setDesignation([
          // { label: 'Select All', value: 'SELECT ALL'},
          ...filterData,
        ]);
      }
      console.log("listRes data", listRes);
    } catch (error) {
      console.log("ERRR", error);
    }
  };

  const getDesigantionMapped = async () => {
    try {
      let payload = {
        designation: selectedOption?.data?._id,
        organization_id: AUTH?.data?.userRecord?.organization_id,
        isActive: true,
      };
      let getOne = await HierarchyService.findDesignationMapping(payload);
      getOne = getOne?.data;
      if (getOne?.status) {
        getOne = getOne?.response;
        setAddOrEdit(ACTION_ICON_TYPES[1]);
        setGetOneData(getOne);
        formik.setFieldValue("selectedDesignations", getOne?.getFinalArray);
      }
      console.log("get one data", getOne);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getDesignation();
    getDesigantionMapped();
  }, []);
  const removeOption = (id: number) => {
    formik.setFieldValue(
      "selectedDesignations",
      formik?.values?.selectedDesignations?.filter(
        (element: any) => element?.value != id
      )
    );
  };

  const autoCompleteChange = (selectedOption: Record<string, any>[]) => {
    // let tempSelection = _.cloneDeep(selectedOption)
    // console.log('designations >>>>>>', designations)
    // if(formik?.values?.selectedOption?.length - 1 === selectedOption?.length){
    //   selectedOption = designations
    // }else {

    //   console.log('formik?.values?.selectedOption >>>>>>>>', formik?.values?.selectedOption)
    //  if (selectedOption.find((fd: any) => fd?.value === "SELECT ALL")) {
    //    selectedOption = designations
    //    if(designations?.length != selectedOption?.length){

    //    }
    //  }else {
    //   if(formik?.values?.selectedOption?.length - 1 === selectedOption?.length){

    //   }
    //    selectedOption
    //  }
    // }
    // uniqueArrayOfObj(selectedOption, "value").map((m) =>
    //   m.isChecked !== undefined ? !m.isChecked : true
    // );
    formik?.setFieldValue(
      "selectedDesignations",
      uniqueArrayOfObj(selectedOption, "value")
    );
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} justifyContent={"flex-end"}>
              <AutoComplete
                options={designations}
                multiple
                disableCloseOnSelect
                renderTags={(values) =>
                  values.map((ele: any, idx: number) => (
                    <Chip
                      key={idx}
                      label={ele.label}
                      onDelete={() => {
                        removeOption(ele.value);
                      }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <Textfield
                    {...params}
                    label={
                      <p>
                        Designations <span style={{ color: "red" }}>*</span>
                      </p>
                    }
                    fullWidth
                    type="text"
                    name="selectedDesignations"
                    placeholder={
                      formik?.values?.selectedDesignations?.length === 0
                        ? "Select at least one designation"
                        : ""
                    }
                    onBlur={formik?.handleBlur}
                  />
                )}
                renderOption={(renderProps, option: any, { selected }) => {
                  return (
                    <li {...renderProps} style={{ padding: 0 }}>
                      <Checkbox checked={selected} />
                      {option.label}
                    </li>
                  );
                }}
                value={formik?.values?.selectedDesignations}
                fullWidth
                onChange={(
                  _event: SyntheticEvent<Element, Event>,
                  selectedOption: (string | Record<string, any>)[],
                  _reason: AutocompleteChangeReason,
                  _details?: AutocompleteChangeDetails<any> | undefined
                ) => {
                  const filteredOptions = selectedOption.filter(
                    (option) => typeof option !== "string"
                  ) as Record<string, any>[];

                  autoCompleteChange(filteredOptions);
                }}
                disabled={false}
              />
            </Grid>

            <Grid container item xs={12} justifyContent={"flex-end"}>
              <ButtonV1 disabled={formik?.isSubmitting} type="submit" >
                {getOneData?.id ? "Update" : "Add"}
              </ButtonV1>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default MappingSetting;
