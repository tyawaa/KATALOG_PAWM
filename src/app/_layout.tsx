import type { ReactElement } from 'react';

import App from '../../App';
import { FavoritProvider } from '../context/FavoritContext';
import { ProfilProvider } from '../context/ProfilContext';
import AppNavigator from '../navigation/AppNavigator';

export const unstable_settings = { initialRouteName: '(tabs)' };

export default function RootLayout(): ReactElement {
  return (
    <App>
      <FavoritProvider>
        <ProfilProvider>
          <AppNavigator />
        </ProfilProvider>
      </FavoritProvider>
    </App>
  );
}
