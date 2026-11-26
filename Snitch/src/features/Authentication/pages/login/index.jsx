import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnitchIcon } from '@/components/snitch-icon';
import { Svg, Path } from 'react-native-svg';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import { authHeroTextShadows, authSharedStyles } from '@/features/Authentication/styles/authStyles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useAuth from '@/features/Authentication/hooks/useAuth.js';

const HERO_IMAGE = 'https://ik.imagekit.io/lfqmv9rcq/h-ng-nguy-n-HhQFk_5vbxE-unsplash.jpg';
const GoogleIcon = ({ size = 18 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </Svg>
);

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();
    const { returnTo } = useLocalSearchParams();

    const { loginHandler } = useAuth();

    async function login() {
        const response = await loginHandler({ email, password });
        if (response) {
            router.replace(returnTo === '/checkout' ? '/checkout' : '/');
        }
    }

    function googleAuthPress() {
        Linking.openURL('https://snitch-ecommerce.onrender.com/api/auth/google');
    }

    function handleBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    }


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
                {/* Dark gradient overlay */}
                <View style={styles.heroOverlay} />

                <Pressable
                    style={[styles.backButton, { top: insets.top + 12 }]}
                    onPress={handleBack}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <SnitchIcon name="arrow_back" size={22} color="#FFFFFF" />
                </Pressable>

                {/* Hero content */}
                <View style={[styles.heroContent, { paddingTop: insets.top + 16 }]}>
                    <View style={[styles.heroBadge, styles.heroBadgeVariant]}>
                        <View style={styles.heroBadgeDot} />
                        <Text style={styles.heroBadgeText}>NEW COLLECTION 2026</Text>
                    </View>
                    <Text style={styles.heroTitle}>
                        Street style,{'\n'}
                        <Text style={styles.heroTitleItalic}>redefined.</Text>
                    </Text>
                    <View style={styles.heroStats}>
                        <Text style={styles.heroStat}><Text style={styles.heroStatBold}>200+</Text> BRANDS</Text>
                        <Text style={styles.heroStatDot}>•</Text>
                        <Text style={styles.heroStat}><Text style={styles.heroStatBold}>1.2M</Text> CUSTOMERS</Text>
                        <Text style={styles.heroStatDot}>•</Text>
                        <Text style={styles.heroStat}><Text style={styles.heroStatBold}>4.9★</Text> RATING</Text>
                    </View>
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

                    {showForgotPassword ? (
                        /* ── Forgot Password Content ── */
                        <>
                            {emailSent ? (
                                /* ── Email Sent Success ── */
                                <View style={styles.emailSentContainer}>

                                    {/* Check icon ring */}
                                    <View style={styles.emailSentIconRing}>
                                        <SnitchIcon name="check" size={30} color={SnitchColors.secondaryMuted} />
                                    </View>

                                    {/* Title */}
                                    <View style={styles.titleBlock}>
                                        <Text style={styles.sheetTitle}>Check your email</Text>
                                    </View>

                                    {/* Sent-to message */}
                                    <View style={styles.emailSentBodyBlock}>
                                        <Text style={styles.emailSentBody}>
                                            We've sent a password reset link to
                                        </Text>
                                        <Text style={styles.emailSentAddress}>{resetEmail}</Text>
                                    </View>

                                    {/* Spam hint */}
                                    <Text style={styles.emailSentHint}>
                                        Check your spam folder if you don't see it in the next few minutes.
                                    </Text>

                                    {/* Spacer */}
                                    <View style={styles.emailSentSpacer} />

                                    {/* Back to sign in CTA */}
                                    <Pressable
                                        style={styles.ctaButton}
                                        onPress={() => {
                                            setShowForgotPassword(false);
                                            setEmailSent(false);
                                            setResetEmail('');
                                        }}
                                        accessibilityRole="button"
                                    >
                                        <Text style={styles.ctaButtonText}>BACK TO SIGN IN</Text>
                                    </Pressable>

                                    {/* Try again */}
                                    <View style={[styles.sheetSubtitleRow, { justifyContent: 'center' }]}>
                                        <Text style={styles.sheetSubtitle}>Didn't receive the email?</Text>
                                        <Pressable hitSlop={6} onPress={() => setEmailSent(false)}>
                                            <Text style={styles.linkText}>Try again</Text>
                                        </Pressable>
                                    </View>

                                </View>
                            ) : (
                                /* ── Forgot Password Form ── */
                                <>
                                    {/* Back button */}
                                    <Pressable
                                        style={styles.forgotBackRow}
                                        onPress={() => setShowForgotPassword(false)}
                                        hitSlop={8}
                                    >
                                        <SnitchIcon name="arrow_back" size={16} color={SnitchColors.secondaryMuted} />
                                        <Text style={styles.linkText}>Back to Sign In</Text>
                                    </Pressable>

                                    {/* Title */}
                                    <View style={styles.forgotTitleBlock}>
                                        <Text style={styles.sheetTitle}>Reset Password</Text>
                                        <Text style={styles.sheetSubtitle}>
                                            Enter your email address and we'll send you a link to reset your password.
                                        </Text>
                                    </View>

                                    {/* Email field */}
                                    <View style={styles.forgotFieldGroup}>
                                        <Text style={styles.forgotFieldLabel}>EMAIL ADDRESS</Text>
                                        <View style={styles.inputRow}>
                                            <SnitchIcon name="mail" size={20} color={SnitchColors.textMuted} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="hello@example.com"
                                                placeholderTextColor={SnitchColors.textLight}
                                                value={resetEmail}
                                                onChangeText={setResetEmail}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                selectionColor={SnitchColors.secondaryMuted}
                                            />
                                        </View>
                                    </View>

                                    {/* Send CTA */}
                                    <Pressable
                                        style={styles.ctaButton}
                                        accessibilityRole="button"
                                        onPress={() => setEmailSent(true)}
                                    >
                                        <Text style={styles.ctaButtonText}>RECEIVE EMAIL</Text>
                                    </Pressable>

                                    {/* Divider */}
                                    <View style={styles.dividerRow}>
                                        <View style={styles.dividerLine} />
                                        <Text style={styles.dividerText}>or</Text>
                                        <View style={styles.dividerLine} />
                                    </View>

                                    {/* Sign in link */}
                                    <View style={[styles.sheetSubtitleRow, { justifyContent: 'center' }]}>
                                        <Text style={styles.sheetSubtitle}>Remember your password?</Text>
                                        <Pressable hitSlop={6} onPress={() => setShowForgotPassword(false)}>
                                            <Text style={styles.linkText}>Sign In</Text>
                                        </Pressable>
                                    </View>
                                </>
                            )}
                        </>
                    ) : (
                        /* ── Login Content ── */
                        <>
                            {/* Title */}
                            <View style={styles.titleBlock}>
                                <Text style={styles.sheetTitle}>Login</Text>
                                <View style={styles.sheetSubtitleRow}>
                                    <Text style={styles.sheetSubtitle}>Don't have an account?</Text>
                                    <Pressable onPress={() => router.push('/auth/register')}>
                                        <Text style={styles.linkText}>Sign Up</Text>
                                    </Pressable>
                                </View>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
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
                                            size={19}
                                            color={SnitchColors.textMuted}
                                        />
                                    </Pressable>
                                </View>

                                {/* Remember me & Forgot */}
                                <View style={styles.rememberRow}>
                                    <Pressable
                                        style={styles.checkboxRow}
                                        onPress={() => setRememberMe((v) => !v)}
                                        accessibilityRole="checkbox"
                                        accessibilityState={{ checked: rememberMe }}
                                    >
                                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                            {rememberMe && (
                                                <SnitchIcon name="check" size={12} color={SnitchColors.onPrimary} />
                                            )}
                                        </View>
                                        <Text style={styles.rememberText}>Remember Me</Text>
                                    </Pressable>
                                    <Pressable hitSlop={6} onPress={() => setShowForgotPassword(true)}>
                                        <Text style={styles.linkText}>Forgot Password?</Text>
                                    </Pressable>
                                </View>

                                {/* Login CTA */}
                                <Pressable style={styles.ctaButton} onPress={login} accessibilityRole="button">
                                    <Text style={styles.ctaButtonText}>LOGIN</Text>
                                </Pressable>
                            </View>

                            {/* Divider */}
                            <View style={styles.dividerRow}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>Or Continue With</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            {/* Google Sign In */}
                            <Pressable style={styles.socialButton} onPress={googleAuthPress} accessibilityRole="button" accessibilityLabel="Continue with Google">
                                <GoogleIcon />
                                <Text style={styles.socialButtonText}>Continue with Google</Text>
                            </Pressable>

                            {/* Security note */}
                            <View style={styles.securityRow}>
                                <SnitchIcon name="lock" size={13} color={SnitchColors.secondaryMuted} />
                                <Text style={styles.securityText}>256-bit Encrypted Secure Access</Text>
                            </View>
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const pageStyles = StyleSheet.create({
    // ── Hero ──────────────────────────────────────────────────────────
    hero: {
        height: '48%',
        minHeight: 280,
        position: 'relative',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
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

    // ── Sheet ─────────────────────────────────────────────────────────
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
    // ── Form ──────────────────────────────────────────────────────────
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

    // ── Security ──────────────────────────────────────────────────────
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

    // ── Forgot Password ────────────────────────────────────────────────
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

    // ── Email Sent Success ─────────────────────────────────────────────
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

const styles = { ...authSharedStyles, ...pageStyles };

