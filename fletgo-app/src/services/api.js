const API_URL = 'https://www.fletgohn.com/backend';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/registrar_usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        identity: userData.identity
      })
    });

    const data = await response.json();
    return data[0]; // La API devuelve un array con un solo objeto de respuesta
  } catch (error) {
    console.error('Error en registro:', error);
    return {
      codigo: -1,
      descripcion: 'Error de conexión. Por favor, intente nuevamente.',
      estado: false
    };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch(`${API_URL}/api/activar_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: email,
        otp: parseInt(otp.join(''), 10)
      })
    });

    const success = await response.json();
    return success;
  } catch (error) {
    console.error('Error en verificación:', error);
    return false;
  }
};
