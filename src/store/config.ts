/**
 * Data structure of the AppStore state
 */
export interface AppStoreState {
  isAuthenticated: boolean;
  currentUser?: { id: string; email: string };
  darkMode: boolean;
}

/**
 * Initial values for the AppStore state
 */
export const APP_STORE_INITIAL_STATE: AppStoreState = {
  isAuthenticated: false,
  currentUser: undefined,
  darkMode: false,
};

