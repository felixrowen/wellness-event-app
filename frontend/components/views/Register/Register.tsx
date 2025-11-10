import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
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
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold-500">Create Account</h2>
          <p className="mb-4 mt-2 text-small">
            Have an account?&nbsp;
            <Link className="font-semibold-400" href="/auth/login">
              Login here
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 font-medium">{errors?.root?.message}</p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
            )}
            onSubmit={handleSubmit(handleRegister)}
          >
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.fullName?.message}
                  isInvalid={errors.fullName !== undefined}
                  label="Fullname"
                  type="text"
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.username?.message}
                  isInvalid={errors.username !== undefined}
                  label="Username"
                  type="text"
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.email?.message}
                  isInvalid={errors.email !== undefined}
                  label="Email"
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
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {visiblePassword.password ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  errorMessage={errors.password?.message}
                  isInvalid={errors.password !== undefined}
                  label="Password"
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
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {visiblePassword.confirmPassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={errors.confirmPassword !== undefined}
                  label="Password Confirmation"
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  variant="bordered"
                />
              )}
            />

            <Button color="primary" size="lg" type="submit">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
