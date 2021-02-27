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
      default: () => <></>,
    }
  })
}

export const mockFontAwesome = (): void => {
  jest.mock('@fortawesome/react-fontawesome', () => {
    return {
      __esModule: true,
      FontAwesomeIcon: () => <svg />,
    }
  })
}
