const axios = require('axios');

module.exports = {
    getFlightPrice: async (params) => {
        try {
            const { source, destination, date } = params;
            const flightDate = new Date(date);
            let data = {
                "query": {
                    "market": "IN",
                    "locale": "en-US",
                    "currency": "INR",
                    "queryLegs": [
                        {
                            "originPlace": {
                            "queryPlace": {
                                "iata": source
                            }
                            },
                            "destinationPlace": {
                            "queryPlace": {
                                "iata": destination
                            }
                            },
                            "fixedDate": {
                                "year": flightDate.getFullYear(),
                                "month": flightDate.getMonth() + 1,
                                "day": flightDate.getDate()
                            }
                        }
                    ]
                }
            }


            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search',
                headers: { 
                    'x-api-key': process.env.SKYSCANNER_API_KEY, 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            const response = await axios.request(config)
            const raw_result = response.data.content.results;
            const quote_keys = Object.keys(raw_result.quotes);
            const flight_prices = {};
            let rupeeIndian = Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            });
            for(let i = 0; i < quote_keys.length; i++) {
                const key = quote_keys[i];
                const quote = raw_result.quotes[key];
                const price = quote.minPrice.amount;
                const carrier = raw_result.carriers[quote.outboundLeg.marketingCarrierId].name;
                flight_prices[carrier] = rupeeIndian.format(price);
            }

            return flight_prices;

        } catch (error) {
            throw error.response.data;
        }
    }
}