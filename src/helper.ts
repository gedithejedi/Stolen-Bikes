export const unixToDate = (unixDate: number) => {
    const date = new Date(unixDate * 1000);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };