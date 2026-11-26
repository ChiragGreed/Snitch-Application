import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';

export default function EmptyState({
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
  actionIcon,
  icon,
  iconColor = SnitchColors.textMuted,
  showIconContainer = true,
  containerStyle,
  iconContainerStyle,
  titleStyle,
  descriptionStyle,
  actionStyle,
  actionTextStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon ? (
        showIconContainer ? (
          <View style={[styles.iconContainer, iconContainerStyle]}>
            <SnitchIcon name={icon} size={34} color={iconColor} />
          </View>
        ) : (
          <SnitchIcon name={icon} size={34} color={iconColor} />
        )
      ) : null}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, descriptionStyle]}>{description}</Text>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={[styles.action, actionStyle]}
        >
          {actionIcon ? (
            <SnitchIcon
              name={actionIcon}
              size={16}
              color={SnitchColors.onPrimary}
            />
          ) : null}
          <Text style={[styles.actionText, actionTextStyle]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SnitchSpacing.xl,
    paddingVertical: SnitchSpacing.xxl,
  },
  iconContainer: {
    width: 72,
    height: 72,
    marginBottom: SnitchSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  title: {
    color: SnitchColors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    marginTop: SnitchSpacing.sm,
    color: SnitchColors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  action: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: SnitchSpacing.xl,
    paddingHorizontal: SnitchSpacing.xl,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
  },
  actionText: {
    color: SnitchColors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
});
