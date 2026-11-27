import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import SnitchHeader from '@/shared/components/SnitchHeader';
import Toast from '@/shared/components/Toast';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import useAddress from '@/features/Address/hooks/useAddress';
import { styles } from '@/features/Address/styles/savedAddressesStyles';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

const emptyAddress = {
  pin: '',
  city: '',
  state: '',
  residence: '',
  area: '',
  LandMark: '',
};

export default function SavedAddressesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { myAddresses, selectedAddress, defaultAddressId, loading, addAddressHandler, updateAddressHandler, removeAddressHandler, setDefaultAddressHandler, getMyAddressesHandler, getAddressByIdHandler } = useAddress();

  const [toastMessage, setToastMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [address, setAddress] = useState(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedType, setSelectedType] = useState('home');
  const [isStatePickerVisible, setIsStatePickerVisible] = useState(false);

  const triggerToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  useEffect(() => {
    getMyAddressesHandler().catch((requestError) => {
      triggerToast(requestError.message || 'Unable to load your addresses');
    });
  }, [getMyAddressesHandler, triggerToast]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/profile');
    }
  };

  const updateAddress = (field, value) => {
    setAddress((currentAddress) => ({ ...currentAddress, [field]: value }));
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsStatePickerVisible(false);
  };

  const openAddAddress = () => {
    setEditingAddressId(null);
    setAddress(emptyAddress);
    setSelectedType('home');
    setIsModalVisible(true);
  };

  const openEditAddress = (savedAddress) => {
    const details = savedAddress?.address || {};
    setEditingAddressId(savedAddress?._id);
    setAddress({
      pin: String(details.pin ?? ''),
      city: details.city || '',
      state: details.state || '',
      residence: details.residence || '',
      area: details.area || '',
      LandMark: details.LandMark || '',
    });
    setSelectedType(details.Label || 'other');
    setIsModalVisible(true);
  };

  const handleRemoveAddress = (addressId) => {
    Alert.alert('Remove address?', 'This address will be removed from your saved locations.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await removeAddressHandler(addressId);
            triggerToast(response.message || 'Address removed successfully');
          } catch (requestError) {
            triggerToast(requestError.message || 'Unable to remove this address');
          }
        },
      },
    ]);
  };

  const handleSetDefaultAddress = (addressId) => {
    try {
      setDefaultAddressHandler(addressId);
      triggerToast('Default delivery address updated');
    } catch (requestError) {
      triggerToast(requestError.message || 'Unable to set the default address');
    }
  };

  const handleOpenAddress = async (addressId) => {
    try {
      await getAddressByIdHandler(addressId);
      setIsDetailModalVisible(true);
    } catch (requestError) {
      triggerToast(requestError.message || 'Unable to load this address');
    }
  };

  const handleSaveAddress = async () => {
    const requiredFields = ['pin', 'city', 'state', 'residence', 'area'];
    const hasMissingField = requiredFields.some((field) => !String(address[field]).trim());
    if (hasMissingField) {
      triggerToast('Complete all required address fields');
      return;
    }

    if (!/^\d{6}$/.test(address.pin.trim())) {
      triggerToast('Enter a valid 6-digit PIN code');
      return;
    }

    if (!states.includes(address.state)) {
      triggerToast('Select a state from the list');
      return;
    }

    try {
      const addressData = {
        pin: Number(address.pin),
        city: address.city.trim(),
        state: address.state,
        residence: address.residence.trim(),
        area: address.area.trim(),
        Label: selectedType,
        ...(address.LandMark.trim() ? { LandMark: address.LandMark.trim() } : {}),
      };
      const response = editingAddressId
        ? await updateAddressHandler(editingAddressId, addressData)
        : await addAddressHandler(addressData);

      closeModal();
      setAddress(emptyAddress);
      setEditingAddressId(null);
      setSelectedType('home');
      triggerToast(response.message || (editingAddressId ? 'Address updated successfully' : 'Address saved successfully'));
    } catch (error) {
      triggerToast(error.message || 'Unable to save this address');
    }
  };

  const addressList = Array.isArray(myAddresses) ? myAddresses : [];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} top={insets.top + 50} />

      <SnitchHeader
        title="Saved Addresses"
        onBack={handleBack}
        onToast={triggerToast}
        onSearch={() => router.push('/explore')}
        onNotifications={() => triggerToast('No new notifications')}
        onProfile={() => router.push('/profile')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <View style={styles.introHeaderRow}>
            <View style={styles.introTitleGroup}>
              <Text style={styles.introTitle}>Saved Locations</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>
                  {addressList.length} Saved
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.addInlineBtn}
              onPress={openAddAddress}
              accessibilityRole="button"
              accessibilityLabel="Add destination"
            >
              <SnitchIcon name="add" size={17} color={SnitchColors.textPrimary} />
              <Text style={styles.addInlineBtnText}>Add</Text>
            </Pressable>
          </View>
          <Text style={styles.introSubtitle}>
            Manage your delivery destinations for a seamless checkout.
          </Text>
        </View>

        <Pressable
          style={styles.addNewCard}
          onPress={openAddAddress}
          accessibilityRole="button"
          accessibilityLabel="Add new address"
        >
          <View style={styles.addNewLeft}>
            <View style={styles.addNewIconCircle}>
              <SnitchIcon name="add" size={20} color={SnitchColors.textPrimary} />
            </View>
            <View style={styles.addNewTitleGroup}>
              <Text style={styles.addNewTitle}>Add New Address</Text>
              <Text style={styles.addNewSubtitle}>Add a home, work, or other destination</Text>
            </View>
          </View>
          <SnitchIcon name="chevron_right" size={20} color={SnitchColors.borderVariant} />
        </Pressable>

        <View style={styles.cardsStack}>
          {addressList.map((savedAddress, index) => {
            const details = savedAddress?.address || {};
            const label = details.Label || 'other';
            const isDefault = savedAddress?._id === defaultAddressId;

            return (
              <View
                key={savedAddress?._id || `${details.pin}-${index}`}
                style={styles.addressCard}
              >
                <Pressable
                  onPress={() => handleOpenAddress(savedAddress?._id)}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${label} address`}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.badgeRow}>
                      <View style={styles.tagBadge}>
                        <Text style={styles.tagBadgeText}>{label}</Text>
                      </View>
                    </View>
                    <View style={styles.typeIconCircle}>
                      <SnitchIcon
                        name={label === 'home' ? 'home' : label === 'work' ? 'apartment' : 'near_me'}
                        size={17}
                        color={SnitchColors.secondaryMuted}
                      />
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.addressLines}>
                      <Text style={styles.addressLine}>{details.residence}</Text>
                      <Text style={styles.addressLine}>
                        {details.area}{details.LandMark ? `, near ${details.LandMark}` : ''}
                      </Text>
                      <Text style={styles.addressCityPin}>
                        {details.city}, {details.state} — {details.pin}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <View style={styles.cardActionsWithDefault}>
                  {isDefault ? (
                    <View style={styles.defaultBadge}>
                      <SnitchIcon name="check_circle" size={13} color={SnitchColors.onPrimary} />
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  ) : (
                    <Pressable
                      style={styles.setDefaultBtn}
                      onPress={() => handleSetDefaultAddress(savedAddress?._id)}
                      disabled={loading || !savedAddress?._id}
                      accessibilityRole="button"
                      accessibilityLabel={`Set ${label} address as default`}
                    >
                      <SnitchIcon name="check_circle" size={15} color={SnitchColors.secondaryMuted} />
                      <Text style={styles.setDefaultText}>Set as default</Text>
                    </Pressable>
                  )}
                  <View style={styles.actionButtonsRight}>
                    <Pressable
                      style={styles.actionBtn}
                      onPress={() => openEditAddress(savedAddress)}
                      disabled={loading}
                      accessibilityRole="button"
                      accessibilityLabel={`Edit ${label} address`}
                    >
                      <SnitchIcon name="edit" size={15} color={SnitchColors.textPrimary} />
                      <Text style={styles.actionBtnText}>Edit</Text>
                    </Pressable>
                    <Pressable
                      style={styles.actionBtn}
                      onPress={() => handleRemoveAddress(savedAddress?._id)}
                      disabled={loading}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove ${label} address`}
                    >
                      <SnitchIcon name="delete" size={15} color={SnitchColors.textMuted} />
                      <Text style={styles.actionBtnTextRemove}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
          {addressList.length === 0 ? (
            <Text style={styles.introSubtitle}>You haven&apos;t saved any addresses yet.</Text>
          ) : null}
        </View>

        <View style={styles.assuranceCard}>
          <View style={styles.assuranceIconCircle}>
            <SnitchIcon name="verified" size={18} color={SnitchColors.secondaryMuted} />
          </View>
          <View style={styles.assuranceContent}>
            <Text style={styles.assuranceTitle}>Concierge Delivery Assurance</Text>
            <Text style={styles.assuranceSubtitle}>
              Your orders are dispatched via trusted courier partners with secure delivery.
            </Text>
          </View>
        </View>

        <View style={styles.brandMicroCard}>
          <Text style={styles.brandMicroText}>SNITCH Tailored Logistics • Bengaluru</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={isDetailModalVisible}
        onRequestClose={() => setIsDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Address Details</Text>
              <Pressable
                style={styles.modalCloseBtn}
                onPress={() => setIsDetailModalVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Close address details"
              >
                <SnitchIcon name="close" size={17} color={SnitchColors.textPrimary} />
              </Pressable>
            </View>
            {selectedAddress?.address ? (
              <View style={styles.detailModalContent}>
                {[
                  ['Label', selectedAddress.address.Label],
                  ['Residence', selectedAddress.address.residence],
                  ['Area', selectedAddress.address.area],
                  ['Landmark', selectedAddress.address.LandMark],
                  ['City', selectedAddress.address.city],
                  ['State', selectedAddress.address.state],
                  ['PIN Code', selectedAddress.address.pin],
                ]
                  .filter(([, value]) => value !== undefined && value !== null && value !== '')
                  .map(([label, value]) => (
                    <View key={label} style={styles.detailModalRow}>
                      <Text style={styles.fieldLabel}>{label}</Text>
                      <Text style={styles.detailModalText}>{String(value)}</Text>
                    </View>
                  ))}
              </View>
            ) : null}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAddressId ? 'Edit Delivery Destination' : 'Add Delivery Destination'}
              </Text>
              <Pressable
                style={styles.modalCloseBtn}
                onPress={closeModal}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <SnitchIcon name="close" size={17} color={SnitchColors.textPrimary} />
              </Pressable>
            </View>

            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.formCard}>
                <View style={styles.cardSectionHeader}>
                  <Text style={styles.cardSectionLabel}>Address & Location</Text>
                  <Text style={styles.cardSectionSubLabel}>REQUIRED DETAILS</Text>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>PIN Code</Text>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <SnitchIcon name="location_searching" size={18} color={SnitchColors.textMuted} />
                    </View>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="6-digit PIN code"
                      placeholderTextColor={SnitchColors.textLight}
                      value={address.pin}
                      onChangeText={(value) => updateAddress('pin', value.replace(/\D/g, '').slice(0, 6))}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Premise / Residence Details</Text>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <SnitchIcon name="apartment" size={18} color={SnitchColors.textMuted} />
                    </View>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="Flat, building, or house"
                      placeholderTextColor={SnitchColors.textLight}
                      value={address.residence}
                      onChangeText={(value) => updateAddress('residence', value)}
                      maxLength={150}
                    />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Area, Street & Sector</Text>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <SnitchIcon name="signpost" size={18} color={SnitchColors.textMuted} />
                    </View>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="Street, locality, or area"
                      placeholderTextColor={SnitchColors.textLight}
                      value={address.area}
                      onChangeText={(value) => updateAddress('area', value)}
                      maxLength={150}
                    />
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <View style={styles.fieldLabelRow}>
                    <Text style={styles.fieldLabel}>Landmark</Text>
                    <Text style={styles.optionalTag}>OPTIONAL</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <SnitchIcon name="storefront" size={18} color={SnitchColors.textMuted} />
                    </View>
                    <TextInput
                      style={styles.textInputField}
                      placeholder="Nearby landmark"
                      placeholderTextColor={SnitchColors.textLight}
                      value={address.LandMark}
                      onChangeText={(value) => updateAddress('LandMark', value)}
                      maxLength={150}
                    />
                  </View>
                </View>

                <View style={styles.gridRow}>
                  <View style={styles.gridCol}>
                    <Text style={styles.fieldLabel}>Town / City</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.textInputField}
                        placeholder="City"
                        placeholderTextColor={SnitchColors.textLight}
                        value={address.city}
                        onChangeText={(value) => updateAddress('city', value)}
                        maxLength={100}
                      />
                    </View>
                  </View>
                  <View style={styles.gridCol}>
                    <Text style={styles.fieldLabel}>State</Text>
                    <Pressable
                      style={styles.inputContainer}
                      onPress={() => setIsStatePickerVisible((visible) => !visible)}
                      accessibilityRole="button"
                      accessibilityLabel="Select state"
                    >
                      <Text
                        style={[
                          styles.textInputField,
                          !address.state && { color: SnitchColors.textLight },
                        ]}
                      >
                        {address.state || 'Select state'}
                      </Text>
                      <SnitchIcon name="expand_more" size={18} color={SnitchColors.textMuted} />
                    </Pressable>
                  </View>
                </View>
                {isStatePickerVisible ? (
                  <ScrollView style={styles.stateOptions} nestedScrollEnabled>
                    {states.map((state) => (
                      <Pressable
                        key={state}
                        style={styles.stateOption}
                        onPress={() => {
                          updateAddress('state', state);
                          setIsStatePickerVisible(false);
                        }}
                        accessibilityRole="button"
                      >
                        <Text style={styles.stateOptionText}>{state}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : null}
              </View>

              <View style={styles.formCard}>
                <View style={styles.cardSectionHeader}>
                  <Text style={styles.cardSectionLabel}>Save Destination As</Text>
                  <Text style={styles.cardSectionSubLabel}>LABEL YOUR LOCATION</Text>
                </View>

                <View style={styles.destinationTypeRow}>
                  {[
                    { value: 'home', title: 'Home', icon: 'home' },
                    { value: 'work', title: 'Work', icon: 'apartment' },
                    { value: 'other', title: 'Other', icon: 'near_me' },
                  ].map((type) => (
                    <Pressable
                      key={type.value}
                      style={[
                        styles.destinationTypeBtn,
                        selectedType === type.value && styles.destinationTypeBtnActive,
                      ]}
                      onPress={() => setSelectedType(type.value)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: selectedType === type.value }}
                    >
                      <SnitchIcon
                        name={type.icon}
                        size={20}
                        color={selectedType === type.value ? SnitchColors.onPrimary : SnitchColors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.destinationTypeText,
                          selectedType === type.value && styles.destinationTypeTextActive,
                        ]}
                      >
                        {type.title}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <Pressable
                style={[styles.modalSubmitBtn, loading && { opacity: 0.6 }]}
                onPress={handleSaveAddress}
                disabled={loading}
                accessibilityRole="button"
              >
                <Text style={styles.modalSubmitText}>
                  {loading
                    ? (editingAddressId ? 'Updating Address…' : 'Saving Address…')
                    : (editingAddressId ? 'Update Destination' : 'Save Destination')}
                </Text>
                {!loading ? (
                  <SnitchIcon name="arrow_forward" size={16} color={SnitchColors.onPrimary} />
                ) : null}
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
