import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SnitchSpacing } from '@/constants/snitch-theme';
import { useRouter } from 'expo-router';
import useAuth from '@/features/Authentication/hooks/useAuth.js';
import AuthScreenLayout from '@/features/Authentication/components/AuthScreenLayout';
import RegisterForm from '@/features/Authentication/components/RegisterForm';
import { styles } from '@/features/Authentication/styles/registerStyles';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1626386699888-b8865823b279?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function RegisterScreen() {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('isBuyer');
    const router = useRouter();
    const { registerHandler } = useAuth();

    async function register() {
        const response = await registerHandler({ fullname, email, contact, password, role });
        if (response) {
            router.push('/');
        }
    }

    function handleBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    }

    const heroContent = (
        <>
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
        </>
    );

    const formContent = (
        <RegisterForm
            styles={styles}
            fullname={fullname}
            onFullNameChange={setFullName}
            email={email}
            onEmailChange={setEmail}
            contact={contact}
            onContactChange={setContact}
            password={password}
            onPasswordChange={setPassword}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((visible) => !visible)}
            role={role}
            onToggleRole={() => setRole((currentRole) => currentRole === 'isSeller' ? 'isBuyer' : 'isSeller')}
            onRegister={register}
            onLogin={() => router.push('/auth/login')}
        />
    );

    return (
        <AuthScreenLayout
            image={HERO_IMAGE}
            styles={styles}
            overlayStyle={[styles.heroOverlayDark, styles.heroOverlayWarm]}
            onBack={handleBack}
            heroContent={heroContent}
            formContent={formContent}
        />
    );
}
