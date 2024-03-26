/*import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8081',
  realm: 'SOPM',
  clientId: 'Charter-pod',
  redirectUri: 'http://localhost:8080/*'
}

let keycloak = null;

const initKeycloak = () => {
  keycloak = new Keycloak(keycloakConfig);
  return keycloak
    .init({ onLoad: 'login-required' })
    .then((authenticated) => {
      console.log('Keycloak initialization successful:', authenticated);
      return authenticated;
    })
    .catch((error) => {
      console.error('Keycloak initialization failed:', error);
      throw error;
    });
};

const getKeycloakInstance = () => {
  if (!keycloak) {
    throw new Error('Keycloak instance not initialized. Make sure to call initKeycloak() first.');
  }
  return keycloak;
};

export { initKeycloak, getKeycloakInstance }; */
