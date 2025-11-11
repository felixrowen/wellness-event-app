import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export * from "./Auth";
export * from "./Event";
export * from "./Vendor";
