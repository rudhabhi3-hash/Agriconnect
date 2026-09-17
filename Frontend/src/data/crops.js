export const cropForecasts = {
  Tomato: { demand: 41, growth: 18, confidence: 87, price: 34, logistics: 4.5 },
  Potato: { demand: 36, growth: 12, confidence: 84, price: 29, logistics: 4 },
  Onion: { demand: 32, growth: 9, confidence: 82, price: 27, logistics: 3.5 },
  Wheat: { demand: 48, growth: 6, confidence: 86, price: 26, logistics: 2.5 },
  Rice: { demand: 52, growth: 8, confidence: 85, price: 31, logistics: 3 },
};
export const cropForecastRows = Object.entries(cropForecasts).map(([crop, forecast]) => [crop, `${forecast.growth >= 0 ? '+' : ''}${forecast.growth}%`, `${forecast.demand}T`]);
export const cropInputFields = [['Crop', 'crop'], ['Quantity (tonnes)', 'quantity'], ['Quality', 'quality'], ['Location', 'location']];
export const unavailableForecast = { demand: 0, growth: 0, confidence: 0, price: 0, logistics: 0 };
export function getCropForecast(crop) { return cropForecasts[crop.trim()] || unavailableForecast; }
