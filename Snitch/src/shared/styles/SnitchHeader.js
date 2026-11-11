import { StyleSheet } from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';

export const styles = StyleSheet.create({
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
    headerTitle: {
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
        backgroundColor: SnitchColors.surfaceContainerLow,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
