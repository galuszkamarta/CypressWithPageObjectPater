/// <reference types="cypress" />

import { HomePage } from "../../support/pages/home.page"
import { ListingPage } from "../../support/pages/listing.page"
import { WishlistPage } from "../../support/pages/wishlist.page"
import { CypressHelper } from "../../support/utils/cypress.helper"


const homePage = new HomePage();
const listingPage = new ListingPage();
const wishlistPage = new WishlistPage();

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://www',{})
    })

    it('scan first of three parts of products', () => {

        homePage.isDestopOrMobile().then(isDestkop => {
            CypressHelper.wrapValue('', 'priceZero');
            if(!isDestkop) {
              homePage.openAllCarpets();
              listingPage.getNumberOfPages();
              listingPage.checkPagination(1);
              CypressHelper.getWrappedValue('priceZero').then(priceZero => {
                  console.log(priceZero)
              })
            }
        })
    })

})