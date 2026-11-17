import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';
import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: SnitchColors.canvas,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SnitchSpacing.sm,
        paddingVertical: SnitchSpacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: SnitchColors.border,
        backgroundColor: SnitchColors.canvas,
    },

    headerBtn: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SnitchRadius.full,
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    scroll: {
        flex: 1,
    },

    // Carousel
    carouselContainer: {
        position: 'relative',
        backgroundColor: SnitchColors.surfaceContainerLow,
    },

    slide: {
        width: SCREEN_WIDTH,
        aspectRatio: 4 / 5,
    },

    slideImage: {
        width: '100%',
        height: '100%',
    },

    imagePlaceholder: {
        backgroundColor: SnitchColors.surfaceContainerHigh,
    },

    viewerRoot: {
        flex: 1,
        backgroundColor: SnitchColors.surfaceContainerHighest,
    },

    viewerImageStage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    viewerImageFrame: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewerImage: {
        width: '100%',
        height: '100%',
    },

    viewerCloseButton: {
        position: 'absolute',
        right: 16,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.55)',
    },

    viewerCloseButtonText: {
        color: '#FFFFFF',
        fontSize: 32,
        lineHeight: 16,
        opacity:0.6
    },

    viewerCounter: {
        position: 'absolute',
        left: 20,
    },

    viewerCounterText: {
        color: 'rgba(0,0,0,0.55)',
        fontSize: 14,
        fontWeight: '600',
    },

    viewerNavButton: {
        position: 'absolute',
        top: '50%',
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        opacity: 0.3,
        backgroundColor: 'rgba(0,0,0,0.55)',
    },

    viewerPreviousButton: {
        left: 12,
    },

    viewerNextButton: {
        right: 12,
    },

    viewerControlText: {
        position: 'absolute',
        top: '22%',
        color: '#FFFFFF',
        fontSize: 32,
        lineHeight: 16,
    },

    viewerZoomButton: {
        position: 'absolute',
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: SnitchRadius.full,
        backgroundColor: 'rgba(0,0,0,0.65)',
    },

    viewerZoomText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.6,
    },

    slideCounterBadge: {
        position: 'absolute',
        top: SnitchSpacing.md,
        right: SnitchSpacing.md,
        backgroundColor: 'rgba(26,28,26,0.70)',
        paddingHorizontal: SnitchSpacing.sm,
        paddingVertical: 4,
        borderRadius: SnitchRadius.full,
    },

    slideCounterText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
    },

    // Thumbnails
    thumbStrip: {
        backgroundColor: SnitchColors.canvas,
    },

    thumbStripContent: {
        paddingHorizontal: SnitchSpacing.gutter,
        paddingVertical: SnitchSpacing.sm,
        gap: SnitchSpacing.sm,
        flexDirection: 'row',
    },

    thumb: {
        width: 52,
        height: 68,
        borderRadius: SnitchRadius.sm,
        overflow: 'hidden',
        opacity: 0.5,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },

    thumbActive: {
        opacity: 1,
        borderColor: SnitchColors.textPrimary,
    },

    thumbImage: {
        width: '100%',
        height: '100%',
    },

    // Info
    infoSection: {
        paddingHorizontal: SnitchSpacing.gutter,
        paddingTop: SnitchSpacing.md,
        paddingBottom: SnitchSpacing.sm,
        gap: SnitchSpacing.xs,
    },

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    collectionLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: SnitchColors.textMuted,
        textTransform: 'uppercase',
    },

    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: SnitchColors.surfaceContainerHigh,
        paddingHorizontal: SnitchSpacing.sm,
        paddingVertical: 3,
        borderRadius: SnitchRadius.full,
    },

    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },

    reviewsText: {
        fontSize: 11,
        color: SnitchColors.textMuted,
    },

    productTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
        letterSpacing: -0.3,
        lineHeight: 26,
        marginTop: SnitchSpacing.xs,
    },

    sellerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },

    sellerText: {
        fontSize: 12,
        color: SnitchColors.textMuted,
    },

    dot: {
        color: SnitchColors.borderVariant,
        fontSize: 12,
    },

    shippingTag: {
        fontSize: 12,
        color: SnitchColors.secondary,
        fontWeight: '500',
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: SnitchSpacing.sm,
        marginTop: SnitchSpacing.sm,
    },

    currentPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: SnitchColors.textPrimary,
        letterSpacing: -0.5,
    },

    strikePrice: {
        fontSize: 14,
        color: SnitchColors.textLight,
        textDecorationLine: 'line-through',
    },

    discountBadge: {
        backgroundColor: SnitchColors.surfaceContainerHigh,
        paddingHorizontal: SnitchSpacing.sm,
        paddingVertical: 2,
        borderRadius: SnitchRadius.full,
    },

    discountBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: SnitchColors.discountBadge,
        letterSpacing: 0.5,
    },

    taxNote: {
        fontSize: 11,
        color: SnitchColors.textLight,
        marginTop: 2,
    },

    // Variant attributes
    variantSection: {
        paddingHorizontal: SnitchSpacing.gutter,
        paddingVertical: SnitchSpacing.md,
        borderTopWidth: 1,
        borderTopColor: SnitchColors.border,
        marginTop: SnitchSpacing.sm,
        gap: SnitchSpacing.sm,
    },

    variantTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.sm,
    },

    variantLabel: {
        fontSize: 12,
        color: SnitchColors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },

    variantSelected: {
        fontSize: 14,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },

    variantPillsRow: {
        flexDirection: 'row',
        gap: SnitchSpacing.sm,
    },

    variantPill: {
        height: 44,
        minWidth: 52,
        paddingHorizontal: SnitchSpacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SnitchRadius.sm,
        backgroundColor: SnitchColors.surfaceCard,
        borderWidth: 1,
        borderColor: SnitchColors.border,
    },

    variantPillSelected: {
        backgroundColor: SnitchColors.textPrimary,
        borderColor: SnitchColors.textPrimary,
    },

    variantPillText: {
        fontSize: 13,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },

    variantPillTextSelected: {
        color: '#FFFFFF',
    },

    // Stock availability
    variantStockCard: {
        marginHorizontal: SnitchSpacing.gutter,
        marginVertical: SnitchSpacing.sm,
        padding: SnitchSpacing.md,
        backgroundColor: SnitchColors.surfaceContainerLow,
        borderRadius: SnitchRadius.md,
        gap: SnitchSpacing.sm,
    },

    variantStockRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    variantStockLabel: {
        fontSize: 12,
        color: SnitchColors.textMuted,
        fontWeight: '500',
    },

    variantStockValue: {
        fontSize: 13,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },

    variantOutOfStock: {
        color: SnitchColors.error,
    },

    invalidVariantCard: {
        marginHorizontal: SnitchSpacing.gutter,
        marginVertical: SnitchSpacing.sm,
        padding: SnitchSpacing.md,
        backgroundColor: '#FCE8E8',
        borderRadius: SnitchRadius.md,
    },

    invalidVariantText: {
        fontSize: 12,
        color: SnitchColors.error,
        fontWeight: '600',
    },

    // Delivery
    deliveryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.md,
        marginHorizontal: SnitchSpacing.gutter,
        marginVertical: SnitchSpacing.sm,
        padding: SnitchSpacing.md,
        backgroundColor: SnitchColors.surfaceContainerLow,
        borderRadius: SnitchRadius.md,
    },

    deliveryIcon: {
        width: 36,
        height: 36,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.canvas,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deliveryInfo: {
        flex: 1,
    },

    deliveryTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: SnitchColors.textPrimary,
    },

    deliverySubtitle: {
        fontSize: 12,
        color: SnitchColors.secondary,
        marginTop: 2,
    },

    // Accordions
    accordionSection: {
        marginHorizontal: SnitchSpacing.gutter,
        marginBottom: SnitchSpacing.sm,
        backgroundColor: SnitchColors.surfaceCard,
        borderRadius: SnitchRadius.md,
        borderWidth: 1,
        borderColor: SnitchColors.border,
        overflow: 'hidden',
    },

    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SnitchSpacing.gutter,
        paddingVertical: SnitchSpacing.md,
        minHeight: 52,
    },

    accordionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.sm,
    },

    accordionTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: SnitchColors.textPrimary,
    },

    accordionBody: {
        paddingHorizontal: SnitchSpacing.gutter,
        paddingBottom: SnitchSpacing.md,
    },

    accordionText: {
        fontSize: 13,
        color: SnitchColors.textSecondary,
        lineHeight: 20,
    },

    // Bottom Bar
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SnitchSpacing.sm,
        paddingHorizontal: SnitchSpacing.gutter,
        paddingTop: SnitchSpacing.sm,
        backgroundColor: SnitchColors.canvas,
        borderTopWidth: 1,
        borderTopColor: SnitchColors.border,
    },

    wishlistToggle: {
        width: 46,
        height: 46,
        borderRadius: SnitchRadius.sm,
        backgroundColor: SnitchColors.surfaceContainerLow,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addToBagBtn: {
        flex: 1,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SnitchSpacing.xs,
        borderRadius: SnitchRadius.sm,
        backgroundColor: SnitchColors.surfaceContainerHigh,
        borderWidth: 1,
        borderColor: SnitchColors.border,
    },

    addToBagText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.8,
        color: SnitchColors.textPrimary,
    },

    buyNowBtn: {
        flex: 1,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SnitchSpacing.xs + 3,
        borderRadius: SnitchRadius.sm,
        backgroundColor: SnitchColors.textPrimary,
    },

    buyNowText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.8,
        color: '#FFFFFF',
    },

    buyNowPrice: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    disabledButton: {
        opacity: 0.5,
    },
});
