import { CypressHelper } from "../utils/cypress.helper";
import { SelectedProduct } from "./listing.page";
import { PageElements } from "./page.elements";

export class ProductCardPage {
    private readonly elements: PageElements = {
        text: {
            price: "//div[@class='single_variation_wrap']//bdi",
            dimension: "//div[@class='filter-option-inner-inner']//span[@class='value']",
            otherDimension: "//a[@class='dropdown-item attached enabled']//span[@class='value']",
            nameOfProduct:"//h1[@class='product_title entry-title']"
        },
        button: {
            dropdown: "//button[@class='btn dropdown-toggle btn-light']",
        }
    }


    constructor() {}

    public getInformactionOfProduct() {
        const selectedProduct = new SelectedProduct
        CypressHelper.getText(this.elements.text.price).then(text => {
            selectedProduct.price = text;
            CypressHelper.getText(this.elements.text.dimension).then(text => {
                selectedProduct.dimension = text;
                CypressHelper.getText(this.elements.text.nameOfProduct).then(text => {
                    selectedProduct.nameOfProduct = text;
                    CypressHelper.wrapValue(selectedProduct, 'ProductInProductCard')
                })
            })
        })
    }
}