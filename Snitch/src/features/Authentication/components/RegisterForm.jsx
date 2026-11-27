import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { authSharedStyles } from '@/features/Authentication/styles/authStyles';
import GoogleSignInButton from './GoogleSignInButton';

export default function RegisterForm({
    styles,
    fullname,
    onFullNameChange,
    email,
    onEmailChange,
    contact,
    onContactChange,
    password,
    onPasswordChange,
    showPassword,
    onTogglePassword,
    role,
    onToggleRole,
    onRegister,
    onLogin,
}) {
    return (
        <>
            <View style={authSharedStyles.handle} />
            <View style={authSharedStyles.titleBlock}>
                <Text style={authSharedStyles.sheetTitle}>Sign up</Text>
                <View style={authSharedStyles.sheetSubtitleRow}>
                    <Text style={authSharedStyles.sheetSubtitle}>Already have an account?</Text>
                    <Pressable onPress={onLogin}>
                        <Text style={authSharedStyles.linkText}>Sign In</Text>
                    </Pressable>
                </View>
            </View>

            <View style={authSharedStyles.form}>
                <View style={styles.inputRow}>
                    <SnitchIcon name="person" size={20} color={SnitchColors.textMuted} />
                    <TextInput
                        style={authSharedStyles.input}
                        placeholder="Full Name"
                        placeholderTextColor={SnitchColors.textLight}
                        value={fullname}
                        onChangeText={onFullNameChange}
                        autoCapitalize="words"
                        selectionColor={SnitchColors.secondaryMuted}
                    />
                </View>

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
                    <SnitchIcon name="call" size={20} color={SnitchColors.textMuted} />
                    <View style={styles.phonePrefixBox}>
                        <Text style={styles.phonePrefixLabel}>IN</Text>
                        <Text style={styles.phonePrefixCode}>+91</Text>
                    </View>
                    <View style={styles.phoneDivider} />
                    <TextInput
                        style={[authSharedStyles.input, { flex: 1 }]}
                        placeholder="Contact Number"
                        placeholderTextColor={SnitchColors.textLight}
                        value={contact}
                        onChangeText={onContactChange}
                        keyboardType="phone-pad"
                        maxLength={10}
                        selectionColor={SnitchColors.secondaryMuted}
                    />
                </View>

                <View style={styles.inputRow}>
                    <SnitchIcon name="lock" size={20} color={SnitchColors.textMuted} />
                    <TextInput
                        style={[authSharedStyles.input, { flex: 1 }]}
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
                            size={20}
                            color={SnitchColors.textMuted}
                        />
                    </Pressable>
                </View>

                <Pressable
                    style={styles.sellerRow}
                    onPress={onToggleRole}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: role === 'isSeller' }}
                >
                    <View style={[styles.checkbox, role === 'isSeller' && authSharedStyles.checkboxChecked]}>
                        {role === 'isSeller' && (
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

                <Pressable style={authSharedStyles.ctaButton} onPress={onRegister} accessibilityRole="button">
                    <Text style={authSharedStyles.ctaButtonText}>GET STARTED</Text>
                </Pressable>
            </View>

            <View style={authSharedStyles.dividerRow}>
                <View style={authSharedStyles.dividerLine} />
                <Text style={authSharedStyles.dividerText}>Or Continue With</Text>
                <View style={authSharedStyles.dividerLine} />
            </View>

            <GoogleSignInButton />

            <Text style={styles.termsText}>
                By continuing, you agree to Snitch's{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and acknowledge our{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
        </>
    );
}
