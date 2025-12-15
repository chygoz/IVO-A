import { format } from "date-fns";
export function formatToUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format based on currency
export function formatCurrency(
  amount: number,
  currency: string = "NGN"
): string {
  return currency === "NGN" ? formatToNaira(amount) : formatToUSD(amount);
}

// Format to Nigerian Naira
export function formatToNaira(amount: number): string {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export function formatDate(
  dateString: string,
  formatStr: string = "dd/MM/yyyy, HH:mm"
) {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), formatStr);
  } catch (error) {
    console.error(`Error formatting date ${dateString}:`, error);
    return "Invalid date";
  }
}
