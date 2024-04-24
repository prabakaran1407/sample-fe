import * as _ from "lodash";

// ******* Only for Design layouts
export const CustomDivier = (props: Record<string, any>) => {
  const defaultProps: Record<string, any> = {
    style: {
      width: "100%",
      border: "2px solid whitesmoke",
      // marginTop: "15px",
      ...(props?.style || null),
    },
  };
  if (props?.style) props = _.omit(props, "style");
  return <hr {...defaultProps} {...props} />;
};
