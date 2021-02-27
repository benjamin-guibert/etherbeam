import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { CSSProperties, FC } from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import './TokenChart.scss'

interface TokenChartProps {
  pair: string | null
  width?: number
  height?: number
}

const TokenChart: FC<TokenChartProps> = ({ pair, width, height }) => {
  const classNames = [
    (!width && 'w-100') || '',
    (!height && 'h-100') || '',
    !pair ? 'my-tokenchart-unavailable' : '',
  ].join(' ')
  const style: CSSProperties = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
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
