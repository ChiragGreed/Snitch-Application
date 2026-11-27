import React from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchSpacing } from '@/constants/snitch-theme';
import { authSharedStyles } from '@/features/Authentication/styles/authStyles';

export default function AuthScreenLayout({
    image,
    styles,
    overlayStyle,
    onBack,
    heroContent,
    formContent,
}) {
    const insets = useSafeAreaInsets();

    return (
        <View style={authSharedStyles.root}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <View style={styles.hero}>
                <Image source={{ uri: image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                <View style={[StyleSheet.absoluteFillObject, overlayStyle]} />
                <Pressable
                    style={[authSharedStyles.backButton, { top: insets.top + 12 }]}
                    onPress={onBack}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <SnitchIcon name="arrow_back" size={22} color="#FFFFFF" />
                </Pressable>

                <View style={[authSharedStyles.heroContent, { paddingTop: insets.top + 16 }]}>
                    {heroContent}
                </View>
            </View>

            <KeyboardAvoidingView
                style={authSharedStyles.sheetWrapper}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.sheet}
                    contentContainerStyle={[
                        authSharedStyles.sheetContent,
                        { paddingBottom: insets.bottom + SnitchSpacing.xl },
                    ]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {formContent}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
