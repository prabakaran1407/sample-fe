/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/**
 * eslint-disable react-refresh/only-export-components
 *
 * @format
 */

/* eslint-disable no-empty-pattern */
import {
  Button,
  ButtonProps,
  Radio,
  RadioProps,
  Switch,
  SwitchProps,
  FormControlLabel,
  IconProps,
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { FC } from "react";

import BorderColorOutlined from "@mui/icons-material/BorderColorOutlined";
import RestoreFromTrashSharpIcon from "@mui/icons-material/RestoreFromTrashSharp";
import AddchartSharpIcon from "@mui/icons-material/AddchartSharp";
// eslint-disable-next-line no-empty-pattern

// Default icons for buttons actionicon buttons
import ModeIcon from "@mui/icons-material/Mode";
import DeIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { COLORS } from "../../../utils/globals.ts";
import { Add, ReceiptLong } from "@mui/icons-material";

export const Button_v1 = styled(Button)(({}) => ({
  width: "100%",
  borderRadius: 0,
  borderStyle: "dashed",
}));

// eslint-disable-next-line no-empty-pattern
export const Button_v2 = styled(Button)(({}) => ({
  borderStyle: "none",
  height: "auto",
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Button_v3 = (props: any) => {
  return <Button variant="contained" {...props} />;
};

export const LoadingButton_v1 = styled(LoadingButton)(({}) => ({
  borderStyle: "none",
  borderRadius: "0",
  width: "100%",
  background: COLORS.primary,
  "&:hover": {
    background: COLORS.secondary,
  },
}));

interface IRadioProps extends RadioProps {}
export const RadioButton: FC<IRadioProps> = (props: IRadioProps) => {
  const defaultProps: IRadioProps = {
    size: "small",
  };

  return <Radio {...defaultProps} {...props} />;
};

export const EditIcon: FC<any> = (props: any) => {
  const defaultProps: IconProps = {};

  return <BorderColorOutlined {...defaultProps} {...props} />;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DeleteIcon: FC<any> = (props: any) => {
  const defaultProps: IconProps = {};

  return <RestoreFromTrashSharpIcon {...defaultProps} {...props} />;
};
export const UpdateReqIcon: FC<any> = (props: any) => {
  const defaultProps: IconProps = {};

  return <EditNoteIcon {...defaultProps} {...props} />;
};
export const AddIcon: FC<IconProps> = (props: any) => {
  const defaultProps: IconProps = {};

  return <AddchartSharpIcon {...defaultProps} {...props} />;
};

// const defaultProps = {
//     size:
// }
interface IToggleSwitchProps extends SwitchProps {
  label?: string;
  required?: boolean;
}

export const ToggleSwitch: FC<IToggleSwitchProps> = (
  props: IToggleSwitchProps
) => {
  const defaultProps: IToggleSwitchProps = {
    size: "small",
  };

  return (
    <FormControlLabel
      control={<Switch {...defaultProps} {...props} />}
      label={props.label}
      required={props?.required || false}
    />
  );
};

interface IButtonV1Props extends ButtonProps {}
export const ButtonV1: FC<IButtonV1Props> = ({
  children,
  ...rest
}: IButtonV1Props) => {
  const defaultProps: IButtonV1Props = {
    variant: "contained",
    size: "small",
  };
  return (
    <Button
      {...defaultProps}
      {...rest}
      sx={{
        textTransform: "capitalize",
      }}
    >
      {children}
    </Button>
  );
};

interface ActionIconButtonProps extends IconButtonProps {
  actionType?:
    | string
    | "ADD"
    | "EDIT"
    | "VIEW"
    | "CANCEL"
    | "DELETE"
    | "DOWNLOAD"
    | "REFRESH"
    | "UPLOAD"
    | "CLOSE"
    | "FILTER"
    | undefined;
  title?: string;
}
export const ActionIconButton: FC<ActionIconButtonProps> = ({
  children,
  actionType,
  title,
  ...rest
}: ActionIconButtonProps) => {
  const defaultProps: IconButtonProps = {
    size: "medium",
  };
  if (actionType === "ADD") {
    return children ? (
      <Tooltip title={title || "Add"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Add"} color="primary">
        <IconButton {...defaultProps} {...rest}>
          <Add sx={{ color: "white", fontSize: 20 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "EDIT") {
    return children ? (
      <Tooltip title={title || "Edit"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Edit"}>
        <IconButton {...defaultProps} {...rest}>
          <ModeIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "VIEW") {
    return children ? (
      <Tooltip title={title || "View"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "View"}>
        <IconButton {...defaultProps} {...rest}>
          <VisibilityIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "UPDATER") {
    return children ? (
      <Tooltip title={title || "UPDATER"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Update"}>
        <IconButton {...defaultProps} {...rest}>
          <EditNoteIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "CLOSE") {
    return children ? (
      <IconButton {...defaultProps} {...rest}>
        {children}
      </IconButton>
    ) : (
      <Tooltip title={title || "Close"}>
        <IconButton {...defaultProps} {...rest}>
          <CloseRoundedIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "CANCEL") {
    return children ? (
      <Tooltip title={title || "Cancel"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Cancel"}>
        <IconButton {...defaultProps} {...rest}>
          <CloseRoundedIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "DELETE") {
    return children ? (
      <Tooltip title={title || "Deactivate"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Deactivate"}>
        <IconButton {...defaultProps} {...rest}>
          <DeIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "DOWNLOAD") {
    return children ? (
      <Tooltip title={title || "Download"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Download"}>
        <IconButton {...defaultProps} {...rest}>
          <DownloadIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "REFRESH") {
    return children ? (
      <Tooltip title={title || "Refresh"}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Refresh"}>
        <IconButton {...defaultProps} {...rest} color="primary">
          <RefreshIcon sx={{ color: "white", fontSize: 20 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "UPLOAD") {
    return children ? (
      <Tooltip title={title || "upload"}>
        <IconButton {...defaultProps} {...rest} color="primary">
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "upload"}>
        <IconButton {...defaultProps} {...rest}>
          <CloudUploadIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "ACTIVATE") {
    return children ? (
      <Tooltip title={title || "Activate"}>
        <IconButton {...defaultProps} {...rest} color="primary">
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Activate"}>
        <IconButton {...defaultProps} {...rest}>
          <CheckCircleIcon sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else if (actionType === "ADD BILLING") {
    return children ? (
      <Tooltip title={title || "Add Billing"}>
        <IconButton {...defaultProps} {...rest} color="primary">
          {children}
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title={title || "Add Billing"}>
        <IconButton {...defaultProps} {...rest}>
          <ReceiptLong sx={{ color: "white", fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={title || ""}>
        <IconButton {...defaultProps} {...rest}>
          {children}
        </IconButton>
      </Tooltip>
    );
  }
};

interface LoadingIButtonV1Props extends LoadingButtonProps {}
export const LoadingButtonV1: FC<LoadingIButtonV1Props> = ({
  children,
  ...rest
}: IButtonV1Props | any) => {
  const defaultProps: IButtonV1Props | any = {
    variant: "contained",
    size: "small",
  };
  return (
    <LoadingButton {...defaultProps} {...rest}>
      {children}
    </LoadingButton>
  );
};
