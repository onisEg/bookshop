import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../constants/END_POINTS";
import { PasswordValidation } from "../../../../constants/VALIDATIONS";
interface FormValues {
  password: string;
  password_new: string;
}
export default function ChangePass() {
  let navigate = useNavigate();
  let {
    register, //Data
    handleSubmit,
    formState: { errors }, // errors in validation
  }: any = useForm<FormValues>({
    defaultValues: { password: "", password_new: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(AUTH_URLS.changePassword, data);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.data.accessToken);
      navigate("/dashbord/home");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Grid sx={{ width: "100%" }}>
        <Typography
          component="p"
          variant="subtitle1"
          sx={{ mt: 2, color: "#6B6B87" }}
        >
          Welcome back!
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Change Your Password Easily
        </Typography>
      </Grid>

      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          required
          fullWidth
          name="Password"
          type="password"
          id="password"
          label="Old Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            backgroundColor: "#F4F4FF",
            mt: 3,
          }}
          placeholder="**********"
          {...register("password", { PasswordValidation })}
        />
        <TextField
          required
          fullWidth
          name="Password"
          type="password"
          id="password"
          label="New Password"
          error={!!errors.password_new}
          helperText={errors.password_new?.message}
          sx={{
            backgroundColor: "#F4F4FF",
            mt: 3,
          }}
          placeholder="**********"
          {...register("password_new", { PasswordValidation })}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontSize: "18px",
            py: 2,
            mt: 4,
            backgroundColor: "#EF6B4A",
            "&:hover": {
              backgroundColor: "#Ee6B4c",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
