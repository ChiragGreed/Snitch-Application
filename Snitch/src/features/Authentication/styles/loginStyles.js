import { StyleSheet } from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import { authHeroTextShadows, authSharedStyles } from './authStyles';

const pageStyles = StyleSheet.create({
    hero: {
        height: '48%',
        minHeight: 280,
        position: 'relative',
    },
    heroOverlay: {
        backgroundColor: 'rgba(0,0,0,0.55)',
    },
    heroBadgeVariant: {
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    heroBadgeDot: {
        width: 6,
        height: 6,
        borderRadius: SnitchRadius.full,
        backgroundColor: '#E4C0A0',
    },
    heroBadgeText: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 2,
        color: '#E4C0A0',
        ...authHeroTextShadows.supporting,
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: -0.5,
        lineHeight: 36,
        ...authHeroTextShadows.title,
    },
    heroTitleItalic: {
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#E4C0A0',
        ...authHeroTextShadows.title,
    },
    heroStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.xs,
        marginTop: SnitchSpacing.md,
        flexWrap: 'wrap',
    },
    heroStat: {
        fontSize: 10,
        letterSpacing: 0.8,
        color: 'rgba(255,255,255,0.75)',
        textTransform: 'uppercase',
        fontWeight: '500',
        ...authHeroTextShadows.supporting,
    },
    heroStatBold: {
        color: '#FFFFFF',
        fontWeight: '700',
        ...authHeroTextShadows.supporting,
    },
    heroStatDot: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 10,
        ...authHeroTextShadows.supporting,
    },
    sheet: {
        flex: 1,
        backgroundColor: SnitchColors.surfaceCard,
        borderTopLeftRadius: SnitchRadius.xl + 8,
        borderTopRightRadius: SnitchRadius.xl + 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.16,
        shadowRadius: 20,
        elevation: 16,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.md,
        height: 52,
        paddingHorizontal: SnitchSpacing.gutter,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: SnitchColors.border,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SnitchSpacing.xs,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.sm,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: SnitchRadius.xs,
        borderWidth: 1.5,
        borderColor: SnitchColors.borderVariant,
        backgroundColor: SnitchColors.surfaceContainerLow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rememberText: {
        fontSize: 12,
        color: SnitchColors.textMuted,
    },
    securityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SnitchSpacing.xs,
        marginTop: SnitchSpacing.xs,
    },
    securityText: {
        fontSize: 10,
        color: SnitchColors.textLight,
    },
    forgotBackRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.xs,
    },
    forgotTitleBlock: {
        gap: SnitchSpacing.xs,
        marginBottom: SnitchSpacing.xl,
    },
    forgotFieldGroup: {
        gap: SnitchSpacing.sm,
    },
    forgotFieldLabel: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 1.5,
        color: SnitchColors.textLight,
        textTransform: 'uppercase',
    },
    emailSentContainer: {
        flex: 1,
        width: '100%',
        paddingVertical: SnitchSpacing.xxl,
        gap: 0,
    },
    emailSentIconRing: {
        width: 80,
        height: 80,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.surfaceContainer,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: SnitchSpacing.xxl,
    },
    emailSentBodyBlock: {
        alignItems: 'center',
        marginBottom: SnitchSpacing.lg,
        gap: SnitchSpacing.xs,
    },
    emailSentBody: {
        fontSize: 13,
        color: SnitchColors.textMuted,
        textAlign: 'center',
        lineHeight: 20,
    },
    emailSentAddress: {
        fontSize: 14,
        fontWeight: '700',
        color: SnitchColors.textPrimary,
        textAlign: 'center',
    },
    emailSentHint: {
        fontSize: 12,
        color: SnitchColors.textLight,
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: SnitchSpacing.xl,
        marginBottom: SnitchSpacing.xxl,
    },
    emailSentSpacer: {
        flex: 1,
    },
});

export const styles = { ...authSharedStyles, ...pageStyles };
