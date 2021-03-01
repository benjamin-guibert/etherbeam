import React from 'react'

export const clearMocks = (): void => {
  jest.clearAllMocks()
  jest.clearAllTimers()
  jest.useFakeTimers()
}

export const mockTradingViewWidget = (): void => {
  jest.mock('react-tradingview-widget', () => {
    return {
      __esModule: true,
      Themes: {
        DARK: 'DARK',
      },
      // eslint-disable-next-line react/display-name
      default: () => <></>,
    }
  })
}

export const mockFontAwesome = (): void => {
  jest.mock('@fortawesome/react-fontawesome', () => {
    return {
      __esModule: true,
      // eslint-disable-next-line react/display-name
      FontAwesomeIcon: () => <svg />,
    }
  })
}
