// import { Box, styled } from "@mui/material";

// const ListStyled = styled(Box)(({ theme }) => ({
//   borderRadius: 5,
//   marginTop: 13,
//   padding: 0,
//   width: "100%",
//   border: "1px solid #BFBFBF",
// }));

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const ModalStyled = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};
export default ModalStyled;
