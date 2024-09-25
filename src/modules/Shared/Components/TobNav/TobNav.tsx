import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";

export default function TobNav() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "var(--blue-color)",
        }}
      >
        <Container
          sx={{
            padding: "8px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography
            sx={{
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="fas fa-phone mx-2"></i>
            +91 8374902234
          </Typography>
          <Box>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}
