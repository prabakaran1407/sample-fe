import { Checkbox, CheckboxProps } from "@mui/material";
import { FC } from "react";

interface ICheckBoxProps extends CheckboxProps {}

export const CheckBox: FC<ICheckBoxProps> = (props: ICheckBoxProps) => {
  const defaultProps: CheckboxProps = {
    size: "small",
  };
  return <Checkbox {...defaultProps} {...props} />;
};
