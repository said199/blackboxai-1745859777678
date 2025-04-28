import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { SvgXml } from 'react-native-svg';
import { LogoSvg } from '../assets/images/logo';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    return phone.length >= 8;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRegister = () => {
    const newErrors = {};
    
    // Validar nombre
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    
    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Ingresa un teléfono válido';
    }

    setErrors(newErrors);

    // Si no hay errores, navegar a verificación
    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('Verification');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar</Text>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <SvgXml xml={LogoSvg} width={280} height={100} />
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="Nombre Completo"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            placeholderTextColor="#999"
          />
          {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Correo"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        </View>

        <CustomButton
          title="CONTINUE"
          onPress={handleRegister}
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 30,
    marginBottom: 40,
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 25,
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: colors.primary,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: colors.secondary,
    width: '100%',
    marginTop: 45,
    borderRadius: 4,
    height: 50,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
