import { CypressHelper } from "../utils/cypress.helper";
import { PageElements } from "./page.elements";

export class SelectedProduct {  
    price: string;
    dimension: string;
    nameOfProduct: string;
};

export class ListingPage {
    private readonly elements: PageElements = {
        text: {
            listingHeaderTitle: "//h1[@class='woocommerce-products-header__title page-title listing-header__title']",
            bestsellerPromozioniHeaderTitle: "//h1[@class='listing-header__title']",
            price: "//bdi",
            dimension: "//div[@class='product-card__dimensions']",
            nameOfProduct:"//div[@class='products']//h2[@class='product-card__name']"
        },
        button: {
            productCardImg: "//img[@class='product-card__img product-card__img--product show']",
            next: "//a[@class='next page-numbers']",
            previous: "//a[@class='prev page-numbers']",
            pageNumbers: "//a[@class='page-numbers']",
            chipsAnimal: "span:contains('Animale')",
            chipsShine: "span:contains('SHINE')",
        }
    }


    constructor() {}

    public getNumberOfPages() {
        return CypressHelper.getWebElement(this.elements.button.pageNumbers).its('length').then(numberOfButtons => {
            return CypressHelper.getWebElement(this.elements.button.pageNumbers).eq(numberOfButtons - 1).then(element => {
                CypressHelper.wrapValue(parseInt(element.text()), 'numberOfPages')

            });
        });
    }

    public checkPagination() {
        CypressHelper.wrapValue([] , 'zeroPricePages');
        CypressHelper.wrapValue([] , 'wrongProductsQuantityPages')
        this.checkZeroPricePresence(-1);
        CypressHelper.getWrappedValue('numberOfPages').then(numberOfPages => {
            this.getQuantityOfProductsOnPage().then(quantityOfProductsOnPage=> {
                for (let i = 0; i <= (numberOfPages - 2); i++) {
                    this.checkPage(i, quantityOfProductsOnPage);
                }
            })
                
        })
    }

    public clickProductCard(i) {
        CypressHelper.getWebElement(this.elements.button.productCardImg).eq(i).click()
    }

    public openEveryProductCard() {
        CypressHelper.getWebElement(this.elements.button.productCardImg).its('length').then(numberOfProductCard => {
            for (var i = 0; i < numberOfProductCard; i++) {
                this.clickProductCard(i);
                cy.go('back');
            }
        })
       
    }

    public getQuantityOfProductsOnPage() {
        return CypressHelper.getWebElement(this.elements.text.nameOfProduct).its('length').then(quantityOfProductsOnPage => {
            return quantityOfProductsOnPage;
        })
    }


    public chooseRandomItem() {
        cy.xpath(this.elements.button.productCardImg).then(items => {
            let randomIndex = Math.floor(Math.random() * (items.length));
            const element = cy.xpath(this.elements.button.productCardImg).eq(randomIndex);
            const selectedProduct = new SelectedProduct;
            CypressHelper.getTextByIndex(this.elements.text.price, randomIndex).then(text => {
                selectedProduct.price = text;
                CypressHelper.getTextByIndex(this.elements.text.dimension, randomIndex).then(text => {
                    selectedProduct.dimension = text.replace('\n                ', '').replace('            ', '').slice(0,11);
                    CypressHelper.getTextByIndex(this.elements.text.nameOfProduct, randomIndex).then(text => {
                        selectedProduct.nameOfProduct = text.replace('\n            ', '').replace('        ', '');
                        CypressHelper.wrapValue(selectedProduct, 'selectedProduct')
                    })
                })
            })
            cy.xpath(this.elements.button.productCardImg).eq(randomIndex).click({force: true})
        })
    }

    public getListingHeaderTitle() {
        return CypressHelper.getText(this.elements.text.listingHeaderTitle);
    }

    public getBestsellerPromozioniHeaderTitle(){
        return CypressHelper.getText(this.elements.text.bestsellerPromozioniHeaderTitle);
    }

    public getChipsLocator(nameOfchips) {
        return `span:contains('${nameOfchips}')`
    }

    public isZeroPricePresent() {
        return CypressHelper.isElementPresent(`span:contains('€0,00')`)
    }

    public isChipsPresent(nameOfchips){
        return CypressHelper.isElementPresent(`span:contains('${nameOfchips}')`)
    }

    public isChipsAnimalPresent(){
        return CypressHelper.isElementPresent(this.elements.button.chipsAnimal);
    }

    public isChipsShinePresent(){
        return CypressHelper.isElementPresent(this.elements.button.chipsShine);
    }

    public getIntervals (interval, num) {
        const size = Math.floor(interval / num);
        const res = [];
        for (let i = 0; i <= interval;
        i += size) {
           const a = i == 0 ? i : i += 1;
           const b = i + size > interval ? interval : i + size;
           if (a < interval){
              res.push([a, b]);
           };
        };
        return res;
     };

     public getPageLocator(pageNumber: number) {
         return `//a[@class='page-numbers'][text()='${pageNumber}']`
     }

     public getToPageRange(range, part, numberOfPages) {
        if (range[0] !== 0) {
            if (part===2) {
                CypressHelper.click(this.getPageLocator(4));
                CypressHelper.click(this.getPageLocator(7));
            }
            if (part ===3) {
                CypressHelper.click(this.getPageLocator(numberOfPages));
                CypressHelper.click(this.getPageLocator(18));
                CypressHelper.click(this.getPageLocator(16));
            }
        } 
     }

     public checkZeroPricePresence(i) {
        CypressHelper.getWrappedValue('zeroPricePages').then(items=> {
            if (this.isZeroPricePresent()) {
                let text = `zerowa cena na stronie ${(i+2).toString()}`
                items.push(text)
            };
            CypressHelper.wrapValue(items, 'zeroPricePages')
        })
     }

     public checkPage(i, quantityOfProductsOnPage) {
        CypressHelper.getWebElement(this.elements.button.next).then(element => {            
            CypressHelper.click(this.elements.button.next);
            this.checkQuantityOfProducts(i, quantityOfProductsOnPage);
            this.checkZeroPricePresence(i);
        });
     }

     public checkQuantityOfProducts(i, quantityOfProductsOnPage) {
        CypressHelper.getWrappedValue('wrongProductsQuantityPages').then(wrongProductsQuantityPages=> {
            this.getQuantityOfProductsOnPage().then(quantityOfProductsOnCurrentPage => {
                if (quantityOfProductsOnPage !== quantityOfProductsOnCurrentPage) {
                    let text = `nieprawidlowa liczba produktow na stronie ${(i+2).toString()}`
                    wrongProductsQuantityPages.push(text)
                };
                CypressHelper.wrapValue(wrongProductsQuantityPages, 'wrongProductsQuantityPages')
            })
          
        })
     }

}