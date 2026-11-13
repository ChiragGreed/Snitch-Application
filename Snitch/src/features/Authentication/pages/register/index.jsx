import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnitchIcon } from '@/components/snitch-icon';
import { Svg, Path } from 'react-native-svg';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import { authHeroTextShadows, authSharedStyles } from '@/features/Authentication/styles/authStyles';
import { useRouter } from 'expo-router';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1626386699888-b8865823b279?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const GoogleIcon = ({ size = 18 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </Svg>
);

export default function RegisterScreen() {
    const insets = useSafeAreaInsets();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [sellerAccount, setSellerAccount] = useState(false);
    const route = useRouter();

    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* ── Hero Image Section ── */}
            <View style={styles.hero}>
                <Image
                    source={{ uri: HERO_IMAGE }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                />
                {/* Dark + warm gradient overlay */}
                <View style={styles.heroOverlayDark} />
                <View style={styles.heroOverlayWarm} />

                {/* Hero content */}
                <View style={[styles.heroContent, { paddingTop: insets.top + 16 }]}>
                    <View style={[styles.heroBadge, styles.heroBadgeVariant]}>
                        <View style={styles.heroBadgeDot} />
                        <Text style={styles.heroBadgeText}>EXCLUSIVE ACCESS</Text>
                    </View>
                    <Text style={styles.heroTitle}>
                        Dress the{'\n'}
                        <Text style={styles.heroTitleItalic}>culture.</Text>
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        Early drop access • Members-only pricing • Free express delivery
                    </Text>
                </View>
            </View>

            {/* ── Bottom Sheet Card ── */}
            <KeyboardAvoidingView
                style={styles.sheetWrapper}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.sheet}
                    contentContainerStyle={[
                        styles.sheetContent,
                        { paddingBottom: insets.bottom + SnitchSpacing.xl },
                    ]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Handle */}
                    <View style={styles.handle} />

                    {/* Title */}
                    <View style={styles.titleBlock}>
                        <Text style={styles.sheetTitle}>Sign up</Text>
                        <View style={styles.sheetSubtitleRow}>
                            <Text style={styles.sheetSubtitle}>Already have an account?</Text>
                            <Pressable onPress={() => route.push('/auth/login')}>
                                <Text style={styles.linkText}>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Full Name */}
                        <View style={styles.inputRow}>
                            <SnitchIcon name="person" size={20} color={SnitchColors.textMuted} />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor={SnitchColors.textLight}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                selectionColor={SnitchColors.secondaryMuted}
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputRow}>
                            <SnitchIcon name="mail" size={20} color={SnitchColors.textMuted} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email address"
                                placeholderTextColor={SnitchColors.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                selectionColor={SnitchColors.secondaryMuted}
                            />
                        </View>

                        {/* Phone */}
                        <View style={styles.inputRow}>
                            <SnitchIcon name="call" size={20} color={SnitchColors.textMuted} />
                            <View style={styles.phonePrefixBox}>
                                <Text style={styles.phonePrefixLabel}>IN</Text>
                                <Text style={styles.phonePrefixCode}>+91</Text>
                            </View>
                            <View style={styles.phoneDivider} />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Contact Number"
                                placeholderTextColor={SnitchColors.textLight}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={10}
                                selectionColor={SnitchColors.secondaryMuted}
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputRow}>
                            <SnitchIcon name="lock" size={20} color={SnitchColors.textMuted} />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Password"
                                placeholderTextColor={SnitchColors.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                selectionColor={SnitchColors.secondaryMuted}
                            />
                            <Pressable
                                hitSlop={8}
                                onPress={() => setShowPassword((v) => !v)}
                                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <SnitchIcon
                                    name={showPassword ? 'visibility_off' : 'visibility'}
                                    size={20}
                                    color={SnitchColors.textMuted}
                                />
                            </Pressable>
                        </View>

                        {/* Seller account toggle */}
                        <Pressable
                            style={styles.sellerRow}
                            onPress={() => setSellerAccount((v) => !v)}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: sellerAccount }}
                        >
                            <View style={[styles.checkbox, sellerAccount && styles.checkboxChecked]}>
                                {sellerAccount && (
                                    <SnitchIcon name="check" size={12} color={SnitchColors.onPrimary} />
                                )}
                            </View>
                            <View style={styles.sellerTextBlock}>
                                <Text style={styles.sellerLabel}>Create a seller account</Text>
                                <Text style={styles.sellerSub}>
                                    Apply to list your label on Snitch Marketplace
                                </Text>
                            </View>
                        </Pressable>

                        {/* CTA */}
                        <Pressable style={styles.ctaButton} accessibilityRole="button">
                            <Text style={styles.ctaButtonText}>GET STARTED</Text>
                        </Pressable>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerRow}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Or Continue With</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Google Sign In */}
                    <Pressable style={styles.socialButton} accessibilityRole="button" accessibilityLabel="Continue with Google">
                        <GoogleIcon />
                        <Text style={styles.socialButtonText}>Continue with Google</Text>
                    </Pressable>

                    {/* Terms */}
                    <Text style={styles.termsText}>
                        By continuing, you agree to Snitch's{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and acknowledge our{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>.
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const pageStyles = StyleSheet.create({
    // ── Hero ──────────────────────────────────────────────────────────
    hero: {
        height: '42%',
        minHeight: 260,
        position: 'relative',
    },
    heroOverlayDark: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(28,28,26,0.72)',
    },
    heroOverlayWarm: {
        ...StyleSheet.absoluteFillObject,
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

    // ── Sheet ─────────────────────────────────────────────────────────
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
    // ── Form ──────────────────────────────────────────────────────────
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
    // ── Terms ─────────────────────────────────────────────────────────
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

const styles = { ...authSharedStyles, ...pageStyles };

