import { Box } from "@mui/material";

interface CustomHeaderValueProps {
  displayName: string;
  style: React.CSSProperties;
}

const CustomHeader = (props: CustomHeaderValueProps) => {
  const { displayName, style } = props;
  return (
    <Box
      sx={{
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: 500,
        ...style,
      }}
    >
      {displayName}
    </Box>
  );
};

const GetHeaderParams = (customStyles?: object) => ({
  headerComponent: (headerParams: any) => (
    <CustomHeader {...headerParams} style={customStyles} />
  ),
});

export default GetHeaderParams;
