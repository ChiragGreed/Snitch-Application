import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useAuth from '@/features/Authentication/hooks/useAuth.js';
import AuthScreenLayout from '@/features/Authentication/components/AuthScreenLayout';
import ForgotPasswordForm from '@/features/Authentication/components/ForgotPasswordForm';
import LoginForm from '@/features/Authentication/components/LoginForm';
import { styles } from '@/features/Authentication/styles/loginStyles';

const HERO_IMAGE = 'https://ik.imagekit.io/lfqmv9rcq/h-ng-nguy-n-HhQFk_5vbxE-unsplash.jpg';

export default function LoginScreen() {
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

    function handleBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    }

    function handleGooglePress() {
        Linking.openURL('https://snitch-ecommerce.onrender.com/api/auth/google');
    }

    const heroContent = (
        <>
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
        </>
    );

    const formContent = showForgotPassword ? (
        <ForgotPasswordForm
            styles={styles}
            resetEmail={resetEmail}
            onResetEmailChange={setResetEmail}
            emailSent={emailSent}
            onEmailSent={() => setEmailSent(true)}
            onBack={() => setShowForgotPassword(false)}
            onDone={() => {
                setShowForgotPassword(false);
                setEmailSent(false);
                setResetEmail('');
            }}
            onTryAgain={() => setEmailSent(false)}
        />
    ) : (
        <LoginForm
            styles={styles}
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((visible) => !visible)}
            rememberMe={rememberMe}
            onToggleRememberMe={() => setRememberMe((remembered) => !remembered)}
            onForgotPassword={() => setShowForgotPassword(true)}
            onRegister={() => router.push('/auth/register')}
            onLogin={login}
            onGooglePress={handleGooglePress}
        />
    );

    return (
        <AuthScreenLayout
            image={HERO_IMAGE}
            styles={styles}
            overlayStyle={styles.heroOverlay}
            onBack={handleBack}
            heroContent={heroContent}
            formContent={formContent}
        />
    );
}
