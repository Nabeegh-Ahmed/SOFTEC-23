import { InventoryItem, InventoryType } from "../../types";
import { productReviews } from "./reviews";

export const inventory: InventoryItem[] = [
    {
        _id: "1",
        title: "Head Set",
        description: `
            Headset for Xbox Series X|S and Xbox One (Xbox Wireless & Bluetooth Connectivity, 40mm Drivers, Xbox Series X|S & Xbox One Compatibility, Windows Sonic Surround Sound) - Black/Green
            
            The Kaira Pro is the first Xbox headset to feature Razer's latest award-winning audio technologies.

            Built for Xbox Series X|S and Xbox One, the Kaira Pro features Razer TriForce Titanium 50mm Drivers, delivering bright, clear audio that sounds amazing on the battlefield.

            The headset also includes a detachable Razer HyperClear Supercardioid Mic with advanced voice isolation technology for crystal-clear communication.

        `,
        photo: "https://assets3.razerzone.com/Fw9B-jp8FqZ4tFP4aAqTikIk0Eg=/500x500/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh1b%2Fh31%2F9512192245790%2F230502-kaira-hyperspeed-xbox-licensed-green-500x500.png",
        quantity: 10,
        market_price: 1200,
        cost_price: 1000,
        margin: 200,
        inventory_type: InventoryType.VIDEO_GAME,
        minimum_age: 25,
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
        ratings: productReviews
    },
    {
        _id: "2",
        title: "Xbox Series X",
        description: `
        Headset for Xbox Series X|S and Xbox One (Xbox Wireless & Bluetooth Connectivity, 40mm Drivers, Xbox Series X|S & Xbox One Compatibility, Windows Sonic Surround Sound) - Black/Green
            
        The Kaira Pro is the first Xbox headset to feature Razer's latest award-winning audio technologies.

        Built for Xbox Series X|S and Xbox One, the Kaira Pro features Razer TriForce Titanium 50mm Drivers, delivering bright, clear audio that sounds amazing on the battlefield.

        The headset also includes a detachable Razer HyperClear Supercardioid Mic with advanced voice isolation technology for crystal-clear communication.
        `,
        photo: "https://thegadgetflow.com/wp-content/uploads/2019/12/14-Gaming-gear-and-gadgets-for-any-serious-gamer-04.jpg",
        quantity: 10,
        market_price: 5000,
        cost_price: 4000,
        margin: 1000,
        inventory_type: InventoryType.VIDEO_GAME,
        minimum_age: 32,
        createdAt: "2021-10-10",
        updatedAt: "2021-10-10",
        ratings: productReviews
    }
]
