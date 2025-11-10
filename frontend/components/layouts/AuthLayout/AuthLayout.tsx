import { ReactNode } from "react";

import { Head } from "@/components/layouts/head";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { children, title } = props;

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <Head title={title} />

      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
