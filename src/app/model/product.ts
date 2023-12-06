import { image } from "./image";
import { productInfo } from "./productInfo";

export interface product{
    productInfo: productInfo
    images: Array<image>
}