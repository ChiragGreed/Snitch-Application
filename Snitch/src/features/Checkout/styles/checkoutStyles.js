import { Platform, StyleSheet } from 'react-native';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

export const styles = StyleSheet.create({
  // ─── Root & Layout ──────────────────────────────────────────────────────────
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
    paddingBottom: 120,
    gap: SnitchSpacing.gutter,
  },

  // ─── Header (Back button style) ─────────────────────────────────────────────
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
  headerBackButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: SnitchColors.textPrimary,
  },
  headerSecure: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerSecureText: {
    fontSize: 11,
    fontWeight: '500',
    color: SnitchColors.textMuted,
    letterSpacing: 0.2,
  },

  // ─── Stepper ────────────────────────────────────────────────────────────────
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SnitchSpacing.md,
    paddingHorizontal: SnitchSpacing.gutter,
    backgroundColor: SnitchColors.surfaceContainerLow,
    gap: 0,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: SnitchRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: SnitchColors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: SnitchColors.primary,
  },
  stepCirclePending: {
    backgroundColor: SnitchColors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: SnitchColors.borderVariant,
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: SnitchColors.onPrimary,
  },
  stepNumberPending: {
    fontSize: 11,
    fontWeight: '500',
    color: SnitchColors.textMuted,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: SnitchColors.textPrimary,
  },
  stepLabelPending: {
    fontSize: 11,
    fontWeight: '500',
    color: SnitchColors.textMuted,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  stepConnector: {
    width: 28,
    height: 2,
    backgroundColor: SnitchColors.primary,
    marginHorizontal: 2,
  },
  stepConnectorPending: {
    width: 28,
    height: 2,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    marginHorizontal: 2,
  },

  // ─── Section Card ────────────────────────────────────────────────────────────
  card: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    padding: SnitchSpacing.gutter,
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
      android: { elevation: 1 },
    }),
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: SnitchColors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionLabelText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: SnitchColors.secondary,
  },

  // ─── Address Card ────────────────────────────────────────────────────────────
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressChangBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  addressChangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.2,
  },
  addressNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    marginTop: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  addressTypeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  addressTypeBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: SnitchColors.textSecondary,
  },
  addressText: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
    lineHeight: 20,
    marginTop: 4,
  },
  addressPhone: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
    marginTop: 2,
  },

  // ─── Delivery Speed ──────────────────────────────────────────────────────────
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: SnitchRadius.md,
    borderWidth: 2,
    marginBottom: SnitchSpacing.sm,
  },
  deliveryOptionSelected: {
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderColor: SnitchColors.primary,
  },
  deliveryOptionUnselected: {
    backgroundColor: SnitchColors.surfaceCard,
    borderColor: SnitchColors.border,
  },
  deliveryOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    flex: 1,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: SnitchColors.primary,
  },
  radioOuterUnselected: {
    borderColor: SnitchColors.borderVariant,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: SnitchColors.primary,
  },
  deliveryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  deliverySubtitle: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    marginTop: 2,
  },
  deliveryBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.secondaryContainer,
    marginBottom: 4,
  },
  deliveryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: SnitchColors.secondary,
  },
  deliveryPriceFree: {
    fontSize: 13,
    fontWeight: '800',
    color: SnitchColors.secondaryMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deliveryPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  // ─── Bag Summary ─────────────────────────────────────────────────────────────
  bagHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bagEditBtn: {
    fontSize: 12,
    fontWeight: '500',
    color: SnitchColors.textMuted,
    letterSpacing: 0.2,
  },
  bagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.sm,
  },
  bagItemDivider: {
    height: 1,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  bagItemThumbnail: {
    width: 60,
    height: 76,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainer,
    overflow: 'hidden',
  },
  bagItemThumbnailImg: {
    width: '100%',
    height: '100%',
  },
  bagItemThumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: SnitchColors.surfaceContainer,
  },
  bagItemDetails: {
    flex: 1,
  },
  bagItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.1,
  },
  bagItemMeta: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    marginTop: 3,
  },
  bagItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.2,
    marginTop: 5,
  },

  // ─── Bill Details ────────────────────────────────────────────────────────────
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  billLabel: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
  },
  billValue: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  billValueFree: {
    fontSize: 13,
    fontWeight: '800',
    color: SnitchColors.secondaryMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  billDivider: {
    height: 1,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    marginVertical: SnitchSpacing.sm,
  },
  billTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  billTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  billTotalAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.5,
  },

  // ─── Security Badge ───────────────────────────────────────────────────────────
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    padding: 14,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  securityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  securitySubtitle: {
    fontSize: 11,
    color: SnitchColors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },

  // ─── Sticky Pay Bar ──────────────────────────────────────────────────────────
  payBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: SnitchColors.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  payBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
  },
  payBarPriceGroup: {
    minWidth: 90,
  },
  payBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: SnitchColors.textMuted,
  },
  payBarAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.4,
    marginTop: 1,
  },
  payButton: {
    flex: 1,
    height: 52,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: SnitchColors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // ─── Empty Cart ───────────────────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: SnitchSpacing.xl,
    gap: SnitchSpacing.md,
  },
  emptyIconContainer: {
    width: 72,
    height: 72,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SnitchSpacing.sm,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBackBtn: {
    marginTop: SnitchSpacing.sm,
    height: 46,
    paddingHorizontal: 24,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBackBtnText: {
    color: SnitchColors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

