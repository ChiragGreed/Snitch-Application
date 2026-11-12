
import React from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';

const getProductId = (product) => product?.id ?? product?._id;

const WishListItemCard = ({ product, onMoveToBag, inStock, onRemove, onPressProduct }) => {
    const image = product?.image || product?.images?.[0];
    const imageUrl = typeof image === 'string' ? image : image?.url || image?.uri || null;
    const rawPrice = product?.price?.amount ?? product?.price ?? product?.variants?.price?.amount ?? 0;
    const price = typeof rawPrice === 'number' ? rawPrice : 0;

    return (
        <View style={styles.itemCard}>
            <Pressable
                style={styles.imageContainer}
                onPress={() => onPressProduct(getProductId(product))}
                accessibilityLabel={`View ${product?.title || 'product'}`}
            >
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        contentFit="cover"
                        transition={200}
                    />
                ) : (
                    <View style={[styles.image, styles.imagePlaceholder]} />
                )}
            </Pressable>

            <View style={styles.itemDetails}>
                <View style={styles.itemHeading}>
                    <View style={styles.itemCopy}>
                        <Pressable onPress={() => onPressProduct(getProductId(product))}>
                            <Text style={styles.productTitle} numberOfLines={2}>
                                {product?.title || 'Product'}
                            </Text>
                        </Pressable>
                        {product?.subtitle || product?.description ? (
                            <Text style={styles.subtitle} numberOfLines={1}>
                                {product.subtitle || product.description}
                            </Text>
                        ) : null}
                    </View>
                    <Pressable
                        style={styles.removeButton}
                        onPress={() => onRemove(product)}
                        accessibilityLabel={`Remove ${product?.title || 'product'} from wishlist`}
                        hitSlop={8}
                    >
                        <SnitchIcon name="favorite" size={22} color={SnitchColors.error} />
                    </Pressable>
                </View>

                <View style={styles.itemFooter}>
                    <View style={styles.priceAndStock}>
                        <Text style={styles.price}>₹{price.toLocaleString('en-IN')}</Text>
                        <Text style={[styles.stockLabel, !inStock && styles.outOfStockLabel]}>
                            {inStock ? 'In Stock' : 'Out of Stock'}
                        </Text>
                    </View>
                    <Pressable
                        style={[styles.moveButton]}
                        onPress={inStock ? () => onMoveToBag(product) : undefined}
                        accessibilityLabel={
                            inStock
                                ? `Move ${product?.title || 'product'} to bag`
                                : `Notify me when ${product?.title || 'product'} is back in stock`
                        }
                    >
                        <SnitchIcon
                            name={inStock ? 'shopping_bag' : 'notifications'}
                            size={16}
                            color={SnitchColors.onPrimary}
                        />
                        <Text style={styles.moveButtonText}>
                            {inStock ? 'Move to Bag' : 'Notify Me'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default WishListItemCard;

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: SnitchSpacing.md,
        padding: SnitchSpacing.md,
        borderRadius: SnitchRadius.lg,
        backgroundColor: SnitchColors.surfaceCard,
        borderWidth: 1,
        borderColor: SnitchColors.border,
        elevation: 1,
    },
    imageContainer: {
        width: 100,
        height: 148,
        flexShrink: 0,
        borderRadius: SnitchRadius.sm,
        overflow: 'hidden',
        backgroundColor: SnitchColors.surfaceContainer,
    },
    image: {
        width: '100%',
        height: 148,
    },
    imagePlaceholder: {
        backgroundColor: SnitchColors.surfaceContainer,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
        minWidth: 0,
        paddingVertical: 2,
    },
    itemHeading: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SnitchSpacing.xs,
    },
    itemCopy: {
        flex: 1,
        minWidth: 0,
    },
    category: {
        marginBottom: 5,
        fontSize: 10,
        letterSpacing: 0.8,
        color: SnitchColors.textMuted,
    },
    productTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.2,
        color: SnitchColors.textPrimary,
    },
    subtitle: {
        marginTop: 2,
        fontSize: 12,
        color: SnitchColors.textMuted,
    },
    removeButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -4,
        marginRight: -4,
    },
    itemFooter: {
        paddingTop: SnitchSpacing.sm,
        marginTop: SnitchSpacing.sm,
        borderTopWidth: 1,
        borderTopColor: SnitchColors.border,
        gap: SnitchSpacing.sm,
    },
    priceAndStock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SnitchSpacing.xs,
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: SnitchColors.textPrimary,
    },
    stockLabel: {
        fontSize: 11,
        color: SnitchColors.textMuted,
    },
    outOfStockLabel: {
        color: SnitchColors.error,
    },
    moveButton: {
        minHeight: 36,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SnitchSpacing.xs,
        paddingHorizontal: SnitchSpacing.sm,
        borderRadius: SnitchRadius.full,
        backgroundColor: SnitchColors.primary,
    },
    moveButtonDisabled: {
        opacity: 0.45,
    },
    moveButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: SnitchColors.onPrimary,
    },
});