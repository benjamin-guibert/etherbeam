import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import './TokenChart.scss'

interface TokenChartProps {
  pair: string
  width?: number
  height?: number
}

const TokenChart: FC<TokenChartProps> = ({ pair, width, height }) => {
  const classNames = [
    (!width && 'w-100') || '',
    (!height && 'h-100') || '',
    !pair ? 'my-tokenchart-unavailable' : '',
  ].join(' ')
  const style = {
    width: !!width ? `${width}px` : null,
    height: !!height ? `${height}px` : null,
  }

  return (
    <div className={classNames} style={style}>
      {pair ? (
        <TradingViewWidget
          symbol={`UNISWAP:${pair}`}
          interval={60}
          timezone="Europe/Paris"
          theme={Themes.DARK}
          allow_symbol_change={false}
          show_popup_button
          withdateranges
          autosize
        />
      ) : (
        <>
          <FontAwesomeIcon icon={faChartBar} size="5x" />
          <span>No chart available</span>
        </>
      )}
    </div>
  )
}

export default TokenChart
