import { Platform, StyleSheet } from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';

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
    paddingTop: SnitchSpacing.sm,
    paddingBottom: 60,
    gap: SnitchSpacing.gutter,
  },

  // ─── Editorial Intro & Meta ─────────────────────────────────────────────────
  introSection: {
    paddingTop: SnitchSpacing.xs,
    paddingBottom: SnitchSpacing.xs,
    gap: 4,
  },
  introHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.sm,
  },
  introTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: SnitchColors.textPrimary,
  },
  countBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textSecondary,
  },
  addInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  addInlineBtnText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: SnitchColors.textPrimary,
  },
  introSubtitle: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    lineHeight: 18,
    marginTop: 2,
  },

  // ─── Primary Action Card: Add New Address ────────────────────────────────────
  addNewCard: {
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.lg,
    padding: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: SnitchColors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  addNewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    flex: 1,
  },
  addNewIconCircle: {
    width: 40,
    height: 40,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewTitleGroup: {
    gap: 2,
    flex: 1,
  },
  addNewTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: SnitchColors.textPrimary,
  },
  addNewSubtitle: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },

  // ─── Address Cards Stack ─────────────────────────────────────────────────────
  cardsStack: {
    gap: SnitchSpacing.md,
  },
  addressCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    padding: SnitchSpacing.gutter,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.onPrimary,
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.secondaryContainer,
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.secondary,
  },
  tagBadgeNeutral: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHighest,
  },
  tagBadgeNeutralText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textSecondary,
  },
  typeIconCircle: {
    width: 32,
    height: 32,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Card Body ──
  cardBody: {
    gap: 3,
    marginBottom: 14,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  personName: {
    fontSize: 16,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.2,
  },
  personPhone: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },
  addressLines: {
    gap: 2,
    marginTop: 2,
  },
  addressLine: {
    fontSize: 12,
    color: SnitchColors.textSecondary,
    lineHeight: 18,
  },
  addressCityPin: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    lineHeight: 18,
    marginTop: 2,
  },

  // ── Card Actions ──
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    gap: SnitchSpacing.lg,
  },
  cardActionsWithDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    gap: SnitchSpacing.sm,
    flexWrap: 'wrap',
  },
  setDefaultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  setDefaultText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.secondaryMuted,
  },
  actionButtonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.lg,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textPrimary,
  },
  actionBtnTextRemove: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textMuted,
  },

  // ─── Luxury Packaging & Concierge Assurance ──────────────────────────────────
  assuranceCard: {
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.lg,
    padding: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SnitchSpacing.md,
    marginTop: SnitchSpacing.xs,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  assuranceIconCircle: {
    width: 34,
    height: 34,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assuranceContent: {
    flex: 1,
    gap: 3,
  },
  assuranceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  assuranceSubtitle: {
    fontSize: 11,
    color: SnitchColors.textMuted,
    lineHeight: 16,
  },

  // ─── Editorial Micro-Card / Brand Note ───────────────────────────────────────
  brandMicroCard: {
    alignItems: 'center',
    paddingVertical: SnitchSpacing.xs,
  },
  brandMicroText: {
    fontSize: 11,
    fontStyle: 'italic',
    letterSpacing: 0.8,
    color: SnitchColors.secondaryMuted,
  },

  // ─── Bottom Sheet Modal Preview ──────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 18, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: SnitchColors.surfaceCard,
    borderTopLeftRadius: SnitchRadius.xl,
    borderTopRightRadius: SnitchRadius.xl,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.md,
    paddingBottom: Platform.OS === 'ios' ? 34 : SnitchSpacing.xl,
    maxHeight: '92%',
  },
  modalHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: SnitchColors.borderVariant,
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SnitchSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
    marginBottom: SnitchSpacing.sm,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: SnitchColors.textPrimary,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalScrollContent: {
    paddingVertical: SnitchSpacing.xs,
    gap: SnitchSpacing.md,
    paddingBottom: SnitchSpacing.lg,
  },
  detailModalContent: {
    gap: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.sm,
  },
  detailModalRow: {
    gap: 5,
  },
  detailModalText: {
    fontSize: 14,
    color: SnitchColors.textPrimary,
  },

  // ── Form Cards (Sections) ──
  formCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    padding: SnitchSpacing.gutter,
    gap: SnitchSpacing.md,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  cardSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: SnitchColors.secondaryMuted,
  },
  cardSectionSubLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textMuted,
  },
  autoDetectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  autoDetectText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.secondaryMuted,
  },

  // ── Field Rows & Inputs ──
  fieldGroup: {
    gap: 6,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textSecondary,
  },
  optionalTag: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: SnitchColors.textLight,
  },
  inputContainer: {
    height: 48,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.md,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  inputIcon: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputField: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: SnitchColors.textPrimary,
    paddingVertical: 0,
  },
  phonePrefix: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    paddingLeft: 2,
  },
  prefixDivider: {
    width: 1,
    height: 16,
    backgroundColor: SnitchColors.borderVariant,
    marginRight: 2,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  verifiedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: SnitchColors.secondaryMuted,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: SnitchColors.textSecondary,
  },
  fieldInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 2,
    paddingLeft: 2,
  },
  fieldInfoText: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },

  // ── Grid Row (Town/City & State) ──
  gridRow: {
    flexDirection: 'row',
    gap: SnitchSpacing.sm,
  },
  gridCol: {
    flex: 1,
    gap: 6,
  },
  stateOptions: {
    maxHeight: 180,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.md,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  stateOption: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  stateOptionText: {
    fontSize: 13,
    color: SnitchColors.textPrimary,
  },

  // ── Save Destination As (Home / Studio / Other) ──
  destinationTypeRow: {
    flexDirection: 'row',
    gap: SnitchSpacing.sm,
  },
  destinationTypeBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    gap: 6,
  },
  destinationTypeBtnActive: {
    backgroundColor: SnitchColors.primary,
    borderColor: SnitchColors.primary,
  },
  destinationTypeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: SnitchColors.textSecondary,
  },
  destinationTypeTextActive: {
    color: SnitchColors.onPrimary,
  },

  // ── Default Address Preference Card ──
  defaultAddressCard: {
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    padding: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.sm,
  },
  defaultLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    flex: 1,
  },
  defaultStarCircle: {
    width: 36,
    height: 36,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultTextGroup: {
    flex: 1,
    gap: 2,
  },
  defaultCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  defaultCardSubtitle: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: SnitchColors.secondaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  checkboxBoxActive: {
    backgroundColor: SnitchColors.primary,
    borderColor: SnitchColors.primary,
  },

  // ── Modal Submit Button ──
  modalSubmitBtn: {
    height: 50,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  modalSubmitText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: SnitchColors.onPrimary,
  },
});
