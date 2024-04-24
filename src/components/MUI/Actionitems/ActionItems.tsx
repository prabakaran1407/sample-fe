/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import { ActionIconButton } from "../mui.index";
import { ACTION_ICON_TYPES } from "../../../data/AppConst";
import { Box } from "@mui/material";
import { COLORS } from "../../../utils/globals.ts";
interface IActionItems {
  permission: Record<string, boolean>;
  handleEdit?: (value?: Record<string, unknown>) => void;
  handleView?: (value?: Record<string, unknown>) => void;
  handleUpdateReq?: (value?: Record<string, unknown>) => void;
  handleCancel?: (value?: Record<string, unknown>) => void;
  handleDelete?: (value?: Record<string, unknown>) => void;

  handleDownload?: (value?: Record<string, unknown>) => void; // Add a new handleDownload function
  handleOpen?: () => void;
  data?: Record<string, unknown>;
  isLinkIocn?: boolean;
  hrefObj?: Record<string, any>;
  enableActions: string[];
  handleRefresh?: (value?: Record<string, unknown>) => void;
  handleActivate?: (value?: Record<string, unknown>) => void;
  handleBilling?: (value?: Record<string, unknown>) => void;
}

const getActionType = (array: string[], type: string) => {
  return array?.find((f) => f === type);
};

export const ActionItems = (props: IActionItems) => {
  const {
    enableActions,
    handleEdit,
    handleView,
    handleUpdateReq,
    handleDownload,
    data,
    permission,
    handleCancel,
    handleDelete,
    handleRefresh,
    handleActivate,
    handleBilling,
  } = props;

  // const call_back: any = cb ? cb(data) : true;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
      }}
    >
      {permission &&
        permission?.can_add &&
        enableActions?.includes(ACTION_ICON_TYPES[0]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[0])}
            onClick={() => handleEdit && handleEdit(data)}
          />
        )}
      {permission &&
        permission?.can_edit &&
        enableActions?.includes(ACTION_ICON_TYPES[1]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[1])}
            onClick={() => handleEdit && handleEdit(data)}
            // onClick={()=>handleOpen()}
          />
        )}
      {permission &&
        permission?.can_view &&
        enableActions?.includes(ACTION_ICON_TYPES[2]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[2])}
            onClick={() => handleView && handleView(data)}
          />
        )}
      {permission &&
        permission?.canUpdateReq &&
        enableActions?.includes(ACTION_ICON_TYPES[8]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[8])}
            onClick={() => handleUpdateReq && handleUpdateReq(data)}
          />
        )}
      {permission &&
        permission?.can_cancel &&
        enableActions?.includes(ACTION_ICON_TYPES[3]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[3])}
            onClick={() => {
              handleCancel && handleCancel(data);
            }}
          />
        )}
      {permission &&
        permission?.can_delete &&
        enableActions?.includes(ACTION_ICON_TYPES[4]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[4])}
            onClick={() => {
              handleDelete && handleDelete(data);
            }}
          />
        )}
      {permission &&
        permission?.can_download &&
        enableActions?.includes(ACTION_ICON_TYPES[5]) && ( // Assuming 5 is the index for download action
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[5])}
            onClick={() => {
              handleDownload && handleDownload(data);
            }}
          />
        )}
      {permission &&
        permission?.can_refresh &&
        enableActions?.includes(ACTION_ICON_TYPES[6]) && ( // Assuming 5 is the index for download action
          <ActionIconButton
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[6])}
            onClick={() => {
              handleRefresh && handleRefresh(data);
            }}
          />
        )}
      {permission &&
        permission?.can_activate &&
        enableActions?.includes(ACTION_ICON_TYPES[9]) && ( // Assuming 5 is the index for download action
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[9])}
            onClick={() => {
              handleActivate && handleActivate(data);
            }}
          />
        )}
      {permission &&
        permission?.can_bill &&
        enableActions?.includes(ACTION_ICON_TYPES[10]) && (
          <ActionIconButton
            sx={{
              background: COLORS.primary,
              borderRadius: 1,
              width: 26,
              height: 26,
              mx: 1,
              "&:hover": {
                background: COLORS.secondary,
              },
            }}
            actionType={getActionType(enableActions, ACTION_ICON_TYPES[10])}
            onClick={() => {
              handleBilling && handleBilling(data);
            }}
          />
        )}
    </Box>
  );
};

export default ActionItems;
