import { StyleSheet } from 'react-native';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

export const styles = StyleSheet.create({
  // ─── Root ───────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },

  // ─── Header ─────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.sm,
    backgroundColor: SnitchColors.canvas,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },
  brandWordmark: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 3,
    color: SnitchColors.textPrimary,
  },
  headerDivider: {
    width: 1,
    height: 16,
    backgroundColor: SnitchColors.borderVariant,
  },
  headerSub: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs,
  },
  headerIconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.error,
    borderWidth: 1.5,
    borderColor: SnitchColors.canvas,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: SnitchRadius.full,
    overflow: 'hidden',
    marginLeft: SnitchSpacing.xs,
    borderWidth: 1.5,
    borderColor: SnitchColors.border,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  // ─── Search Bar ─────────────────────────────────────────────────────────────
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.full,
    paddingHorizontal: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.sm,
    gap: SnitchSpacing.sm,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: SnitchColors.textPrimary,
    padding: 0,
  },
  searchFilterButton: {
    width: 40,
    height: 40,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },

  // ─── Hero Banner ────────────────────────────────────────────────────────────
  heroCard: {
    height: 420,
    marginHorizontal: SnitchSpacing.gutter,
    marginBottom: SnitchSpacing.gutter,
    borderRadius: SnitchRadius.md,
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: SnitchSpacing.gutter,
  },
  limitedEditionBadge: {
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: SnitchRadius.xs,
  },
  limitedEditionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  dropBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: SnitchRadius.xs,
  },
  dropBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
  },
  heroBottomContent: {
    padding: SnitchSpacing.gutter,
    gap: SnitchSpacing.sm,
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  heroDescription: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 18,
  },
  heroActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    marginTop: SnitchSpacing.xs,
  },
  heroShopButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.sm,
    paddingVertical: SnitchSpacing.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SnitchRadius.xs,
  },
  heroShopButtonText: {
    color: SnitchColors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroBookmarkButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: SnitchRadius.xs,
  },
  heroBookmarkActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  heroDotsContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: SnitchSpacing.sm,
  },
  heroDot: {
    width: 5,
    height: 5,
    borderRadius: SnitchRadius.full,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  heroDotActive: {
    backgroundColor: '#FFFFFF',
    width: 16,
  },

  // ─── Category Chips ─────────────────────────────────────────────────────────
  categoriesSection: {
    marginBottom: SnitchSpacing.gutter,
  },
  categoriesScroll: {
    paddingHorizontal: SnitchSpacing.gutter,
    gap: SnitchSpacing.sm,
  },
  categoryChip: {
    paddingHorizontal: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.sm,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  categoryChipActive: {
    backgroundColor: SnitchColors.textPrimary,
    borderColor: SnitchColors.textPrimary,
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: SnitchColors.textSecondary,
    letterSpacing: 0.8,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },

  // ─── Product Feed / Grid ─────────────────────────────────────────────────────
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    marginBottom: SnitchSpacing.md,
  },
  feedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },
  feedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.3,
  },
  itemsBadge: {
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 2,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    borderRadius: SnitchRadius.full,
  },
  itemsBadgeText: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortLabel: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },
  sortValue: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SnitchSpacing.gutter,
    gap: SnitchSpacing.md,
    marginBottom: SnitchSpacing.xl,
  },

  // ─── Product Card ────────────────────────────────────────────────────────────
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

  // ─── Editorial / Spotlight ───────────────────────────────────────────────────
  spotlightCard: {
    marginHorizontal: SnitchSpacing.gutter,
    marginBottom: SnitchSpacing.xl,
    padding: SnitchSpacing.gutter,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.md,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    gap: SnitchSpacing.sm,
  },
  spotlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spotlightTag: {
    fontSize: 10,
    fontWeight: '700',
    color: SnitchColors.textMuted,
    letterSpacing: 1.5,
  },
  spotlightTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    lineHeight: 24,
  },
  spotlightDescription: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
    lineHeight: 19,
  },
  spotlightLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs,
    marginTop: SnitchSpacing.xs,
  },
  spotlightLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.secondary,
  },

  // ─── Brand Pillars ───────────────────────────────────────────────────────────
  pillarsContainer: {
    flexDirection: 'row',
    marginHorizontal: SnitchSpacing.gutter,
    marginBottom: SnitchSpacing.xl,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    borderRadius: SnitchRadius.md,
    overflow: 'hidden',
  },
  pillarItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: SnitchSpacing.gutter,
    paddingHorizontal: SnitchSpacing.sm,
  },
  pillarBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: SnitchColors.border,
  },
  pillarTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  pillarSubtitle: {
    fontSize: 10,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
});

