import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function NewsletterSection() {
  return (
    <Box sx={{ px: 10, pb: 10, bgcolor: "#FCEBEA" }}>
      <Box
        sx={{
          backgroundColor: "#ED553B", // main background color
          paddingY: 8,
          textAlign: "center",
          borderRadius: "0 0 8px 8px ",
          position: "relative",
          overflow: "visible",
          color: "white",
        }}
      >
        {/* Section Title */}
        <Typography
          variant="h3"
          fontSize={"56px"}
          fontWeight="500"
          gutterBottom
        >
          Subscibe to Our Newsletter
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" sx={{ marginBottom: 4, color: "#FFEDED" }}>
          Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet,
          consectetur. Elit adipiscing enim pharetra hac.
        </Typography>

        {/* Input Field and Subscribe Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "500px",
            margin: "0 auto",
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: 1,
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
            position: "absolute",
            bottom: "-30px", // Adjust this to control how much of the box is outside the container
            left: "50%",
            transform: "translateX(-50%)", // Center the box horizontally
            zIndex: 2, // Ensure the input box stays above other elements
          }}
        >
          <TextField
            placeholder="anasabdo@gmail.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "5px 0 0 5px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FF5733",
              color: "white",
              paddingX: 3,
              paddingY: 2,
              textTransform: "uppercase",
              fontWeight: "400",
              borderRadius: "0 8px 8px 0",
              "&:hover": {
                bgcolor: "#E44A20",
              },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
