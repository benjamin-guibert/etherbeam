import React, { ReactElement } from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'

interface TokenChartProps {
  symbol: string
  width?: number
  height?: number
}

const TokenChart = ({ symbol, width, height }: TokenChartProps): ReactElement => {
  const classNames = [(!width && 'w-100') || '', (!height && 'h-100') || ''].join(' ')
  const style = {
    width: !!width ? `${width}px` : null,
    height: !!height ? `${height}px` : null,
  }

  return (
    <div className={classNames} style={style}>
      <TradingViewWidget
        symbol={`UNISWAP:${symbol}WETH`}
        interval={60}
        timezone="Europe/Paris"
        theme={Themes.DARK}
        allow_symbol_change={false}
        show_popup_button
        withdateranges
        autosize
      />
    </div>
  )
}

export default TokenChart
