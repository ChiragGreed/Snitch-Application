import { StyleSheet } from 'react-native';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

export const styles = StyleSheet.create({
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SnitchSpacing.gutter,
    gap: SnitchSpacing.md,
    marginBottom: SnitchSpacing.xl,
  },
  productCard: {
    width: '48%',
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  productImageWrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  productBadge: {
    position: 'absolute',
    top: SnitchSpacing.sm,
    left: SnitchSpacing.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: SnitchRadius.xs,
    backgroundColor: SnitchColors.surfaceCard,
  },
  productBadgePrimary: {
    backgroundColor: SnitchColors.textPrimary,
  },
  productBadgeNeutral: {
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  productBadgePremium: {
    backgroundColor: SnitchColors.secondaryMuted,
  },
  productBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: SnitchColors.textSecondary,
    letterSpacing: 0.8,
  },
  productBadgeTextPrimary: {
    color: '#FFFFFF',
  },
  counterBadge: {
    position: 'absolute',
    bottom: SnitchSpacing.sm,
    left: SnitchSpacing.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: SnitchRadius.xs,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  counterBadgeText: {
    fontSize: 9,
    color: SnitchColors.textMuted,
  },
  wishlistButton: {
    position: 'absolute',
    top: SnitchSpacing.sm,
    right: SnitchSpacing.sm,
    width: 30,
    height: 30,
    borderRadius: SnitchRadius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAddButton: {
    position: 'absolute',
    bottom: SnitchSpacing.sm,
    right: SnitchSpacing.sm,
    width: 30,
    height: 30,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: SnitchSpacing.sm,
    gap: 4,
  },
  swatchesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  colorSwatch: {
    width: 12,
    height: 12,
    borderRadius: SnitchRadius.full,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  extraSwatchesText: {
    fontSize: 10,
    color: SnitchColors.textMuted,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    lineHeight: 16,
  },
  productSubtitle: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingNumber: {
    fontSize: 11,
    fontWeight: '600',
    color: SnitchColors.textSecondary,
  },
  ratingCount: {
    fontSize: 10,
    color: SnitchColors.textLight,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currentPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  strikePrice: {
    fontSize: 11,
    color: SnitchColors.textLight,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: SnitchColors.discountBadge,
  },
  premiumDiscountText: {
    color: SnitchColors.secondaryMuted,
  },
});
