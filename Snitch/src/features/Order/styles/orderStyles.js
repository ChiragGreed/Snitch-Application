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
    paddingBottom: 48,
    gap: SnitchSpacing.md,
  },

  // ─── Page Title ──────────────────────────────────────────────────────────────
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SnitchSpacing.xs,
    marginBottom: SnitchSpacing.xs,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: SnitchColors.textPrimary,
  },
  orderCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  orderCountText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textSecondary,
  },

  // ─── Order Card ──────────────────────────────────────────────────────────────
  orderCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  // ── Card Header ──
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  orderMeta: {
    gap: 2,
  },
  orderId: {
    fontSize: 12,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: 11,
    color: SnitchColors.textMuted,
    letterSpacing: 0.1,
  },

  // ── Status Pill ──
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SnitchRadius.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // ── Item Thumbnails Strip ──
  thumbnailsRow: {
    flexDirection: 'row',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: 14,
    gap: SnitchSpacing.sm,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  thumbnail: {
    width: 72,
    height: 90,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainer,
    overflow: 'hidden',
  },
  overflowBadge: {
    width: 72,
    height: 90,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  overflowBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: SnitchColors.textSecondary,
  },

  // ── Card Footer ──
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: 12,
  },
  itemSummaryText: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },
  itemSummaryBold: {
    fontWeight: '700',
    color: SnitchColors.textSecondary,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  viewDetailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.3,
  },

  // ─── Need Help Card ──────────────────────────────────────────────────────────
  needHelpCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    padding: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    marginTop: SnitchSpacing.xs,
  },
  needHelpIcon: {
    width: 44,
    height: 44,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needHelpText: {
    flex: 1,
  },
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
  needHelpChevron: {
    padding: 4,
  },

  // ─── Empty Orders State ──────────────────────────────────────────────────────
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 72,
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
  shopNowBtn: {
    marginTop: SnitchSpacing.sm,
    height: 46,
    paddingHorizontal: 24,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopNowBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // ─── Section Divider Label ───────────────────────────────────────────────────
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: SnitchColors.textLight,
    marginTop: SnitchSpacing.xs,
  },
});
