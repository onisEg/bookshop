import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../constants/END_POINTS";
import {
  EmailValidation,
  FirstNameValidation,
  PasswordValidation,
} from "../../../../constants/VALIDATIONS";
interface FormValues {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: string;
}
export default function Register() {
  let navigate = useNavigate();
  let {
    register, //Data
    handleSubmit,
    formState: { errors }, // errors in validation
  }: any = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(AUTH_URLS.register, data);
      toast.success(response.data.message);
      navigate("/");
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
          Create new account
        </Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Register
        </Typography>
      </Grid>
      <Box
        component="form"
        noValidate
        sx={{ mt: 2 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* ------------------------ first name ----------------------- */}

            <TextField
              label="First Name"
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              required
              fullWidth
              id="first_name"
              autoComplete="given-name"
              sx={{
                backgroundColor: "#F4F4FF",
                mt: 2,
              }}
              placeholder="Anas"
              {...register("first_name", FirstNameValidation)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* ------------------------ last name ----------------------- */}

            <TextField
              label="Last Name"
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              required
              fullWidth
              id="last_name"
              autoComplete="last_name"
              sx={{
                backgroundColor: "#F4F4FF",
                mt: 2,
              }}
              placeholder="Abdo"
              {...register("last_name", FirstNameValidation)}
            />
          </Grid>
        </Grid>
        {/* ------------------------ email ----------------------- */}
        <TextField
          label="Email"
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
        {/* ------------------------ password ----------------------- */}
        <TextField
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            backgroundColor: "#F4F4FF",
            mt: 3,
          }}
          placeholder="**********"
          {...register("password", PasswordValidation)}
        />
        {/* ------------------------ Role ----------------------- */}

        <TextField
          label="Role"
          required
          fullWidth
          id="role"
          select
          SelectProps={{
            native: true,
          }}
          sx={{
            backgroundColor: "#F4F4FF",
            mt: 2,
          }}
          {...register("role", {
            required: "chose one",
          })}
        >
          <option value="Customer">Customer</option>
          <option value="user">User</option>
        </TextField>
        {/* ------------------------ Register btn ----------------------- */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            fontSize: "18px",
            py: 2,
            mt: 3,
            backgroundColor: "#EF6B4A",
            "&:hover": {
              backgroundColor: "#Ee6B4c",
            },
          }}
        >
          Register
        </Button>
        {/* ------------------------ navigat to login  ----------------------- */}
        <Button
          onClick={() => navigate("/login")}
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
