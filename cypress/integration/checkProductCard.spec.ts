/// <reference types="cypress" />

import { toNumber } from "cypress/types/lodash";
import { HomePage } from "../support/pages/home.page"
import { ListingPage } from "../support/pages/listing.page";
import { ProductCardPage } from "../support/pages/productCard.page"
import { CypressHelper } from "../support/utils/cypress.helper"

const homePage = new HomePage();
const listingPage = new ListingPage();
const productCardPage = new ProductCardPage();

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www',{})
  })
  
    it('', () => {
      homePage.openAllCarpets();
      listingPage.chooseRandomItem();
      productCardPage.getInformactionOfProduct();
      CypressHelper.getWrappedValue('selectedProduct').then(selectedProduct => {
          CypressHelper.getWrappedValue('ProductInProductCard').then(ProductInProductCard => {
              expect(selectedProduct).to.deep.eq(ProductInProductCard);
          })
      })
        homePage.isDestopOrMobile().then(isDestkop => {
          
            if(!isDestkop) {
              homePage.openAllCarpets();
              listingPage.chooseRandomItem();
              productCardPage.getInformactionOfProduct();
              CypressHelper.getWrappedValue('selectedProduct').then(selectedProduct => {
                  CypressHelper.getWrappedValue('ProductInProductCard').then(ProductInProductCard => {
                      expect(selectedProduct).to.deep.eq(ProductInProductCard);
                  })
              })
            }
        })
    })
   
  })
  