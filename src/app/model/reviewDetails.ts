import { User } from "./User";
import { product } from "./product";
import { review } from "./review";

export interface reviewDetails {
    user: User,
    product: product,
    review: review
}