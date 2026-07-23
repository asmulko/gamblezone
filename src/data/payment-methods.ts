export type PaymentMethod = {
  id: string;
  name: string;
  /** Short accent used to tint the SVG chip. */
  accent: string;
};

export const paymentMethods: PaymentMethod[] = [
  { id: "visa", name: "Visa", accent: "#1a1f71" },
  { id: "mastercard", name: "Mastercard", accent: "#eb001b" },
  { id: "skrill", name: "Skrill", accent: "#7b2c8a" },
  { id: "neteller", name: "Neteller", accent: "#00a94f" },
  { id: "trustly", name: "Trustly", accent: "#0ee06e" },
  { id: "paysafecard", name: "Paysafecard", accent: "#00a4e0" },
  { id: "applepay", name: "Apple Pay", accent: "#111111" },
  { id: "googlepay", name: "Google Pay", accent: "#4285f4" },
  { id: "crypto", name: "Crypto", accent: "#F7931A" },
  { id: "banktransfer", name: "Bank Transfer", accent: "#0057B8" },
  { id: "gigadat", name: "Gigadat", accent: "#e11d48" },
  { id: "jeton", name: "Jeton Wallet", accent: "#0d9488" },
  { id: "jcb", name: "JCB", accent: "#0b7abf" },
  { id: "discover", name: "Discover", accent: "#FF6000" },
  { id: "interac", name: "Interac", accent: "#FFB600" },
  { id: "pix", name: "Pix", accent: "#32BCAD" },
  { id: "bitcoin", name: "Bitcoin", accent: "#F7931A" },
  { id: "ethereum", name: "Ethereum", accent: "#627EEA" },
  { id: "tether", name: "Tether", accent: "#26A17B" },
  { id: "litecoin", name: "Litecoin", accent: "#345D9D" },
  { id: "tron", name: "TRON", accent: "#EF0027" },
  { id: "dai", name: "DAI", accent: "#F5AC37" },
  { id: "dogecoin", name: "Dogecoin", accent: "#C2A633" },
  { id: "cardano", name: "Cardano", accent: "#0033AD" },
  { id: "binance", name: "Binance Pay", accent: "#F3BA2F" },
  { id: "usdcoin", name: "USD Coin", accent: "#2775CA" },
  { id: "ripple", name: "Ripple", accent: "#23292F" },
  { id: "moonpay", name: "MoonPay", accent: "#7B3FF2" },
  { id: "paypal", name: "PayPal", accent: "#003087" },
  { id: "rapidtransfer", name: "Rapid Transfer", accent: "#00A86B" },
  { id: "mifinity", name: "MiFinity", accent: "#3B82F6" },
  { id: "cashtocode", name: "CashtoCode", accent: "#E53935" },
  { id: "revolut", name: "Revolut", accent: "#111111" },
  { id: "zimpler", name: "Zimpler", accent: "#6D28D9" },
  { id: "sirumobile", name: "Siru Mobile", accent: "#E91E63" },
  { id: "bitcoincash", name: "Bitcoin Cash", accent: "#8DC351" },
  { id: "maestro", name: "Maestro", accent: "#0099DF" },
  { id: "sofort", name: "Sofort", accent: "#FF5A00" },
  { id: "khipu", name: "Khipu", accent: "#00AEEF" },
  { id: "blik", name: "BLIK", accent: "#E5005A" },
  { id: "neosurf", name: "Neosurf", accent: "#7AC143" },
  { id: "postepay", name: "PostePay", accent: "#FFD200" },
  { id: "playid", name: "PlayID", accent: "#2563EB" },
  { id: "jetonbank", name: "JetonBank", accent: "#0D9488" },
  { id: "utorg", name: "UTORG", accent: "#FF6B00" },
  { id: "muchbetter", name: "MuchBetter", accent: "#12B886" },
  { id: "webpay", name: "WebPay", accent: "#7E57C2" },
  { id: "safetypay", name: "SafetyPay", accent: "#00A0DF" },
];

export const paymentMethodMap = new Map(paymentMethods.map((m) => [m.id, m]));

/** Individual crypto assets are grouped into one generic Crypto option in discovery UIs. */
export const cryptoPaymentMethodIds = new Set([
  "crypto",
  "bitcoin",
  "ethereum",
  "tether",
  "litecoin",
  "tron",
  "dai",
  "dogecoin",
  "cardano",
  "binance",
  "usdcoin",
  "ripple",
  "bitcoincash",
]);

export function isCryptoPaymentMethod(id: string) {
  return cryptoPaymentMethodIds.has(id);
}

/** Homepage/filter list: fiat and wallet methods plus one consolidated Crypto chip. */
export const discoveryPaymentMethods = paymentMethods.filter(
  (method) => method.id === "crypto" || !isCryptoPaymentMethod(method.id),
);
