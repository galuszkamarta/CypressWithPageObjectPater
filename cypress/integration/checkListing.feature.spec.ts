/// <reference types="cypress" />

import { HomePage } from "../support/pages/home.page"
import { ListingPage } from "../support/pages/listing.page"
import { ProductCardPage } from "../support/pages/productCard.page"
import { WishlistPage } from "../support/pages/wishlist.page"
import { CypressHelper } from "../support/utils/cypress.helper"


const homePage = new HomePage();
const listingPage = new ListingPage();
const productCardPage = new ProductCardPage();
const wishlistPage = new WishlistPage();


context('Actions', () => {

    it('listing is correct for general category', () => {
      beforeEach(() => {
        cy.visit('https://www',{})
      })
      listingPage.getNumberOfPages();
        homePage.isDestopOrMobile().then(isDestkop => {
            if(!isDestkop) {
            CypressHelper.wrapValue(listingPage.isZeroPricePresent(), 'isZeroPricePresentOnHomePage');
              listingPage.checkPagination();
              CypressHelper.getWrappedValue('zeroPricePages').then(zeroPricePages => {
                Cypress.log({
                  name: 'Zero price pages ',
                  message: zeroPricePages
                })
                CypressHelper.getWrappedValue('wrongProductsQuantityPages').then(wrongProductsQuantityPages => {
                  Cypress.log({
                    name: 'wrong quantity of items per page ',
                    message: wrongProductsQuantityPages
                  })
                  expect(wrongProductsQuantityPages).to.deep.eq([])
                  CypressHelper.getWrappedValue('isZeroPricePresentOnHomePage').then(isZeroPricePresentOnHomePage => {
                    expect(isZeroPricePresentOnHomePage).to.deep.eq(false);
                  })

                })
              
              })
            }
        })
    })

  it('listing is correct for x category', () => {

    beforeEach(() => {
      cy.visit('https://www',{})
    })

    listingPage.getNumberOfPages();
    homePage.isDestopOrMobile().then(isDestkop => {
        if(!isDestkop) {
        CypressHelper.wrapValue(listingPage.isZeroPricePresent(), 'isZeroPricePresentOnHomePage');
          listingPage.checkPagination();
          CypressHelper.getWrappedValue('zeroPricePages').then(zeroPricePages => {
            Cypress.log({
              name: 'Zero price pages ',
              message: zeroPricePages
            })
            CypressHelper.getWrappedValue('wrongProductsQuantityPages').then(wrongProductsQuantityPages => {
              Cypress.log({
                name: 'wrong quantity of items per page ',
                message: wrongProductsQuantityPages
              })
              expect(wrongProductsQuantityPages).to.deep.eq([])
              CypressHelper.getWrappedValue('isZeroPricePresentOnHomePage').then(isZeroPricePresentOnHomePage => {
                expect(isZeroPricePresentOnHomePage).to.deep.eq(false);
              })
            })
          })
        }
    })
})

})