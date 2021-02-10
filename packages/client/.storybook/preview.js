import '../src/styles/index.scss'
import { themes } from '@storybook/theming'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: themes.dark,
  },
  backgrounds: {
    values: [
      { name: 'Background', value: '#2E2F2F' },
      { name: 'Dark', value: '#333333' },
      { name: 'Light', value: '#e0e0e0' },
    ],
  },
  controls: { hideNoControlsWarning: true },
}
