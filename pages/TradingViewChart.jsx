import React, { useEffect, useRef, memo, useState } from 'react';
// import "./tradingViewChart.css"

function TradingViewChart() {
  const container = useRef();

  const [active, setActive]=useState("button2");
  const [intervalValue, setIntervalValue]=useState("D");

  const handleClick = (buttonName,interval)=>{
    setActive(buttonName);
    setIntervalValue(interval);
  }

  useEffect(
    () => {
      if (!container.current.querySelector("script")) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          autosize: true,
          symbol: "BITSTAMP:BTCUSD",
          interval: intervalValue,
          timezone: "Etc/UTC",
          theme: "light",
          style: "3",
          locale: "en",
          enable_publishing: false,
          gridColor: "rgba(255, 255, 255, 0)",
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          calendar: false,
          hide_volume: true,
          support_host: "https://www.tradingview.com"
        });
        container.current.appendChild(script);
      }
    },
    [intervalValue]
  );

  return (
  <>
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%",outline:"none" }}>
      <div className='bitcoin-duration-conatiner'>
        <div className="bitcoin-duration-conatiner-left">Bitcoin Price Chart (USD)</div>
        <div className="bitcoin-duration-conatiner-right">
          <ul>
            <li className={active==='button1'? "active" : ""} onClick={()=>{handleClick("button1", "60")}}>1H</li>
            <li className={active==='button2'? "active" : ""} onClick={()=>{handleClick("button2","D")}}>24H</li>
            <li className={active==='button3'? "active" : ""} onClick={()=>{handleClick("button3","W"); }}>7D</li>
            <li className={active==='button4'? "active" : ""} onClick={()=>{handleClick("button4","W")}}>1M</li>
            <li className={active==='button5'? "active" : ""} onClick={()=>{handleClick("button5","W")}}>3M</li>
            <li className={active==='button6'? "active" : ""} onClick={()=>{handleClick("button6","W")}}>6M</li>
            <li className={active==='button7'? "active" : ""} onClick={()=>{handleClick("button7","W")}}>1Y</li>
            <li className={active==='button8'? "active" : ""} onClick={()=>{handleClick("button8","W")}}>ALL</li>
          </ul>
           </div>
      </div>
      <div className="tradingview-widget-container__widget" style={{ height: "600px", width: "100%",outline:"none" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
    </>
  );
}

export default TradingViewChart;