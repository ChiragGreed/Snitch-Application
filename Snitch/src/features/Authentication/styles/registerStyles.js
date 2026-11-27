import { StyleSheet } from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import { authHeroTextShadows, authSharedStyles } from './authStyles';

const pageStyles = StyleSheet.create({
    hero: {
        height: '42%',
        minHeight: 260,
        position: 'relative',
    },
    heroOverlayDark: {
        backgroundColor: 'rgba(28,28,26,0.72)',
    },
    heroOverlayWarm: {
        backgroundColor: 'rgba(116,89,63,0.12)',
    },
    heroBadgeVariant: {
        backgroundColor: 'rgba(255,255,255,0.18)',
    },
    heroBadgeDot: {
        width: 6,
        height: 6,
        borderRadius: SnitchRadius.full,
        backgroundColor: '#FED9B8',
    },
    heroBadgeText: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 2,
        color: '#FED9B8',
        ...authHeroTextShadows.supporting,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '300',
        color: '#FFFFFF',
        letterSpacing: -0.4,
        lineHeight: 34,
        ...authHeroTextShadows.title,
    },
    heroTitleItalic: {
        fontStyle: 'italic',
        fontWeight: '400',
        color: '#FED9B8',
        ...authHeroTextShadows.title,
    },
    heroSubtitle: {
        marginTop: SnitchSpacing.sm,
        fontSize: 11,
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: 0.3,
        ...authHeroTextShadows.supporting,
    },
    sheet: {
        flex: 1,
        backgroundColor: SnitchColors.surfaceCard,
        borderTopLeftRadius: SnitchRadius.xl + 8,
        borderTopRightRadius: SnitchRadius.xl + 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
        elevation: 16,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.md,
        minHeight: 52,
        paddingHorizontal: SnitchSpacing.gutter,
        paddingVertical: SnitchSpacing.md,
        borderRadius: SnitchRadius.lg,
        backgroundColor: SnitchColors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: SnitchColors.border,
    },
    phonePrefixBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    phonePrefixLabel: {
        fontSize: 11,
        color: SnitchColors.textMuted,
    },
    phonePrefixCode: {
        fontSize: 14,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },
    phoneDivider: {
        width: 1,
        height: 18,
        backgroundColor: SnitchColors.borderVariant,
        marginHorizontal: SnitchSpacing.xs,
    },
    sellerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SnitchSpacing.sm,
        paddingVertical: SnitchSpacing.xs,
    },
    checkbox: {
        marginTop: 1,
        width: 18,
        height: 18,
        borderRadius: SnitchRadius.xs,
        borderWidth: 1.5,
        borderColor: SnitchColors.borderVariant,
        backgroundColor: SnitchColors.surfaceContainerLow,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    sellerTextBlock: {
        flex: 1,
        gap: 2,
    },
    sellerLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },
    sellerSub: {
        fontSize: 11,
        color: SnitchColors.textMuted,
        lineHeight: 16,
    },
    termsText: {
        fontSize: 10,
        color: SnitchColors.textLight,
        textAlign: 'center',
        lineHeight: 16,
        paddingHorizontal: SnitchSpacing.md,
        marginTop: SnitchSpacing.xs,
    },
    termsLink: {
        textDecorationLine: 'underline',
        color: SnitchColors.textMuted,
    },
});

export const styles = { ...authSharedStyles, ...pageStyles };
