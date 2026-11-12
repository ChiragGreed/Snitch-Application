import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import { SnitchIcon } from '@/components/snitch-icon';

/**
 * CreateListModal
 *
 * Props:
 *  visible   – boolean
 *  onClose   – () => void
 *  onCreate  – (name: string) => void
 */
export default function CreateListModal({ visible, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a list name.');
      return;
    }
    if (trimmed.length > 40) {
      setError('Name must be 40 characters or less.');
      return;
    }
    onCreate(trimmed);
    setName('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.kvWrapper}
        >
          <Pressable style={styles.sheet} onPress={() => {}}>
            {/* Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>New List</Text>
              <Pressable
                style={styles.closeButton}
                onPress={handleClose}
                hitSlop={8}
                accessibilityLabel="Close"
              >
                <SnitchIcon name="close" size={20} color={SnitchColors.textMuted} />
              </Pressable>
            </View>

            <Text style={styles.sheetSubtitle}>
              Give your collection a name to keep your wishlist organised.
            </Text>

            {/* Input */}
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="e.g. Summer Drops, Gift Ideas…"
              placeholderTextColor={SnitchColors.textLight}
              value={name}
              onChangeText={(t) => { setName(t); setError(''); }}
              maxLength={41}
              returnKeyType="done"
              onSubmitEditing={handleCreate}
              autoFocus
              selectionColor={SnitchColors.primary}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.createButton, !name.trim() && styles.createButtonDisabled]}
                onPress={handleCreate}
                disabled={!name.trim()}
              >
                <Text style={styles.createText}>Create List</Text>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  kvWrapper: {
    width: '100%',
  },
  sheet: {
    backgroundColor: SnitchColors.surfaceCard,
    borderTopLeftRadius: SnitchRadius.xl,
    borderTopRightRadius: SnitchRadius.xl,
    paddingHorizontal: SnitchSpacing.xl,
    paddingTop: SnitchSpacing.xl,
    paddingBottom: SnitchSpacing.xxl,
    gap: SnitchSpacing.md,
    // drag handle-like top bar
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SnitchSpacing.xs,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: SnitchColors.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  sheetSubtitle: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    lineHeight: 19,
  },
  input: {
    marginTop: SnitchSpacing.xs,
    height: 48,
    borderWidth: 1.5,
    borderColor: SnitchColors.border,
    borderRadius: SnitchRadius.md,
    paddingHorizontal: SnitchSpacing.gutter,
    fontSize: 15,
    color: SnitchColors.textPrimary,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  inputError: {
    borderColor: SnitchColors.error,
  },
  errorText: {
    fontSize: 12,
    color: SnitchColors.error,
    marginTop: -SnitchSpacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: SnitchSpacing.sm,
    marginTop: SnitchSpacing.sm,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  createButton: {
    flex: 2,
    height: 48,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    opacity: 0.4,
  },
  createText: {
    fontSize: 14,
    fontWeight: '700',
    color: SnitchColors.onPrimary,
    letterSpacing: 0.3,
  },
});

