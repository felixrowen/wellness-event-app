export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getStatusColor = (
  status: string,
): "warning" | "success" | "danger" | "default" => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "danger";
    default:
      return "default";
  }
};
