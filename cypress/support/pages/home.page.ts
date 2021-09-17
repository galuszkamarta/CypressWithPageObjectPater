import { CypressHelper } from "../utils/cypress.helper";
import { PageElements } from "./page.elements";


export class HomePage {
    private readonly elements: PageElements = {
        button: {
            menuMobile: "//div[@class='menu-header__item mobile-menu-trigger']//img[@alt='Menu icon']",
            allCarpets: "//ul[@class='menu menu-bar']//li//a[text()='Tutti tappeti']",
            myAccount: "//ul//li//a[@title='Il mio account']",
            deleteAllCategory: "//div[contains(@class, 'show')]//span[@class='clear-select']",
            saveCategory: "//div[contains(@class, 'show')]//div[@class='primary-button button-full']",
            numberOfItemsInSave: "//div[contains(@class, 'show')]//div[@class='primary-button button-full']//span",
            search: "//button[text()='Cerca']",
            viewAllColorsSection: "//div[@class='colors-section-wrapper-text']//a[@class='secondary-button']",
            bestsellerTab: "//a[@id='bestseller-tab']",
            bestselleralItem: "//div[@id='bestseller']//div//img[@class='product-card__img product-card__img--product show']",
            addBestselleralItemToWishlist: "//div[@id='bestseller']//div//div[@data-action='add_product_to_wishlist']",
            viewAllBestsellerProduct: "//div[@id='bestseller']//div//a[@class='secondary-button']",
            promotionTab: "//a[@id='promotion-tab']",
            promotionalItem: "//div[@id='promotion']//div//img[@class='product-card__img product-card__img--product show']",
            addPromotionalItemToWishlist: "//div[@id='promotion']//div//div[@data-action='add_product_to_wishlist']",
            viewAllPromotionsProduct: "//div[@id='promotion']//div//a[@class='secondary-button']",
            menuHeaderWishlist: "//div[@class='menu-header__items']//a[@title='Favoriti']",
            wishlist: "//div[@class='top-header__menu__item top-header__menu__item--badge']//a[@title='Favoriti']",
            menuHeaderLogoTapiso: "//a[@class='menu-header__logo']//img[@alt='Logo Tapiso']"
        },
        text: {
            roomCategory: "//h1[text()='Tappeti salotto/ camera']/following-sibling::div//a",
            bestellingCategory: "//h1[text()='Categorie più vendute']/following-sibling::div//a",
            sizeCategory: "//div[@class='sizes-slider-section__shape-size']",
            numberOfItemInWishlistMobile: "//div[@class='top-header__menu__item top-header__menu__item--badge']//a//span[@class='count-badge count-badge-wishlist d-block']",
            numberOfItemInWishlist: "//a[@class='menu-header__item menu-header__item--badge']//span[@class='count-badge count-badge-wishlist d-block']",
            nameOfBestselleralItem: "//div[@id='bestseller']//div//h2[@class='product-card__name']",
            nameOfPromocionalItem: "//div[@id='promotion']//div//h2[@class='product-card__name']"
        }
    }

    private bestsellingCategoryMap = {
        Classico : "tappeti classici",
        Geometrici : "tappeti geometrici",
        Marocchini : "tappeti marocco",
        Shaggy : "tappeti shaggy",
        Animali: "Tappeti",
        "Per bambini": "tappeti bambini"
    }

    constructor() {}

    public isDestopOrMobile() {
       return cy.xpath("//div[@class='top-header__menu__item']//a[@title='Il mio account']").then($button => {
            return $button.is(':visible')
          })
    }

    public openAllCarpets() {
        CypressHelper.click(this.elements.button.menuMobile);
        CypressHelper.click(this.elements.button.allCarpets);
    }

    public openLoginPage() {
        CypressHelper.click(this.elements.button.menuMobile);
        CypressHelper.click(this.elements.button.myAccount);
    }

    public clickLogoTapiso() {
        CypressHelper.click(this.elements.button.menuHeaderLogoTapiso);
    }

    public openWitshlistPage(){
        CypressHelper.getWebElement(this.elements.button.wishlist).click({force : true});
    }


    selectItemFromCategory(category, items) {
        CypressHelper.wrapValue(category, 'selectedCategory');
        CypressHelper.click(this.getCategoryLocator(category));
        this.selecItemInCategory(items);
    }

    selecItemInCategory(items){
        items.forEach(element => {
            CypressHelper.getWrappedValue('selectedItems').then(items=> {
                if (!items.includes(element)) {
                    items.push(element)
                }
                CypressHelper.wrapValue(items, 'selectedItems')
            })
            CypressHelper.click(this.getItemLocator(element))
        });
    }

    getCategoryLocator(category) {
        return `//span[text()='${category}']`
    }

    getNumberOfItemsInCategory(category) {
        return `//span[text()='${category}']//span`
    }

    getItemLocator(item) {
        return `//span[text()='${item}']/..//div//img`
    }

    clickDeleteAllButtonCategory() {
        CypressHelper.click(this.elements.button.deleteAllCategory);
    }

    clickSafeButtonCategory(){
        this.saveNumberOfItemInSave()
        CypressHelper.click(this.elements.button.saveCategory);
        CypressHelper.getWrappedValue('selectedCategory').then(selectedCategory => {
            this.saveNumberOfItemInCategory(selectedCategory)
        })
    }

    saveNumberOfItemInSave(){
        CypressHelper.getText(this.elements.button.numberOfItemsInSave).then(text => {
            CypressHelper.wrapValue(text.replace('(', '').replace(')', ''), 'numberOfItemInSave')
        })
    }

    saveNumberOfItemInCategory(category){
        CypressHelper.getText(this.getNumberOfItemsInCategory(category)).then(text => {
            CypressHelper.wrapValue(text.replace(': ', ''), 'numberOfItemInCategory' )
        })
    }

    clickSearchButton() {
        CypressHelper.click(this.elements.button.search);
    }

    chooseRandomItemRoomCategories() {
        cy.xpath(this.elements.text.roomCategory).then(items => {
            let randomIndex = Math.floor(Math.random() * (items.length))
            const element = cy.xpath(this.elements.text.roomCategory).eq(randomIndex)
            element.children().first().children().first().invoke("attr", 'alt').then(text => {
                CypressHelper.wrapValue(text, 'selectedRoomCategory')
            })
            cy.xpath(this.elements.text.roomCategory).eq(randomIndex).click()
        });
    }

    chooseBestsellerCategories() {
        CypressHelper.click(this.elements.button.bestsellerTab)
        CypressHelper.getWebElement(this.elements.button.bestsellerTab).invoke("attr", 'aria-selected').then((text) => {
            CypressHelper.wrapValue(text, 'isBestsellerSelected')
        })
    }

    goToBestsellers() {
        CypressHelper.click(this.elements.button.viewAllBestsellerProduct);
    }

    choosePromotionsCategories(){
        CypressHelper.click(this.elements.button.promotionTab);
        CypressHelper.getWebElement(this.elements.button.promotionTab).invoke("attr", 'aria-selected').then((text) => {
            CypressHelper.wrapValue(text, 'isPromotionSelected');
        })
    }

    randomClickAddBestseleralItemToWishlist(){
        cy.xpath(this.elements.button.addBestselleralItemToWishlist).then(addToWishlist => {
            let randomAddToWishlistIndex = Math.floor(Math.random() * (addToWishlist.length));
            const element = cy.xpath(this.elements.text.nameOfBestselleralItem).eq(randomAddToWishlistIndex)
            element.then(($element) => {
                const productName = $element.text().replace('            ','').replace('        ','').replace('\n', '')
                CypressHelper.wrapValue(productName, 'nameOfItemInBestseller') 
            })
            cy.xpath(this.elements.button.addBestselleralItemToWishlist).eq(randomAddToWishlistIndex).click();
        })
    }

    randomClickAddPromotionalItemToWishlist(){
        cy.xpath(this.elements.button.addPromotionalItemToWishlist).then(addToWishlist => {
            let randomAddToWishlistIndex = Math.floor(Math.random() * (addToWishlist.length));
            const element = cy.xpath(this.elements.text.nameOfPromocionalItem).eq(randomAddToWishlistIndex)
            element.then(($element) => {
                const productName = $element.text().replace('            ','').replace('        ','').replace('\n', '')
                CypressHelper.wrapValue(productName, 'nameOfPromocionalItem')
            })
            cy.xpath(this.elements.button.addPromotionalItemToWishlist).eq(randomAddToWishlistIndex).click();
        })
    }

    getNumberOfItemInWhishlist() {
        return CypressHelper.getText(this.elements.text.numberOfItemInWishlistMobile)
    };
    
    goToPromotions(){
        CypressHelper.click(this.elements.button.viewAllPromotionsProduct);
    }

    chooseRandomItemBestellingCategories(){
        cy.xpath(this.elements.text.bestellingCategory).then(items => {
            let randomIndex = Math.floor(Math.random() * (items.length));
            //let randomIndex = 4
            const element = cy.xpath(this.elements.text.bestellingCategory).eq(randomIndex)
            element.children().first().children().first().invoke("attr", 'alt').then((text) => {
                const replacedCategoryName = this.bestsellingCategoryMap[text]
                CypressHelper.wrapValue(replacedCategoryName, 'selectedBestellingCategory')
            })
            cy.xpath(this.elements.text.bestellingCategory).eq(randomIndex).click()
        });
    }

    goToColorsSection(){
        CypressHelper.click(this.elements.button.viewAllColorsSection)
    }

    chooseRandomItemSizeCategories(){
        cy.xpath(this.elements.text.sizeCategory).then(items => {
            let randomIndex = Math.floor(Math.random() * (items.length))
            const element = cy.xpath(this.elements.text.sizeCategory).eq(randomIndex)
            element.then(($element) => {
                CypressHelper.wrapValue($element.text(), 'selectedSizeCategory') 
            }) 
            cy.xpath(this.elements.text.sizeCategory).eq(randomIndex).click()
        });
    }
}