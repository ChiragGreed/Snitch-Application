import { Platform, StyleSheet } from 'react-native';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

export const confirmationStyles = StyleSheet.create({
  // ─── Root ────────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingBottom: 60,
    gap: SnitchSpacing.gutter,
  },

  // ─── Minimal top bar (no SnitchHeader — this is a terminal screen) ───────────
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  topBarBrand: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: SnitchColors.textPrimary,
    textTransform: 'uppercase',
  },
  topBarSecure: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topBarSecureText: {
    fontSize: 11,
    fontWeight: '600',
    color: SnitchColors.textMuted,
    letterSpacing: 0.3,
  },

  // ─── Hero Success Banner ─────────────────────────────────────────────────────
  heroBanner: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    paddingVertical: 28,
    paddingHorizontal: SnitchSpacing.xl,
    alignItems: 'center',
    gap: SnitchSpacing.md,
    marginTop: SnitchSpacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },
  successIconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(39, 131, 74, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroGreeting: {
    fontSize: 20,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  orderIdChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    marginTop: 4,
  },
  orderIdLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: SnitchColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  orderIdValue: {
    fontSize: 12,
    fontWeight: '800',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ─── Status Timeline ─────────────────────────────────────────────────────────
  timelineCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    paddingVertical: 16,
    paddingHorizontal: SnitchSpacing.gutter,
    gap: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  timelineCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
    minHeight: 44,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 20,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotActive: {
    backgroundColor: SnitchColors.success,
  },
  timelineDotPending: {
    backgroundColor: SnitchColors.surfaceContainerHigh,
    borderWidth: 1.5,
    borderColor: SnitchColors.border,
  },
  timelineConnector: {
    flex: 1,
    width: 2,
    backgroundColor: SnitchColors.border,
    marginVertical: 2,
  },
  timelineConnectorActive: {
    backgroundColor: SnitchColors.success,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  timelineLabelPending: {
    fontSize: 13,
    fontWeight: '500',
    color: SnitchColors.textMuted,
  },
  timelineSubtext: {
    fontSize: 11,
    color: SnitchColors.textMuted,
    marginTop: 2,
  },

  // ─── Section Card ────────────────────────────────────────────────────────────
  card: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    padding: SnitchSpacing.gutter,
    gap: SnitchSpacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textSecondary,
  },

  // ─── Item Row (compact) ──────────────────────────────────────────────────────
  itemRow: {
    flexDirection: 'row',
    gap: SnitchSpacing.md,
    alignItems: 'flex-start',
  },
  itemThumbnail: {
    width: 60,
    height: 76,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainer,
    overflow: 'hidden',
  },
  itemDetails: {
    flex: 1,
    paddingTop: 2,
    gap: 3,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.1,
  },
  itemMeta: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.2,
    marginTop: 2,
  },
  itemDivider: {
    height: 1,
    backgroundColor: SnitchColors.border,
    marginVertical: 2,
  },

  // ─── Bill rows ───────────────────────────────────────────────────────────────
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  billValueFree: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.success,
  },
  billDivider: {
    height: 1,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    marginVertical: 4,
  },
  billTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  billTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  billTotalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.4,
  },

  // ─── Address block ───────────────────────────────────────────────────────────
  addressName: {
    fontSize: 15,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  addressText: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
    lineHeight: 20,
  },
  addressPhone: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    marginTop: 2,
  },

  // ─── Need Help card ──────────────────────────────────────────────────────────
  needHelpCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    padding: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
  },
  needHelpIcon: {
    width: 44,
    height: 44,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needHelpTextGroup: { flex: 1 },
  needHelpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  needHelpSubtitle: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    marginTop: 2,
    lineHeight: 17,
  },

  // ─── CTA Buttons ─────────────────────────────────────────────────────────────
  ctaRow: {
    flexDirection: 'row',
    gap: SnitchSpacing.sm,
    marginTop: 4,
  },
  ctaPrimary: {
    flex: 1,
    height: 50,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  ctaPrimaryText: {
    color: SnitchColors.onPrimary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  ctaSecondary: {
    flex: 1,
    height: 50,
    borderRadius: SnitchRadius.md,
    borderWidth: 1.5,
    borderColor: SnitchColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SnitchColors.surfaceCard,
  },
  ctaSecondaryText: {
    color: SnitchColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
