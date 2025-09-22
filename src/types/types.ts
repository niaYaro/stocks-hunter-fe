export interface StockData {
    general: {
        fullName: string;
        price: number;
        ticker: string;
        type: string;
    }
    technicalIndicators: {
        bbValues: {
            lower: number;
            middle: number;
            pb: number;
            upper: number;
        };
        crossPossition: "Down" | "Up";
        macd: {
            MACD: number;
            histogram: number;
            signal: number;
        }[];
        rsi: number;
    }
}