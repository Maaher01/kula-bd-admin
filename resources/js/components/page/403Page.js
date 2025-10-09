import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Box>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" color="error" gutterBottom>
          403 - Unauthorized
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You do not have permission to access this page or perform this action.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/app/dashboard")}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
