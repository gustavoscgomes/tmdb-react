import { Box, Typography } from "@mui/material";

interface ErrorBoxProps {
  message: string;
}

const ErrorBox = ({ message }: ErrorBoxProps) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Typography variant="h6" color="error">
      {message}
    </Typography>
  </Box>
);

export default ErrorBox;
