export function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function isValidCardNumber(value) {
  return /^\d{4} \d{4} \d{4} \d{4}$/.test(value);
}

export function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function maskCardNumber(value) {
  const lastFour = value.replace(/\s/g, "").slice(-4);
  return `**** **** **** ${lastFour}`;
}