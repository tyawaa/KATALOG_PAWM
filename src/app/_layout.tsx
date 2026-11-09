import type { ReactElement } from 'react';

import App from '../../App';
import AppNavigator from '../navigation/AppNavigator';

export const unstable_settings = { initialRouteName: '(tabs)' };

export default function RootLayout(): ReactElement {
  return <App><AppNavigator /></App>;
}
