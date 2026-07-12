import { z } from 'zod';

/**
 * Data model for the GambleZone MVP.
 * All records in this repository are clearly labelled SAMPLE data. No real
 * licences, bonuses or affiliate credentials are represented.
 */

export const moneySchema = z.object({
  amount: z.number().nonnegative(),
  currency: z.string().length(3),
});

export const casinoLicenseSchema = z.object({
  authority: z.string(),
  licenseNumber: z.string().optional(),
  verificationUrl: z.string().url().optional(),
  markets: z.array(z.string()),
  verifiedAt: z.string(),
});

export const casinoOfferSchema = z.object({
  id: z.string(),
  casinoId: z.string(),
  market: z.string(),
  title: z.string(),
  shortTerms: z.string(),
  fullTermsUrl: z.string().url().optional(),
  bonusCode: z.string().optional(),
  valueText: z.string().optional(),
  wageringText: z.string().optional(),
  minDepositText: z.string().optional(),
  expiresAt: z.string().optional(),
  status: z.enum(['draft', 'active', 'expired', 'paused']),
  verifiedAt: z.string(),
});

export const affiliateLinkSchema = z.object({
  id: z.string(),
  casinoId: z.string(),
  market: z.string(),
  campaign: z.string(),
  destinationUrl: z.string().url(),
  enabled: z.boolean(),
  rel: z.literal('sponsored nofollow'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const payoutSpeedSchema = z.enum(['instant', 'fast', 'standard', 'slow']);
export const bonusTypeSchema = z.enum(['match', 'freespins', 'cashback', 'nodeposit']);

export const casinoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brandColor: z.string(),
  status: z.enum(['draft', 'active', 'paused', 'archived']),

  foundedYear: z.number().int().optional(),
  operatorName: z.string().optional(),
  licenses: z.array(casinoLicenseSchema),

  supportedMarkets: z.array(z.string()),
  blockedMarkets: z.array(z.string()),
  supportedLanguages: z.array(z.string()),
  supportedCurrencies: z.array(z.string()),

  rating: z.number().min(0).max(5),
  editorialScore: z.number().min(0).max(10),

  minDeposit: moneySchema.optional(),
  minWithdrawal: moneySchema.optional(),
  withdrawalTimeText: z.string().optional(),
  payoutSpeed: payoutSpeedSchema,

  paymentMethods: z.array(z.string()),
  gameProviders: z.array(z.string()),
  gameTypes: z.array(z.string()),

  pros: z.array(z.string()),
  cons: z.array(z.string()),

  bonusType: bonusTypeSchema,
  shortDescription: z.string(),
  reviewSummary: z.string(),

  responsibleGamblingTools: z.array(z.string()),
  supportChannels: z.array(z.string()),

  affiliateLinks: z.array(affiliateLinkSchema),
  offers: z.array(casinoOfferSchema),

  publishedAt: z.string().optional(),
  reviewedAt: z.string().optional(),
  nextReviewAt: z.string().optional(),
});

export type Money = z.infer<typeof moneySchema>;
export type CasinoLicense = z.infer<typeof casinoLicenseSchema>;
export type CasinoOffer = z.infer<typeof casinoOfferSchema>;
export type AffiliateLink = z.infer<typeof affiliateLinkSchema>;
export type PayoutSpeed = z.infer<typeof payoutSpeedSchema>;
export type BonusType = z.infer<typeof bonusTypeSchema>;
export type Casino = z.infer<typeof casinoSchema>;
