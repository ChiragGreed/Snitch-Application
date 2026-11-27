import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { authSharedStyles } from '@/features/Authentication/styles/authStyles';
import GoogleSignInButton from './GoogleSignInButton';

export default function LoginForm({
    styles,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    showPassword,
    onTogglePassword,
    rememberMe,
    onToggleRememberMe,
    onForgotPassword,
    onRegister,
    onLogin,
    onGooglePress,
}) {
    return (
        <>
            <View style={authSharedStyles.handle} />
            <View style={authSharedStyles.titleBlock}>
                <Text style={authSharedStyles.sheetTitle}>Login</Text>
                <View style={authSharedStyles.sheetSubtitleRow}>
                    <Text style={authSharedStyles.sheetSubtitle}>Don't have an account?</Text>
                    <Pressable onPress={onRegister}>
                        <Text style={authSharedStyles.linkText}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>

            <View style={authSharedStyles.form}>
                <View style={styles.inputRow}>
                    <SnitchIcon name="mail" size={20} color={SnitchColors.textMuted} />
                    <TextInput
                        style={authSharedStyles.input}
                        placeholder="Enter your email address"
                        placeholderTextColor={SnitchColors.textLight}
                        value={email}
                        onChangeText={onEmailChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        selectionColor={SnitchColors.secondaryMuted}
                    />
                </View>

                <View style={styles.inputRow}>
                    <SnitchIcon name="lock" size={20} color={SnitchColors.textMuted} />
                    <TextInput
                        style={authSharedStyles.input}
                        placeholder="Password"
                        placeholderTextColor={SnitchColors.textLight}
                        value={password}
                        onChangeText={onPasswordChange}
                        secureTextEntry={!showPassword}
                        selectionColor={SnitchColors.secondaryMuted}
                    />
                    <Pressable
                        hitSlop={8}
                        onPress={onTogglePassword}
                        accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                    >
                        <SnitchIcon
                            name={showPassword ? 'visibility_off' : 'visibility'}
                            size={19}
                            color={SnitchColors.textMuted}
                        />
                    </Pressable>
                </View>

                <View style={styles.rememberRow}>
                    <Pressable
                        style={styles.checkboxRow}
                        onPress={onToggleRememberMe}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: rememberMe }}
                    >
                        <View style={[styles.checkbox, rememberMe && authSharedStyles.checkboxChecked]}>
                            {rememberMe && (
                                <SnitchIcon name="check" size={12} color={SnitchColors.onPrimary} />
                            )}
                        </View>
                        <Text style={styles.rememberText}>Remember Me</Text>
                    </Pressable>
                    <Pressable hitSlop={6} onPress={onForgotPassword}>
                        <Text style={authSharedStyles.linkText}>Forgot Password?</Text>
                    </Pressable>
                </View>

                <Pressable style={authSharedStyles.ctaButton} onPress={onLogin} accessibilityRole="button">
                    <Text style={authSharedStyles.ctaButtonText}>LOGIN</Text>
                </Pressable>
            </View>

            <View style={authSharedStyles.dividerRow}>
                <View style={authSharedStyles.dividerLine} />
                <Text style={authSharedStyles.dividerText}>Or Continue With</Text>
                <View style={authSharedStyles.dividerLine} />
            </View>

            <GoogleSignInButton onPress={onGooglePress} />

            <View style={styles.securityRow}>
                <SnitchIcon name="lock" size={13} color={SnitchColors.secondaryMuted} />
                <Text style={styles.securityText}>256-bit Encrypted Secure Access</Text>
            </View>
        </>
    );
}
