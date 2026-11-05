import { Tabs } from 'expo-router';
import SnitchTabBar from '@/components/SnitchTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <SnitchTabBar {...props} />}
    >
      <Tabs.Screen name="index"    options={{ title: 'Home' }} />
      <Tabs.Screen name="explore"  options={{ title: 'Explore' }} />
      <Tabs.Screen name="wishlist" options={{ title: 'Wishlist' }} />
      <Tabs.Screen name="cart"     options={{ title: 'Bag' }} />
      <Tabs.Screen name="profile"  options={{ title: 'Profile' }} />
      <Tabs.Screen name="products" options={{ href: null }} />
    </Tabs>
  );
}
