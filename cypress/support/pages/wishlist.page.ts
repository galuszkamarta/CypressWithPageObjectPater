import { CypressHelper } from "../utils/cypress.helper";
import { PageElements } from "./page.elements";


export class WishlistPage {
    private readonly elements: PageElements = {
        text: {
            wishlistHeader: "//h1[@class='wishlist__header']",
            productCardName: "//h2[@class='product-card__name']",
        }
    }


    constructor() {}

    public getWishlistHeaderTitle(){
        return CypressHelper.getText(this.elements.text.wishlistHeader);
    }

    public getProductCardName(){
        CypressHelper.getWebElement(this.elements.text.productCardName).then(elements => {
            const nameOfProducts = []
            for (let i = 0; i < elements.length; i++) {
                nameOfProducts.push(elements[i].innerText)
            }
            CypressHelper.wrapValue(nameOfProducts, "nameOfProducts")
        })
    }

}