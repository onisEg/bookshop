import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../constants/END_POINTS";
import { EmailValidation } from "../../../../constants/VALIDATIONS";
interface FormValues {
  email: string;
}
export default function Forgetpass() {
  let navigate = useNavigate();
  let {
    register, //Data
    handleSubmit,
    formState: { errors }, // errors in validation
  }: any = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        AUTH_URLS.forgotPassword,
        data
      );
      toast.success(response.data.message);

      navigate("/resetpssword");
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
          Forget Password !!
        </Typography>
      </Grid>

      <Box
        component="form"
        noValidate
        sx={{ mt: 2, width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          {...register("email", { EmailValidation })}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{
            fontSize: "18px",
            py: 2,
            mt: 4,
            color: "#6251DD",
            borderColor: "#6251DD",
            "&:hover": {
              borderColor: "#6251DD",
              backgroundColor: "rgba(98, 81, 221, 0.08)", // لون خلفية خفيف عند التحويم
            },
          }}
        >
          Send
        </Button>
      </Box>
    </>
  );
}
