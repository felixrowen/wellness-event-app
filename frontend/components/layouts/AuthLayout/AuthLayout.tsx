import { ReactNode } from "react";

import { PageHead } from "@/components/layouts/head";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;

  return (
    <div>
      <PageHead title={title} />

      <section className="max-w-screen-3xl 3xl:container">{children}</section>
    </div>
  );
};

export default AuthLayout;
