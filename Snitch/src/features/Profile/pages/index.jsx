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
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View style={styles.welcomeAvatar}>
              <SnitchIcon name="person" size={26} color={SnitchColors.textSecondary} />
            </View>
            <View style={styles.welcomeCopy}>
              <Text style={styles.welcomeTitle}>Welcome to Snitch</Text>
              <Text style={styles.welcomeDescription}>
                Sign in or create an account to get started.
              </Text>
            </View>
          </View>
          <View style={styles.authActions}>
            <Pressable
              style={[styles.authButton, styles.loginButton]}
              onPress={requestSignIn}
            >
              <Text style={[styles.authButtonText, styles.loginButtonText]}>LOG IN</Text>
            </Pressable>
            <Pressable
              style={[styles.authButton, styles.createAccountButton]}
              onPress={requestSignIn}
            >
              <Text style={styles.authButtonText}>CREATE ACCOUNT</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading title="YOUR SHOPPING" trailing="Sync enabled on sign in" />
          <View style={styles.rowsCard}>
            <ProfileRow
              icon="shopping_bag"
              title="My Bag"
              description={`${bagCount} ${bagCount === 1 ? 'item' : 'items'} in bag`}
              onPress={() => router.push('/cart')}
            />
            <View style={styles.rowDivider} />
            <ProfileRow
              icon="favorite"
              title="Wishlist"
              description={`${wishListItems.length} saved ${wishListItems.length === 1 ? 'piece' : 'pieces'}`}
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
  welcomeSection: {
    padding: SnitchSpacing.gutter,
    gap: SnitchSpacing.sm,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
  },
  welcomeAvatar: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  welcomeCopy: {
    flex: 1,
    gap: SnitchSpacing.xs,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  welcomeDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: SnitchColors.textSecondary,
  },
  authActions: {
    flexDirection: 'row',
    gap: SnitchSpacing.md,
    marginTop: SnitchSpacing.xs,
  },
  authButton: {
    flex: 1,
    minHeight: 40,
    paddingHorizontal: SnitchSpacing.md,
    borderRadius: SnitchRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: SnitchColors.primary,
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: SnitchColors.primary,
    backgroundColor: 'transparent',
  },
  authButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: SnitchColors.textPrimary,
  },
  loginButtonText: {
    color: SnitchColors.onPrimary,
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
