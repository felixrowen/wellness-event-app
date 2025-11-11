import { FC, ReactNode } from "react";
import { FiAlertCircle, FiInfo, FiCheckCircle } from "react-icons/fi";

export interface BannerProps {
  variant?: "danger" | "warning" | "success" | "info";
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const Banner: FC<BannerProps> = ({
  variant = "info",
  title,
  description,
  icon,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          bg: "bg-danger-50",
          border: "border-danger-200",
          iconColor: "text-danger-600",
          titleColor: "text-danger-900",
          descColor: "text-danger-700",
        };
      case "warning":
        return {
          bg: "bg-warning-50",
          border: "border-warning-200",
          iconColor: "text-warning-600",
          titleColor: "text-warning-900",
          descColor: "text-warning-700",
        };
      case "success":
        return {
          bg: "bg-success-50",
          border: "border-success-200",
          iconColor: "text-success-600",
          titleColor: "text-success-900",
          descColor: "text-success-700",
        };
      case "info":
      default:
        return {
          bg: "bg-primary-50",
          border: "border-primary-200",
          iconColor: "text-primary-600",
          titleColor: "text-primary-900",
          descColor: "text-primary-700",
        };
    }
  };

  const getDefaultIcon = () => {
    switch (variant) {
      case "danger":
      case "warning":
        return <FiAlertCircle />;
      case "success":
        return <FiCheckCircle />;
      case "info":
      default:
        return <FiInfo />;
    }
  };

  const styles = getVariantStyles();
  const displayIcon = icon || getDefaultIcon();

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`${styles.iconColor} text-xl mt-0.5 flex-shrink-0`}>
          {displayIcon}
        </div>
        <div>
          <p className={`font-semibold ${styles.titleColor}`}>{title}</p>
          {description && (
            <p className={`text-sm ${styles.descColor} mt-1`}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
