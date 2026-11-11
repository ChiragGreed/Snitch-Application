import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import SnitchHeader from '@/shared/components/SnitchHeader';
import Toast from '@/shared/components/Toast';
import useWishList from '@/features/Wishlist/hooks/useWishList';

function SectionHeading({ title, trailing }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {trailing ? <Text style={styles.sectionTrailing}>{trailing}</Text> : null}
    </View>
  );
}

function ShoppingShortcut({ icon, title, caption, onPress }) {
  return (
    <Pressable style={styles.shortcutCard} onPress={onPress}>
      <View style={styles.shortcutTop}>
        <View style={styles.shortcutIcon}>
          <SnitchIcon name={icon} size={20} color={SnitchColors.textPrimary} />
        </View>
        <SnitchIcon name="chevron_right" size={18} color={SnitchColors.borderVariant} />
      </View>
      <Text style={styles.shortcutTitle}>{title}</Text>
      <Text style={styles.shortcutCaption}>{caption}</Text>
    </Pressable>
  );
}

function ProfileRow({ icon, title, description, onPress, requiresSignIn = false }) {
  return (
    <Pressable style={styles.accountRow} onPress={onPress}>
      <View style={styles.rowIcon}>
        <SnitchIcon name={icon} size={19} color={SnitchColors.textSecondary} />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        {description ? <Text style={styles.rowDescription}>{description}</Text> : null}
      </View>
      {requiresSignIn ? (
        <View style={styles.signInBadge}>
          <SnitchIcon name="verified_user" size={12} color={SnitchColors.textMuted} />
          <Text style={styles.signInText}>Sign in</Text>
        </View>
      ) : null}
      <SnitchIcon name="chevron_right" size={18} color={SnitchColors.borderVariant} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { wishListItems } = useWishList();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [toastMessage, setToastMessage] = useState(null);

  const items = useMemo(() => {
    if (Array.isArray(cartItems)) return cartItems;
    if (Array.isArray(cartItems?.items)) return cartItems.items;
    return [];
  }, [cartItems]);
  const bagCount = useMemo(
    () => items.reduce((count, item) => count + (item.quantity || 1), 0),
    [items]
  );

  const triggerToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  const requestSignIn = useCallback(() => {
    triggerToast('Sign in will be available soon.');
  }, [triggerToast]);

  const handleSupport = useCallback(() => {
    triggerToast('Client support will be available soon.');
  }, [triggerToast]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} top={insets.top + 50} />
      <SnitchHeader
        title="Profile"
        onToast={triggerToast}
        onSearch={() => router.push('/explore')}
        onNotifications={() => triggerToast('No new notifications')}
        onProfile={() => triggerToast('You are viewing your profile')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + SnitchSpacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIcon}>
            <SnitchIcon name="person" size={30} color={SnitchColors.secondaryMuted} />
          </View>
          <Text style={styles.welcomeTitle}>Welcome to Snitch</Text>
          <Text style={styles.welcomeDescription}>
            Sign in for a personalized experience, curated looks, and seamless checkout.
          </Text>
          <Pressable style={styles.signInButton} onPress={requestSignIn}>
            <Text style={styles.signInButtonText}>LOGIN / CREATE ACCOUNT</Text>
            <SnitchIcon name="arrow_forward" size={18} color={SnitchColors.onPrimary} />
          </Pressable>
          <Text style={styles.benefitsText}>
            FAST CHECKOUT  ·  ORDER TRACKING  ·  SAVED WISHLIST
          </Text>
        </View>

        <View style={styles.section}>
          <SectionHeading title="YOUR SHOPPING" trailing="Sync enabled on sign in" />
          <View style={styles.shortcutRow}>
            <ShoppingShortcut
              icon="shopping_bag"
              title="My Bag"
              caption={`${bagCount} ${bagCount === 1 ? 'item' : 'items'} in bag`}
              onPress={() => router.push('/cart')}
            />
            <ShoppingShortcut
              icon="favorite"
              title="Wishlist"
              caption={`${wishListItems.length} saved ${wishListItems.length === 1 ? 'piece' : 'pieces'}`}
              onPress={() => router.push('/wishlist')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading title="YOUR ACCOUNT" trailing="GUEST MODE" />
          <View style={styles.rowsCard}>
            <ProfileRow
              icon="local_activity"
              title="My Orders"
              description="Past purchases & track shipments"
              onPress={requestSignIn}
              requiresSignIn
            />
            <View style={styles.rowDivider} />
            <ProfileRow
              icon="info"
              title="Saved Addresses"
              description="Manage delivery locations"
              onPress={requestSignIn}
              requiresSignIn
            />
            <View style={styles.rowDivider} />
            <ProfileRow
              icon="person"
              title="Profile & Security"
              description="Contact details and passwords"
              onPress={requestSignIn}
              requiresSignIn
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading title="HELP & SUPPORT" />
          <View style={styles.rowsCard}>
            <ProfileRow
              icon="info"
              title="Client Support"
              description="24/7 assistance for your queries"
              onPress={handleSupport}
            />
            <View style={styles.rowDivider} />
            <ProfileRow
              icon="local_shipping"
              title="Complimentary Delivery"
              description="Delivery information and returns"
              onPress={handleSupport}
            />
            <View style={styles.rowDivider} />
            <ProfileRow
              icon="verified_user"
              title="Privacy Policy & Terms"
              onPress={handleSupport}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>The Art of Refined Dressing</Text>
          <Text style={styles.footerMeta}>
            SNITCH APP V{Constants.expoConfig?.version || '1.0.0'}
          </Text>
          <Text style={styles.footerCopyright}>
            © {new Date().getFullYear()} SNITCH. ALL RIGHTS RESERVED.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    gap: SnitchSpacing.xl,
  },
  welcomeCard: {
    alignItems: 'center',
    paddingHorizontal: SnitchSpacing.lg,
    paddingTop: SnitchSpacing.xl,
    paddingBottom: SnitchSpacing.xl,
    borderRadius: SnitchRadius.xl,
    backgroundColor: SnitchColors.surfaceCard,
  },
  welcomeIcon: {
    width: 72,
    height: 72,
    borderRadius: SnitchRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SnitchColors.surfaceContainerLow,
    marginBottom: SnitchSpacing.lg,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: -0.5,
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
  welcomeDescription: {
    maxWidth: 340,
    marginTop: SnitchSpacing.sm,
    fontSize: 14,
    lineHeight: 22,
    color: SnitchColors.textSecondary,
    textAlign: 'center',
  },
  signInButton: {
    width: '100%',
    minHeight: 52,
    marginTop: SnitchSpacing.xl,
    paddingHorizontal: SnitchSpacing.lg,
    borderRadius: SnitchRadius.md,
    backgroundColor: SnitchColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.sm,
  },
  signInButtonText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: SnitchColors.onPrimary,
  },
  benefitsText: {
    marginTop: SnitchSpacing.xl,
    fontSize: 10,
    letterSpacing: 0.3,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
  section: {
    gap: SnitchSpacing.md,
  },
  sectionHeading: {
    minHeight: 22,
    paddingHorizontal: SnitchSpacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: SnitchColors.textSecondary,
  },
  sectionTrailing: {
    fontSize: 11,
    color: SnitchColors.secondaryMuted,
  },
  shortcutRow: {
    flexDirection: 'row',
    gap: SnitchSpacing.md,
  },
  shortcutCard: {
    flex: 1,
    minHeight: 138,
    justifyContent: 'space-between',
    padding: SnitchSpacing.gutter,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
  },
  shortcutTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shortcutIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  shortcutTitle: {
    marginTop: SnitchSpacing.md,
    fontSize: 18,
    fontWeight: '500',
    color: SnitchColors.textPrimary,
  },
  shortcutCaption: {
    marginTop: SnitchSpacing.xs,
    fontSize: 12,
    color: SnitchColors.secondaryMuted,
  },
  rowsCard: {
    paddingHorizontal: SnitchSpacing.gutter,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
  },
  accountRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
  },
  rowIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  rowContent: {
    flex: 1,
    minWidth: 0,
    gap: SnitchSpacing.xs,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: SnitchColors.textPrimary,
  },
  rowDescription: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },
  signInBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs,
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 5,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  signInText: {
    fontSize: 10,
    fontWeight: '600',
    color: SnitchColors.textMuted,
  },
  rowDivider: {
    height: 1,
    backgroundColor: SnitchColors.border,
  },
  footer: {
    alignItems: 'center',
    paddingTop: SnitchSpacing.md,
    paddingBottom: SnitchSpacing.xl,
    gap: SnitchSpacing.xs,
  },
  footerBrand: {
    marginBottom: SnitchSpacing.sm,
    fontSize: 20,
    fontStyle: 'italic',
    color: SnitchColors.secondaryMuted,
  },
  footerMeta: {
    fontSize: 11,
    letterSpacing: 0.5,
    color: SnitchColors.textLight,
  },
  footerCopyright: {
    fontSize: 9,
    letterSpacing: 0.3,
    color: SnitchColors.textLight,
  },
});
