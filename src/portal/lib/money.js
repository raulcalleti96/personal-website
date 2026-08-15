export const formatMoney = (amount, locale = "es") =>
  new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "EUR",
  }).format(amount || 0);
