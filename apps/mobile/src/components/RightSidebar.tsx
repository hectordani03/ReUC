// apps/mobile/src/components/RightSidebar.tsx

import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
  Switch,
} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useThemedStyles } from '../hooks/useThemedStyles'
import { createRightSidebarStyles } from '../styles/components/header/RightSidebar.styles'
import { useTheme } from '../context/ThemeContext' 

type Props = {
  isVisible: boolean
  onClose: () => void
  onNavigate?: (screen: string) => void
  userEmail?: string
  userAvatar?: any
}

type MenuItem = {
  icon: string
  iconType: 'ionicons' | 'material'
  label: string
  screen: string
  hasSubmenu?: boolean
}

type AccessibilityItem = {
  icon: string
  iconType: 'ionicons' | 'material'
  label: string
  setting: string
  hasToggle?: boolean
}

const menuItems: MenuItem[] = [
  { icon: 'person-outline', iconType: 'ionicons', label: 'Mi perfil', screen: 'Profile' },
  { icon: 'accessibility-outline', iconType: 'ionicons', label: 'Accesibilidad', screen: 'Accessibility', hasSubmenu: true },
  { icon: 'settings-outline', iconType: 'ionicons', label: 'Configuración', screen: 'Settings' },
  { icon: 'help-circle-outline', iconType: 'ionicons', label: 'Ayuda', screen: 'Help' },
]

const accessibilityItems: AccessibilityItem[] = [
  { icon: 'moon-outline', iconType: 'ionicons', label: 'Modo Oscuro', setting: 'darkMode', hasToggle: true },
  { icon: 'contrast-outline', iconType: 'ionicons', label: 'Alto Contraste', setting: 'highContrast', hasToggle: true },
  { icon: 'text-outline', iconType: 'ionicons', label: 'Cambio de Fuente', setting: 'fontChange' },
]

export default function RightSidebar({
  isVisible,
  onClose,
  onNavigate,
  userEmail = 'usuario@ejemplo.com',
  userAvatar
}: Props) {
  const styles = useThemedStyles(createRightSidebarStyles)
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  // Utiliza los nuevos valores del contexto
  const { themeMode, setThemeMode, isDarkMode, isHighContrast } = useTheme()

  // Refleja el estado del contexto en los switches
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    darkMode: themeMode === 'dark',
    highContrast: themeMode === 'highContrast',
  })

  // Mantiene los switches sincronizados con el contexto
  useEffect(() => {
    setAccessibilitySettings({
      darkMode: themeMode === 'dark',
      highContrast: themeMode === 'highContrast',
    })
  }, [themeMode])

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible])

  const toggleSubmenu = (screen: string) => {
    setExpandedMenus(prev =>
      prev.includes(screen)
        ? prev.filter(s => s !== screen)
        : [...prev, screen]
    )
  }

  const toggleAccessibilitySetting = (setting: string) => {
    if (setting === 'darkMode') {
      setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
    }
    if (setting === 'highContrast') {
      setThemeMode(themeMode === 'highContrast' ? 'light' : 'highContrast')
    }
  }

  const renderIcon = (item: MenuItem) => {
    if (item.iconType === 'ionicons') {
      return (
        <Ionicons
          name={item.icon as any}
          size={24}
          style={styles.menuIcon}
        />
      )
    }
    return (
      <MaterialIcons
        name={item.icon as any}
        size={24}
        style={styles.menuIcon}
      />
    )
  }

  const handleMenuPress = (item: MenuItem | string) => {
    let screen = typeof item === "string" ? item : item.screen
    if (typeof item !== "string" && item.hasSubmenu) {
      toggleSubmenu(item.screen)
    } else {
      onNavigate?.(screen)
      onClose()
    }
  }

  const handleAccessibilityPress = (setting: string) => {
    if (setting === 'fontChange') {
      onNavigate?.('FontSettings')
      onClose()
    }
  }

  const renderAccessibilitySubmenu = () => (
    <View style={styles.submenuContainer}>
      {accessibilityItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.submenuItem}
          onPress={() => handleAccessibilityPress(item.setting)}
        >
          <View style={styles.submenuItemContent}>
            {item.iconType === 'ionicons' ? (
              <Ionicons
                name={item.icon as any}
                size={20}
                style={styles.submenuIcon}
              />
            ) : (
              <MaterialIcons
                name={item.icon as any}
                size={20}
                style={styles.submenuIcon}
              />
            )}
            <Text style={styles.submenuText}>{item.label}</Text>
          </View>
          {item.hasToggle && (
            <Switch
              value={accessibilitySettings[item.setting as keyof typeof accessibilitySettings]}
              onValueChange={() => toggleAccessibilitySetting(item.setting)}
              trackColor={{ false: styles.switchTrack.color, true: styles.switchTrackActive.color }}
              thumbColor={styles.switchThumb.color}
              style={styles.switch}
              disabled={
                (item.setting === 'darkMode' && accessibilitySettings.highContrast) ||
                (item.setting === 'highContrast' && accessibilitySettings.darkMode)
              }
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.sidebar,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} style={styles.closeIcon} />
                </TouchableOpacity>

                <View style={styles.profileContainer}>
                  <Image
                    source={userAvatar || require('../assets/avatar.png')}
                    style={styles.profileAvatar}
                  />
                  <Text style={styles.userEmail}>{userEmail}</Text>
                </View>
              </View>

              {/* Menu Items */}
              <ScrollView style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => handleMenuPress(item)}
                    >
                      {renderIcon(item)}
                      <Text style={styles.menuText}>{item.label}</Text>
                      {item.hasSubmenu && (
                        <Ionicons
                          name={expandedMenus.includes(item.screen) ? "chevron-up" : "chevron-down"}
                          size={20}
                          style={styles.chevronIcon}
                        />
                      )}
                    </TouchableOpacity>
                    {item.hasSubmenu && expandedMenus.includes(item.screen) && renderAccessibilitySubmenu()}
                  </View>
                ))}
              </ScrollView>

              {/* Logout Button */}
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => handleMenuPress('Logout')}
              >
                <Ionicons
                  name="log-out-outline"
                  size={24}
                  style={styles.logoutIcon}
                />
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
