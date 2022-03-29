import "./style.css";
import { CryptoService } from "./crypto.sevice";
const app = document.querySelector<HTMLDivElement>("#display")!;
const searchBtn = document.querySelector<HTMLButtonElement>("#search button")!;
const searchResults =
  document.querySelector<HTMLButtonElement>("#search_result")!;

searchBtn.addEventListener("click", async () => {
  try {
    const value = document.querySelector<HTMLInputElement>("#searchbox")?.value;
    const coinData = await CryptoService.getCoin(value);
    searchResults.replaceChildren(createShowcase(coinData));
  } catch (e) {
    alert(e);
  }
});

const coinIds = ["bitcoin", "ethereum"];
const promises = coinIds.map((id) => CryptoService.getCoin(id));

Promise.all(promises)
  .then((data) => {
    data.forEach((coin) => {
      const elToInsert = createShowcase(coin);
      app.appendChild(elToInsert);
    });
  })
  .catch((e) => console.error(e));

const createShowcase = (data: any) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("coin", data.id);

  const title = document.createTextNode(data.localization.es);
  wrapper.appendChild(title);

  const marketData = document.createElement("div");
  const marketDataEntries = [
    document.createTextNode(`ath: ${data.market_data.ath.eur}€`),
    document.createTextNode(
      `current price: ${data.market_data.current_price.eur}€`
    ),
    document.createTextNode(`rank: ${data.coingecko_rank}`),
  ];

  marketDataEntries.forEach((element) => {
    const marketDataWrapper = document.createElement("div");
    marketDataWrapper.appendChild(element);
    marketData.appendChild(marketDataWrapper);
  });

  wrapper.appendChild(marketData);
  return wrapper;
};
