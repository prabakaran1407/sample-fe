/**
 * eslint-disable react-hooks/rules-of-hooks
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

// **************** MUI
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";
import React, { ReactNode, CSSProperties, ElementType } from "react";

// const [sizeAndWidth, setSizeAndWidth] = useState({
//     height: `${window.innerHeight}px`,
//     width: `${window.innerWidth}px`
// })

// useEffect(() => {
//     setSizeAndWidth({
//         height: `${window.innerHeight}px`,
//         width: `${window.innerWidth}px`
//     })
// }, [window.innerHeight, window.innerWidth])

interface ContainerBoxV2Props {
  boxType?: ElementType;
  styles?: CSSProperties;
  children: ReactNode;
}

export const ContainerBox = styled(Box)(() => ({
  border: "none",
  // width: "100vw",
  height: "100vh",
  // backgroundImage: `linear-gradient(to top right, ${theme.palette.primary.dark}, ${theme.palette.secondary.light})`,
  // padding: "15px",
}));

export const TopBarBox = styled(Box)(() => ({
  width: "inherit",
  height: "auto",
  padding: 8,
  backgroundImage: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const SideBarBox = styled(Box)(() => ({
  padding: 5,
  background: "#E9EAEE",
  height: "100vh",
  overflow: "hidden",
  // flexShrink: 1,
}));

export const AppContentBox = styled(Box)(() => ({
  backgroundColor: `#ffffff`,
  borderRadius: 15,
  height: "83vh",
  overflow: "auto",
  overflowX: "hidden",
  flexShrink: 1,

  "&::-webkit-scrollbar": {
    width: "0em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
  },
}));

export const ContainerBoxV2: React.FC<ContainerBoxV2Props> = ({
  boxType,
  styles,
  children,
}) => (
  <Box component={boxType ? boxType : "div"} sx={{ padding: 2, ...styles }}>
    {children}
  </Box>
);

interface BoxDividerProps extends BoxProps {
  children?: ReactNode;
}
export const BoxDivider = ({ children, ...rest }: BoxDividerProps) => {
  return (
    <Box
      sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
      {...rest}
    >
      {children}
    </Box>
  );
};
