import * as Yup from "yup";

const validatePassword = Yup.string()
  .required()
  .min(6, "Password must be at least 6 characters")
  .test(
    "at-least-one-uppercase-letter",
    "Contains at least one uppercase letter",
    (value) => {
      if (!value) return false;
      const regex = /^(?=.*[A-Z])/;
      return regex.test(value);
    }
  )
  .test("at-least-one-number", "Contains at least one number", (value) => {
    if (!value) return false;
    const regex = /^(?=.*\d)/;
    return regex.test(value);
  });

const validateConfirmPassword = Yup.string()
  .required()
  .oneOf([Yup.ref("password"), ""], "Password not match");

export const registerValidator = Yup.object({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  role: Yup.string().oneOf(["HR", "VENDOR"]).required(),
  companyName: Yup.string().when("role", {
    is: "HR",
    then: (schema) => schema.required("Company name is required for HR"),
    otherwise: (schema) => schema.notRequired(),
  }),
  vendorName: Yup.string().when("role", {
    is: "VENDOR",
    then: (schema) => schema.required("Vendor name is required for Vendor"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const loginValidator = Yup.object({
  email: Yup.string().required(),
  password: validatePassword,
});

export const updatePasswordValidator = Yup.object({
  oldPassword: validatePassword,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
});

export type RegisterDTO = Yup.InferType<typeof registerValidator>;
export type LoginDTO = Yup.InferType<typeof loginValidator>;
