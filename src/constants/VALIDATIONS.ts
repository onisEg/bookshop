export const EmailValidation = {
  required: "Enter email",
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Email should be valid !",
  },
};

export const PasswordValidation = {
  required: "Enter password",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/,
    message: "write the correct password !",
  },
};

export const FirstNameValidation = {
  required: "Enter First Name",
  minLength: {
    value: 3,
    message: "First name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "First name must be no more than 50 characters",
  },
};