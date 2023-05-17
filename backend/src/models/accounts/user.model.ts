import {
	index,
	modelOptions,
	pre,
	prop,
	Ref,
	Severity,
} from "@typegoose/typegoose";

import { IAccount } from "./base-account.model";
import { Gender } from "../../types";
import { FavoriteProducts } from "../favorite-products.model";
import { Dispute } from "../disputes.model";

export const userConfig = {
	user: {
		isEmailVerified: {
			default: false,
		},
		isPhoneNumberVerified: {
			default: false,
		},
		isIdVerified: {
			default: false,
		},
		idNumber: {
			regex: /^\d{5}-\d{7}-\d$/,
		},
		phoneNumber: {
			// Pakistan phone number
			regex: /^(\+92|0092|92|0)?-3[0-9]{2}[0-9]{7}$/g,
		},
	},
};

@index({ email: 1, phoneNumber: 1 })
@modelOptions({
	schemaOptions: {
		// Add createdAt and updatedAt fields
		timestamps: true,
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})

// Export the User class to be used as TypeScript type
export class User extends IAccount {
	@prop({ required: true })
	dob: string;

	@prop({ required: true })
	gender: Gender;

	@prop({ required: false, ref: () => FavoriteProducts, default: [] })
	favoriteProducts?: FavoriteProducts[];

	@prop({ required: false, ref: () => Dispute, default: [] })
	disputes?: Dispute[];
}
