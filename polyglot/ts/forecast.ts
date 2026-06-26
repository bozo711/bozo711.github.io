// Revenue forecasting — written in TypeScript, compiled to JavaScript, used by the app.
interface Forecast { gross: number; net: number; perSale: number; salesToGoal: number; }

const TSForecast = {
  // Gumroad takes ~10% + $0.30 per sale
  netPerSale(price: number): number {
    return Math.max(0, price - (price * 0.10 + 0.30));
  },
  project(price: number, salesPerDay: number, monthlyGoal: number): Forecast {
    const perSale = this.netPerSale(price);
    const salesToGoal = perSale > 0 ? Math.ceil(monthlyGoal / perSale) : 0;
    return { gross: price * salesPerDay * 30, net: perSale * salesPerDay * 30, perSale, salesToGoal };
  }
};
(window as any).TSForecast = TSForecast;
