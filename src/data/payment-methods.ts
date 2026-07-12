export type PaymentMethod = {
  id: string;
  name: string;
  /** Short accent used to tint the SVG chip. */
  accent: string;
};

export const paymentMethods: PaymentMethod[] = [
  { id: 'visa', name: 'Visa', accent: '#1a1f71' },
  { id: 'mastercard', name: 'Mastercard', accent: '#eb001b' },
  { id: 'paypal', name: 'PayPal', accent: '#003087' },
  { id: 'skrill', name: 'Skrill', accent: '#7b2c8a' },
  { id: 'neteller', name: 'Neteller', accent: '#00a94f' },
  { id: 'trustly', name: 'Trustly', accent: '#0ee06e' },
  { id: 'paysafecard', name: 'Paysafecard', accent: '#00a4e0' },
  { id: 'applepay', name: 'Apple Pay', accent: '#111111' },
  { id: 'googlepay', name: 'Google Pay', accent: '#4285f4' },
  { id: 'bitcoin', name: 'Bitcoin', accent: '#f7931a' },
];

export const paymentMethodMap = new Map(paymentMethods.map((m) => [m.id, m]));
