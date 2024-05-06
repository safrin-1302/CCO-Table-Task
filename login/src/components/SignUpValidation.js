import * as Yup from "yup";

export const SignUpValidation = Yup.object({
  firstName: Yup.string().min(6).required("Please enter firstname"),
  lastName: Yup.string().min(6).required("Please enter lastname"),
  email: Yup.string()
    .email("Please enter Valid email")
    .required("Please Enter email"),
  password: Yup.string().min(6).required("Please enter password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "password not matched"
  ),
});
