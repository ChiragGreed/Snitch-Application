import { StyleSheet } from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';

export const authSharedStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: SnitchColors.primary,
    },
    backButton: {
        position: 'absolute',
        left: SnitchSpacing.xl,
        zIndex: 2,
        width: 44,
        height: 44,
        borderRadius: SnitchRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.35)',
    },
    heroContent: {
        paddingHorizontal: SnitchSpacing.xl,
        paddingBottom: 64,
        flex: 1,
        justifyContent: 'flex-end',
    },
    heroBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.xs,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: SnitchRadius.full,
        marginBottom: SnitchSpacing.sm,
    },
    sheetWrapper: {
        flex: 1,
        marginTop: -SnitchSpacing.xxl,
    },
    sheetContent: {
        paddingHorizontal: SnitchSpacing.xl,
        paddingTop: SnitchSpacing.md,
        gap: SnitchSpacing.md,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.borderVariant,
        alignSelf: 'center',
        marginBottom: SnitchSpacing.sm,
    },
    titleBlock: {
        alignItems: 'center',
        gap: 4,
        marginBottom: SnitchSpacing.xs,
    },
    sheetTitle: {
        fontSize: 28,
        fontWeight: '600',
        letterSpacing: -0.5,
        color: SnitchColors.textPrimary,
    },
    sheetSubtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.xs,
    },
    sheetSubtitle: {
        fontSize: 12,
        color: SnitchColors.textMuted,
    },
    linkText: {
        fontSize: 12,
        marginBlock:5,
        color: SnitchColors.secondaryMuted,
        fontWeight: '600',
    },
    form: {
        gap: SnitchSpacing.md,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: SnitchColors.textPrimary,
        padding: 0,
    },
    checkboxChecked: {
        backgroundColor: SnitchColors.primary,
        borderColor: SnitchColors.primary,
    },
    ctaButton: {
        height: 52,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SnitchSpacing.xs,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    ctaButtonText: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: SnitchColors.onPrimary,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.md,
        marginVertical: SnitchSpacing.xs,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: SnitchColors.border,
    },
    dividerText: {
        fontSize: 11,
        letterSpacing: 0.6,
        color: SnitchColors.textLight,
        textTransform: 'uppercase',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SnitchSpacing.sm,
        height: 48,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: SnitchColors.border,
    },
    socialButtonText: {
        fontSize: 13,
        fontWeight: '500',
        color: SnitchColors.textPrimary,
    },
    googleIconWrap: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIconText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#4285F4',
    },
});

export const authHeroTextShadows = {
    supporting: {
        textShadowColor: 'rgba(0,0,0,0.9)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    title: {
        textShadowColor: 'rgba(0,0,0,0.9)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5,
    },
};
