export type PaymentMethod = {
  id: string;
  name: string;
  /** Short accent used to tint the SVG chip. */
  accent: string;
};

export const paymentMethods: PaymentMethod[] = [
  { id: 'visa', name: 'Visa', accent: '#1a1f71' },
  { id: 'mastercard', name: 'Mastercard', accent: '#eb001b' },
  { id: 'skrill', name: 'Skrill', accent: '#7b2c8a' },
  { id: 'neteller', name: 'Neteller', accent: '#00a94f' },
  { id: 'trustly', name: 'Trustly', accent: '#0ee06e' },
  { id: 'paysafecard', name: 'Paysafecard', accent: '#00a4e0' },
  { id: 'applepay', name: 'Apple Pay', accent: '#111111' },
  { id: 'googlepay', name: 'Google Pay', accent: '#4285f4' },
  { id: 'crypto', name: 'Crypto', accent: '#f7931a' },
  { id: 'banktransfer', name: 'Bank Transfer', accent: '#2563eb' },
  { id: 'gigadat', name: 'Gigadat', accent: '#e11d48' },
  { id: 'jeton', name: 'Jeton Wallet', accent: '#0d9488' },
  { id: 'jcb', name: 'JCB', accent: '#0b7abf' },
  { id: 'discover', name: 'Discover', accent: '#f58220' },
  { id: 'interac', name: 'Interac', accent: '#64748b' },
  { id: 'pix', name: 'Pix', accent: '#64748b' },
  { id: 'bitcoin', name: 'Bitcoin', accent: '#64748b' },
  { id: 'ethereum', name: 'Ethereum', accent: '#64748b' },
  { id: 'tether', name: 'Tether', accent: '#64748b' },
  { id: 'litecoin', name: 'Litecoin', accent: '#64748b' },
  { id: 'tron', name: 'TRON', accent: '#64748b' },
  { id: 'dai', name: 'DAI', accent: '#64748b' },
  { id: 'dogecoin', name: 'Dogecoin', accent: '#64748b' },
  { id: 'cardano', name: 'Cardano', accent: '#64748b' },
  { id: 'binance', name: 'Binance', accent: '#64748b' },
  { id: 'usdcoin', name: 'USD Coin', accent: '#64748b' },
  { id: 'ripple', name: 'Ripple', accent: '#64748b' },
  { id: 'moonpay', name: 'MoonPay', accent: '#64748b' },
  { id: 'paypal', name: 'PayPal', accent: '#64748b' },
  { id: 'rapidtransfer', name: 'Rapid Transfer', accent: '#64748b' },
  { id: 'mifinity', name: 'MiFinity', accent: '#64748b' },
  { id: 'maestro', name: 'Maestro', accent: '#64748b' },
  { id: 'sofort', name: 'Sofort', accent: '#64748b' },
  { id: 'khipu', name: 'Khipu', accent: '#64748b' },
  { id: 'blik', name: 'BLIK', accent: '#64748b' },
];

export const paymentMethodMap = new Map(paymentMethods.map((m) => [m.id, m]));
