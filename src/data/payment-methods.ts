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
  { id: 'jeton', name: 'Jeton', accent: '#0d9488' },
];

export const paymentMethodMap = new Map(paymentMethods.map((m) => [m.id, m]));
