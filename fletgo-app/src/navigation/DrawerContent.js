import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useUserMode } from '../context/UserModeContext';

export function DrawerContent(props) {
  const { isDriverMode, toggleDriverMode } = useUserMode();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Gabriel</Text>
            <Text style={styles.userEmail}>gabriel.lulo@gmail...</Text>
            <Text style={styles.location}>Honduras</Text>
          </View>
        </View>
        
        <View style={styles.drawerContent}>
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons 
                name={isDriverMode ? "magnify" : "home-outline"} 
                size={size} 
                color={colors.secondary} 
              />
            )}
            label={isDriverMode ? "Buscar Fletes" : "Pedir un flete"}
            onPress={() => {
              props.navigation.navigate('Home');
              props.navigation.closeDrawer();
            }}
            labelStyle={styles.drawerLabel}
          />
          
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons name="car-outline" size={size} color={colors.text} />
            )}
            label="Mis fletes"
            onPress={() => {
              props.navigation.navigate('MyFletes');
              props.navigation.closeDrawer();
            }}
            labelStyle={styles.drawerLabel}
          />
          
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons 
                name={isDriverMode ? "cash" : "file-document-outline"} 
                size={size} 
                color={colors.text} 
              />
            )}
            label={isDriverMode ? "Mis Ingresos" : "Mis Facturas"}
            onPress={() => {
              props.navigation.navigate(isDriverMode ? 'Income' : 'Invoices');
              props.navigation.closeDrawer();
            }}
            labelStyle={styles.drawerLabel}
          />
          
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons name="message-outline" size={size} color={colors.text} />
            )}
            label="Contáctanos"
            onPress={() => {
              props.navigation.navigate('Contact');
              props.navigation.closeDrawer();
            }}
            labelStyle={styles.drawerLabel}
          />

          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons name="alert-outline" size={size} color={colors.text} />
            )}
            label="Emergencia"
            onPress={() => {
              props.navigation.navigate('Emergency');
              props.navigation.closeDrawer();
            }}
            labelStyle={styles.drawerLabel}
          />
          
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons 
                name={isDriverMode ? "account" : "account-convert"} 
                size={size} 
                color={isDriverMode ? colors.secondary : colors.text} 
              />
            )}
            label={isDriverMode ? "Modo Cliente" : "Modo Conductor"}
            onPress={toggleDriverMode}
            labelStyle={[
              styles.drawerLabel,
              isDriverMode && styles.activeLabel
            ]}
          />
          
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons name="logout" size={size} color={colors.text} />
            )}
            label="Salir"
            onPress={() => {
              // Handle logout logic here
              props.navigation.navigate('Login');
              props.navigation.closeDrawer();
            }}
            labelStyle={styles.drawerLabel}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  userSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 10,
  },
  drawerLabel: {
    fontSize: 14,
    color: colors.text,
  },
  activeLabel: {
    color: colors.secondary,
  },
});
