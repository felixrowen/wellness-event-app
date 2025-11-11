import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  RadioGroup,
  Radio,
  Divider,
} from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

import useRegister from "./useRegister";

import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
    selectedRole,
  } = useRegister();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100 via-white to-blue-100" />
      <div className="absolute top-[-15%] left-[-10%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-[-15%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-blue-200/30 blur-3xl" />

      <Card className="w-full max-w-lg shadow-2xl border border-white/40 rounded-3xl backdrop-blur-md bg-white/70">
        <CardBody className="p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Create Your Account 🌿
            </h1>
            <p className="mt-2 text-gray-500">
              Join the{" "}
              <span className="font-semibold text-primary">Wellness Event</span>{" "}
              community
            </p>
          </div>

          {errors.root && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 border border-red-100">
              {errors?.root?.message}
            </div>
          )}

          <form
            className={cn(
              "flex flex-col",
              Object.keys(errors).length > 0 ? "gap-3" : "gap-5",
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="text-gray-700"
                  errorMessage={errors.role?.message}
                  isInvalid={!!errors.role}
                  label="Register as"
                  orientation="horizontal"
                >
                  <Radio value="VENDOR">Vendor</Radio>
                  <Radio value="HR">HR</Radio>
                </RadioGroup>
              )}
            />

            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  className="rounded-lg"
                  errorMessage={errors.fullName?.message}
                  isInvalid={!!errors.fullName}
                  label="Full Name"
                  placeholder="John Doe"
                  type="text"
                  variant="bordered"
                />
              )}
            />

            {selectedRole === "HR" && (
              <Controller
                control={control}
                name="companyName"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    className="rounded-lg"
                    errorMessage={errors.companyName?.message}
                    isInvalid={!!errors.companyName}
                    label="Company Name"
                    placeholder="Wellness Corp"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            )}

            {selectedRole === "VENDOR" && (
              <Controller
                control={control}
                name="vendorName"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoComplete="off"
                    className="rounded-lg"
                    errorMessage={errors.vendorName?.message}
                    isInvalid={!!errors.vendorName}
                    label="Vendor Name"
                    placeholder="Healthy Catering Co."
                    type="text"
                    variant="bordered"
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  className="rounded-lg"
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  variant="bordered"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  className="rounded-lg"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="pointer-events-none text-xl text-gray-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-gray-400" />
                      )}
                    </button>
                  }
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                  label="Password"
                  placeholder="Enter your password"
                  type={visiblePassword.password ? "text" : "password"}
                  variant="bordered"
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  className="rounded-lg"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-gray-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-gray-400" />
                      )}
                    </button>
                  }
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword}
                  label="Password Confirmation"
                  placeholder="Re-enter your password"
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  variant="bordered"
                />
              )}
            />

            <Button
              className="mt-2 w-full font-medium rounded-lg shadow-sm"
              color="primary"
              size="lg"
              type="submit"
            >
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <Divider className="my-6" />

          <p className="text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              href="/auth/login"
            >
              Login here
            </Link>
          </p>
        </CardBody>
      </Card>

      <p className="absolute bottom-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Wellness Event • Empowering healthy
        communities 🌸
      </p>
    </div>
  );
};

export default Register;
