import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { authSharedStyles } from '@/features/Authentication/styles/authStyles';

export default function ForgotPasswordForm({
    styles,
    resetEmail,
    onResetEmailChange,
    emailSent,
    onEmailSent,
    onBack,
    onDone,
    onTryAgain,
}) {
    return (
        <>
            <View style={authSharedStyles.handle} />
            {emailSent ? (
                <View style={styles.emailSentContainer}>
                    <View style={styles.emailSentIconRing}>
                        <SnitchIcon name="check" size={30} color={SnitchColors.secondaryMuted} />
                    </View>
                    <View style={authSharedStyles.titleBlock}>
                        <Text style={authSharedStyles.sheetTitle}>Check your email</Text>
                    </View>
                    <View style={styles.emailSentBodyBlock}>
                        <Text style={styles.emailSentBody}>We've sent a password reset link to</Text>
                        <Text style={styles.emailSentAddress}>{resetEmail}</Text>
                    </View>
                    <Text style={styles.emailSentHint}>
                        Check your spam folder if you don't see it in the next few minutes.
                    </Text>
                    <View style={styles.emailSentSpacer} />
                    <Pressable
                        style={authSharedStyles.ctaButton}
                        onPress={onDone}
                        accessibilityRole="button"
                    >
                        <Text style={authSharedStyles.ctaButtonText}>BACK TO SIGN IN</Text>
                    </Pressable>
                    <View style={[authSharedStyles.sheetSubtitleRow, { justifyContent: 'center' }]}>
                        <Text style={authSharedStyles.sheetSubtitle}>Didn't receive the email?</Text>
                        <Pressable hitSlop={6} onPress={onTryAgain}>
                            <Text style={authSharedStyles.linkText}>Try again</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <>
                    <Pressable style={styles.forgotBackRow} onPress={onBack} hitSlop={8}>
                        <SnitchIcon name="arrow_back" size={16} color={SnitchColors.secondaryMuted} />
                        <Text style={authSharedStyles.linkText}>Back to Sign In</Text>
                    </Pressable>

                    <View style={styles.forgotTitleBlock}>
                        <Text style={authSharedStyles.sheetTitle}>Reset Password</Text>
                        <Text style={authSharedStyles.sheetSubtitle}>
                            Enter your email address and we'll send you a link to reset your password.
                        </Text>
                    </View>

                    <View style={styles.forgotFieldGroup}>
                        <Text style={styles.forgotFieldLabel}>EMAIL ADDRESS</Text>
                        <View style={styles.inputRow}>
                            <SnitchIcon name="mail" size={20} color={SnitchColors.textMuted} />
                            <TextInput
                                style={authSharedStyles.input}
                                placeholder="hello@example.com"
                                placeholderTextColor={SnitchColors.textLight}
                                value={resetEmail}
                                onChangeText={onResetEmailChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                selectionColor={SnitchColors.secondaryMuted}
                            />
                        </View>
                    </View>

                    <Pressable
                        style={authSharedStyles.ctaButton}
                        accessibilityRole="button"
                        onPress={onEmailSent}
                    >
                        <Text style={authSharedStyles.ctaButtonText}>RECEIVE EMAIL</Text>
                    </Pressable>

                    <View style={authSharedStyles.dividerRow}>
                        <View style={authSharedStyles.dividerLine} />
                        <Text style={authSharedStyles.dividerText}>or</Text>
                        <View style={authSharedStyles.dividerLine} />
                    </View>

                    <View style={[authSharedStyles.sheetSubtitleRow, { justifyContent: 'center' }]}>
                        <Text style={authSharedStyles.sheetSubtitle}>Remember your password?</Text>
                        <Pressable hitSlop={6} onPress={onBack}>
                            <Text style={authSharedStyles.linkText}>Sign In</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </>
    );
}
