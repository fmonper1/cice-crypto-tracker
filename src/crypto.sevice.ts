const fetch = (input: any) =>
  window
    .fetch(input, {
      method: "GET",
    })
    .then((res) => res.json());

const BASE_URL = "https://api.coingecko.com/api/v3/";

export const CryptoService = {
  getCoin: (id: any) => {
    return fetch(`${BASE_URL}coins/${id}`);
  },
};
