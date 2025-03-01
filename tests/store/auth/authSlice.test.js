import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice', () => {
  test('debe de regresar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  });

  test('debe de realizar un login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    })
  });

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer(initialState, onLogout())
    expect(state).toEqual(notAuthenticatedState)
  });

  test('debe de realizar el logout con mensaje', () => {
    const errorMessage = 'Credenciales no válidas'
    const state = authSlice.reducer(initialState, onLogout(errorMessage))
    // console.log(state);
    
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage,
    })
  });

  test('debe de limpiar el mensaje de error', () => {
    const errorMessage = 'Credenciales no válidas'
    const state = authSlice.reducer(initialState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage())

    expect(newState.errorMessage).toBe(undefined)
  });
});