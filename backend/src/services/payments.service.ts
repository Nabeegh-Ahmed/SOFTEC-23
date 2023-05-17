import Stripe from "stripe"
import config from "config"

const stripe = new Stripe("sk_test_51N3BqAHEhkXOAAliqhC4Tk8anxJzfs31diFS5RDtXo7QR97fsAjhfsG9Vu2FFlfuZt10dtVQ3JfJtCxPM9Bs4mIt00o5JyRPgO", {
    apiVersion: "2022-11-15"
})

export class PaymentService {
    addProduct = async (inventoryItem: any) => {
        return await stripe.products.create({
            name: inventoryItem.title,
            default_price_data: {
                currency: "pkr",
                unit_amount: inventoryItem.market_price * 100,
            }
        })
    }

    createPaymentSession = async (orderId: string, lineItems: { price: string, quantity: number }[]) => {
        const MY_URL = config.get<string>('my_url');
        return await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `${MY_URL}/api/orders/${orderId}/approve`,
            cancel_url: `${MY_URL}/api/orders/${orderId}/failed`,
        });
    }

    // TODO Update prices as well
}