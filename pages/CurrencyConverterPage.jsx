import React, {useEffect} from "react";

        function showCurrencyName() {
            var selectCurrency = document.getElementById("toCurrency");
            var currencyName = selectCurrency.options[selectCurrency.selectedIndex].text;
            document.getElementById("currencyName").innerHTML = currencyName;
        }
    
        function showFromCurrencyName() {
            var selectFromCurrency = document.getElementById("fromCurrency");
            var fromCurrencyName = selectFromCurrency.options[selectFromCurrency.selectedIndex].text;
            document.getElementById("fromCurrencyName").innerHTML = fromCurrencyName;
        }

const CurrencyConverterPage = () => {
    useEffect(() => {
    
        const amountInput = document.querySelector('#amount');
        const fromCurrencySelect = document.querySelector('#fromCurrency');
        const toCurrencySelect = document.querySelector('#toCurrency');
        const convertButton = document.querySelector('#convert');
        const resultParagraph = document.querySelector('#result');
        
        convertButton.addEventListener('click', () => {
            const amount = amountInput.value;
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const apiKey = "b3262cfe9a61c57ac06d15ddba43fcb4efff9b051e3760f35fc4c9a2d6d70953";
            const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${toCurrency}&tsyms=${fromCurrency}&api_key=${apiKey}`;
          
            fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                const rate = data[fromCurrency];
                const result = amount / rate;
          
                resultParagraph.innerHTML = `${amount} ${fromCurrency} is equal to ${result.toFixed(8)} ${toCurrency}`;
              })
              .catch(error => {
                resultParagraph.innerHTML = "Error: Unable to fetch exchange rate.";
                console.error(error);
              });
        });

    }, []);
  return (
    <div className="container" style={{ width: "600px", margin: "auto", padding: "auto", height: "600px", borderRadius: "8px", background: "#fff", boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
      <div className="img-placed">
        <img src="https://i.imgur.com/YgmULQP.png" alt="" style={{ width: "600px" }} />
      </div>

      <form action="">
        <input type="text" name="amount" id="amount" placeholder="Enter Amount" required style={{ width: "87%", margin: "auto", display: "block", fontSize: "1rem", background: "none", lineHeight: "1.5", padding: "12px", borderRadius: "6px", color: "#141e37", border: "1px solid rgb(221, 221, 221)" }} />

        <label id="fromCurrencyName" style={{ marginTop: "0", fontSize: "16px", color: "#667c99", fontWeight: "600", display: "inline-block", margin: "15px 40px 7.5px" }}></label>
        <div id="select-field" style={{ display: "flex", justifyContent: "space-between" }}>
          <select name="toCurrency" id="fromCurrency" onChange={showFromCurrencyName} style={{ width: "40%", margin: "auto", display: "block", fontSize: "1rem", padding: "12px", background: "none", borderRadius: "6px", color: "rgb(20, 30, 55)", border: "1px solid rgb(221, 221, 221)" }}>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
            <option value="BNB">Binance Coin (BNB)</option>
            <option value="USDC">USD Coin (USDC)</option>
            <option value="XRP">XRP (XRP)</option>
            <option value="BUSD">Binance USD (BUSD)</option>
            <option value="ADA">cardano (ADA)</option>
            <option value="DOGE">Dogecoin (DOGE)</option>
            <option value="MATIC">Polygon (MATIC)</option>
            <option value="SOL">Solana (SOL)</option>
            <option value="DOT">Polkadot (DOT)</option>
            <option value="SHIB">Shiba Inu (SHIB)</option>
            <option value="LTC">Litecoin (LTC)</option>
            <option value="TRX">Tron (TRX)</option>
            <option value="AVAX">Avalanche (AVAX)</option>
          </select>

          <select name="fromCurrency" id="toCurrency" onChange={showCurrencyName} style={{ width: "40%", margin: "auto", display: "block", fontSize: "1rem", padding: "12px", background: "none", borderRadius: "6px", color: "rgb(20, 30, 55)", border: "1px solid rgb(221, 221, 221)" }}>
            <option value="USD" selected="">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="INR">INR - India Rupee</option>
            <option value="NZD">NZD - New Zealand Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="ZAR">ZAR - South African Rand</option>
            <option value="BGN">BGN - Bulgarian Lev</option>
            <option value="SGD">SGD - Singapore Dollar</option>
            <option value="HKD">HKD - Hong Kong Dollar</option>
            <option value="SEK">SEK - Swedish Krona</option>
            <option value="THB">THB - Thai Baht</option>
            <option value="HUF">HUF - Hungarian Forint</option>
            <option value="CNY">CNY - Chinese Yuan Renminbi</option>
            <option value="NOK">NOK - Norwegian Krone</option>
            <option value="MXN">MXN - Mexican Peso</option>
            <option value="GHS">GHS - Ghanians Cedi</option>
            <option value="NGN">NGN - Nigerian Naira</option>
          </select>
        </div>

        <br />

        <button type="button" id="convert" className="primary-btn" style={{ display: "block", justifyContent: "center", alignItems: "center", minWidth: "0px", width: "87%", cursor: "pointer", margin: "auto", outlineOffset: "4px", fontWeight: "600", textAlign: "center", textDecoration: "none", transitionProperty: "background-color, border-color", transitionDuration: "0.3s", padding: "10px 20px", fontSize: "20px", borderRadius: "8px", color: "rgb(255, 255, 255)", backgroundColor: "#430A5D", border: "2px solid #430A5D" }}>
          Convert
        </button>
      </form>

      <p id="result" style={{ color: "#141e37", marginTop: "15px", fontSize: "20px", fontWeight: "400", textAlign: "center" }}></p>
    </div>
  );
};

export default CurrencyConverterPage;
