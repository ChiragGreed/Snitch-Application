import { StyleSheet, Platform } from 'react-native';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

export const styles = StyleSheet.create({
  // ─── Root & Container ───────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.md,
    paddingBottom: 120, // Breathing room for sticky bottom checkout sheet
    gap: SnitchSpacing.gutter,
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
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.5,
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
    borderRadius: SnitchRadius.full,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.secondaryMuted,
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

  // ─── Title & Meta ───────────────────────────────────────────────────────────
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SnitchSpacing.xs,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: SnitchColors.textPrimary,
  },
  itemCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  itemCountText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textSecondary,
  },
  moveWishlistButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  moveWishlistText: {
    fontSize: 12,
    fontWeight: '500',
    color: SnitchColors.secondaryMuted,
    letterSpacing: 0.2,
  },

  // ─── Free Shipping Progress Tracker ─────────────────────────────────────────
  shippingTrackerCard: {
    padding: 14,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceContainerLow,
    gap: SnitchSpacing.sm,
  },
  shippingTrackerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingTrackerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs + 2,
  },
  shippingTrackerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  shippingTrackerAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.secondaryMuted,
  },
  shippingNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  shippingNoticeText: {
    fontSize: 11,
    color: SnitchColors.textMuted,
    lineHeight: 16,
  },
  shippingNoticeHighlight: {
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },

  // ─── Cart Line Items ────────────────────────────────────────────────────────
  itemsList: {
    gap: SnitchSpacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    gap: SnitchSpacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  itemThumbnailContainer: {
    width: 92,
    height: 122,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainer,
    overflow: 'hidden',
    position: 'relative',
  },
  itemThumbnail: {
    width: '100%',
    height: '100%',
  },
  topPickBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: SnitchRadius.xs,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
  },
  topPickBadgeText: {
    color: SnitchColors.onPrimary,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SnitchSpacing.xs,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: SnitchColors.textPrimary,
  },
  itemDeleteButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
    marginRight: -6,
  },
  itemFabricText: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    marginTop: 2,
  },
  itemChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  itemChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemChipText: {
    fontSize: 10,
    color: SnitchColors.textPrimary,
    fontWeight: '500',
  },
  itemChipBold: {
    fontWeight: '700',
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SnitchSpacing.sm,
    paddingTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: SnitchColors.textPrimary,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SnitchColors.surfaceContainer,
    borderRadius: SnitchRadius.sm,
    padding: 2,
    height: 30,
  },
  stepperButton: {
    width: 26,
    height: 26,
    borderRadius: SnitchRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  stepperValue: {
    width: 26,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  // ─── Promo / Voucher Card ───────────────────────────────────────────────────
  voucherCard: {
    padding: 14,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    gap: SnitchSpacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  voucherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voucherTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs + 2,
  },
  voucherTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  voucherStatusApplied: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.secondaryMuted,
  },
  voucherChipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: SnitchRadius.md,
    backgroundColor: 'rgba(197, 160, 89, 0.18)',
  },
  voucherChipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    flex: 1,
  },
  voucherCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  voucherCodeText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: SnitchColors.textPrimary,
  },
  voucherDiscountTag: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: SnitchRadius.xs,
    backgroundColor: SnitchColors.surfaceContainer,
  },
  voucherDiscountTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  voucherSavingsSubtext: {
    fontSize: 11,
    color: SnitchColors.textSecondary,
    marginTop: 2,
  },
  voucherRemoveBtn: {
    width: 28,
    height: 28,
    borderRadius: SnitchRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoDrawerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  promoDrawerTriggerText: {
    fontSize: 12,
    fontWeight: '500',
    color: SnitchColors.textMuted,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    marginTop: 4,
  },
  promoInput: {
    flex: 1,
    height: 42,
    borderRadius: SnitchRadius.sm,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    paddingHorizontal: 12,
    fontSize: 13,
    backgroundColor: SnitchColors.canvas,
    color: SnitchColors.textPrimary,
    textTransform: 'uppercase',
  },
  promoApplyBtn: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoApplyBtnText: {
    color: SnitchColors.onPrimary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // ─── Order Summary Card ─────────────────────────────────────────────────────
  summaryCard: {
    padding: 16,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    gap: SnitchSpacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    marginBottom: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  summaryRowLabel: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
  },
  summaryRowLabelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryRowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  discountBadgeChip: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: SnitchRadius.xs,
    backgroundColor: '#FFDCBE', // Secondary fixed tone
  },
  discountBadgeChipText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2A1704',
    letterSpacing: 0.5,
  },
  discountValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.secondaryMuted,
  },
  deliveryValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deliveryStrikethrough: {
    fontSize: 13,
    color: SnitchColors.textLight,
    textDecorationLine: 'line-through',
  },
  freeDeliveryTag: {
    fontSize: 12,
    fontWeight: '700',
    color: SnitchColors.secondaryMuted,
    letterSpacing: 0.5,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    marginVertical: SnitchSpacing.xs + 2,
  },
  totalPayableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  totalPayableLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  totalSavingsSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: SnitchColors.secondaryMuted,
    marginTop: 2,
  },
  totalPayableAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.5,
  },

  // ─── Trust & Assurance Badges ───────────────────────────────────────────────
  trustGrid: {
    flexDirection: 'row',
    gap: SnitchSpacing.sm,
  },
  trustCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    padding: 12,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  trustCardTextGroup: {
    flex: 1,
  },
  trustCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    lineHeight: 16,
  },
  trustCardSubtitle: {
    fontSize: 10,
    color: SnitchColors.textMuted,
    lineHeight: 14,
    marginTop: 2,
  },

  // ─── Complete The Look Card ─────────────────────────────────────────────────
  completeLookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    gap: SnitchSpacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  completeLookLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    flex: 1,
  },
  completeLookThumb: {
    width: 48,
    height: 56,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainer,
  },
  completeLookTextGroup: {
    flex: 1,
  },
  completeLookCategory: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.secondaryMuted,
  },
  completeLookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    marginTop: 1,
  },
  completeLookPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  completeLookPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  completeLookStrikethrough: {
    fontSize: 11,
    color: SnitchColors.textLight,
    textDecorationLine: 'line-through',
  },
  addAndSaveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainer,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  addAndSaveBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  // ─── Sticky Bottom Checkout Sheet ───────────────────────────────────────────
  stickyCheckoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(250, 249, 246, 0.96)', // Blended surface
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  stickyBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.md,
  },
  stickyPriceGroup: {
    minWidth: 100,
  },
  stickyPriceLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: SnitchColors.textMuted,
  },
  stickyPriceValues: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 1,
  },
  stickyPriceTotal: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: SnitchColors.textPrimary,
  },
  stickyPriceOriginal: {
    fontSize: 12,
    color: SnitchColors.textLight,
    textDecorationLine: 'line-through',
  },
  checkoutButton: {
    flex: 1,
    height: 52,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.xs + 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  checkoutButtonText: {
    color: SnitchColors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // ─── Empty Cart State ───────────────────────────────────────────────────────
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: SnitchSpacing.xl,
    gap: SnitchSpacing.md,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SnitchSpacing.sm,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  exploreBtn: {
    marginTop: SnitchSpacing.sm,
    height: 46,
    paddingHorizontal: 24,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreBtnText: {
    color: SnitchColors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
