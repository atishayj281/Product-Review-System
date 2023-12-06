import { User } from "./User";
import { product } from "./product";
import { reviewRequest } from "./reviewRequest";


export interface reviewRequestDetails{
    user: User,
    product: product,
    request: reviewRequest
}