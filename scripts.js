// Fonction pour récupérer les données des crypto-monnaies
async function fetchCryptoData() {
    const apiKey = "37d76517-4ec3-470b-a50f-131cbddd32eb";
    const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5&convert=USD&CMC_PRO_API_KEY=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const cryptoList = document.getElementById("crypto-list");

        response.data.data.forEach(crypto => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${crypto.name} (${crypto.symbol}) - ${crypto.quote.USD.price.toFixed
