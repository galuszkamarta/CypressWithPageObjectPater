/// <reference types="cypress" />

import { HomePage } from "../support/pages/home.page"
import { MyAccountPage } from "../support/pages/myAccount.page"
import { CypressHelper } from "../support/utils/cypress.helper"
const homePage = new HomePage();
const myAccountPage = new MyAccountPage()

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www',{})
  })
  
    it('user can login succesfully with correct credentials', () => {

        homePage.isDestopOrMobile().then(isDestkop => {
            if(!isDestkop) {
              homePage.openLoginPage();
              myAccountPage.loginAsDolores(true);
              myAccountPage.getGreetingMessage().then(text => {
                expect(text).to.equal('Hallo, Test')
              })
            }
        })
    })

    it('user can not login succesfully with uncorrect credentials', () => {

      homePage.isDestopOrMobile().then(isDestkop => {
          if(!isDestkop) {
            homePage.openLoginPage();
            myAccountPage.loginAsDolores(false);
            myAccountPage.getErrorMessage().then(text => {
              expect(text).to.contains("the password entered for the test@email.com email address is incorrect. Forgot password?")
            })
          }
      })
  })
  
   
  })
  