import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../constants/END_POINTS";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";
interface FormValues {
  email: string;
  otp: string;
  password: string;
}
export default function Resetpass() {
  let navigate = useNavigate();

  let {
    register, //Data
    handleSubmit,
    formState: { errors }, // errors in validation
  }: any = useForm<FormValues>({
    defaultValues: { email: "", otp: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(AUTH_URLS.resetPassword, data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.data.accessToken);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Grid width="100%">
        <Typography
          component="p"
          variant="subtitle1"
          sx={{ mt: 5, color: "#6B6B87" }}
        >
          Welcome back!
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Reset Your Password Now !
        </Typography>
      </Grid>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* =============== Email ============= */}
        <TextField
          label="Email"
          required
          fullWidth
          id="email"
          type="email"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            backgroundColor: "#F4F4FF",
            mt: 2,
          }}
          placeholder="john@mail.com"
          {...register("email", EmailValidation)}
        />

        {/* ================= OTP ============== */}
        <TextField
          label="OTP"
          type="text"
          required
          fullWidth
          id="otp"
          name="otp"
          autoComplete="one-time-code"
          error={!!errors.otp}
          helperText={errors.otp?.message}
          sx={{ backgroundColor: "#F4F4FF", mt: 2 }}
          placeholder="1233"
          {...register("otp", { required: "Enter OTP " })}
        />
        {/* =========================================== */}
        <TextField
          required
          fullWidth
          name="Password"
          type="password"
          id="password"
          label="New Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            backgroundColor: "#F4F4FF",
            mt: 3,
          }}
          placeholder="**********"
          {...register("password", PasswordValidation)}
        />

        <Grid container alignItems="center">
          <Grid item xs>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
              sx={{
                color: "#6251DD",
              }}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontSize: "18px",
            py: 2,
            mt: 2,
            backgroundColor: "#EF6B4A",
            "&:hover": {
              backgroundColor: "#Ee6B4c",
            },
          }}
        >
          Send
        </Button>

        <Button
          onClick={() => {
            navigate("/login");
          }}
          type="button"
          fullWidth
          variant="outlined"
          sx={{
            fontSize: "18px",
            py: 2,
            mt: 1,
            color: "#6251DD",
            borderColor: "#6251DD",
            "&:hover": {
              borderColor: "#6251DD",
              backgroundColor: "rgba(98, 81, 221, 0.08)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
