export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateFull = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-SG", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
