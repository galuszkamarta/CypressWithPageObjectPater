/// <reference types="cypress" />

import { HomePage } from "../support/pages/home.page"
import { ListingPage } from "../support/pages/listing.page"
import { WishlistPage } from "../support/pages/wishlist.page"
import { CypressHelper } from "../support/utils/cypress.helper"


const homePage = new HomePage();
const listingPage = new ListingPage();
const wishlistPage = new WishlistPage();

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www',{})
  })

    it('user can add promotional item to wishlist', () => {
      homePage.chooseBestsellerCategories();
      CypressHelper.getWrappedValue('isBestsellerSelected').then(isBestsellerSelected => {
        expect(isBestsellerSelected).to.eq('true')
      });
      homePage.randomClickAddBestseleralItemToWishlist();
      homePage.getNumberOfItemInWhishlist().then(numberOfItems => {
        expect(numberOfItems).to.eq('1')
      });
      homePage.openWitshlistPage();
      homePage.clickLogoTapiso();

      homePage.choosePromotionsCategories();
      CypressHelper.getWrappedValue('isPromotionSelected').then(isPromotionSelected => {
        expect(isPromotionSelected).to.eq('true')
      });
      homePage.randomClickAddPromotionalItemToWishlist();
      homePage.openWitshlistPage();
      homePage.getNumberOfItemInWhishlist().then(numberOfItems => {
        expect(numberOfItems).to.eq('2')


      wishlistPage.getWishlistHeaderTitle().then(wishlistHeaderTitle => {
        expect(wishlistHeaderTitle).to.include('Favoriti');
      })
      wishlistPage.getProductCardName()

        CypressHelper.getWrappedValue('nameOfItemInBestseller').then(nameOfItemInBestseller => {
          CypressHelper.getWrappedValue('nameOfPromocionalItem').then(nameOfPromocionalItem => {
            CypressHelper.getWrappedValue('nameOfProducts').then(nameOfProducts => {
              const selectedNameOfProducts = [nameOfPromocionalItem, nameOfItemInBestseller]
              expect(selectedNameOfProducts).to.deep.eq(nameOfProducts)
            })
          })
        })
      });
    })

    it('user can add product from Search Carpet()', () => {
      CypressHelper.wrapValue([], 'selectedItems')
      homePage.selectItemFromCategory('Camere', ['Soggiorno']);
      homePage.clickDeleteAllButtonCategory()
      homePage.selecItemInCategory(['Soggiorno'])
      homePage.clickSafeButtonCategory()
      CypressHelper.getWrappedValue('numberOfItemInCategory').then(numberOfItemInCategory => {
        CypressHelper.getWrappedValue('numberOfItemInSave').then(numberOfItems => {
          expect(numberOfItems).to.be.eql(numberOfItemInCategory)
        })
      })

      homePage.selectItemFromCategory('Colori', ['Grigio', 'Bianco'])
      homePage.clickDeleteAllButtonCategory()
      homePage.selecItemInCategory(['Grigio', 'Bianco'])
      homePage.saveNumberOfItemInSave()
      homePage.clickSafeButtonCategory()
      CypressHelper.getWrappedValue('numberOfItemInCategory').then(numberOfItemInCategory => {
        CypressHelper.getWrappedValue('numberOfItemInSave').then(numberOfItems => {
          expect(numberOfItems).to.be.eql(numberOfItemInCategory)
        })
      })

      homePage.selectItemFromCategory('Dimensioni', ['131 - 230 cm'])
      homePage.clickDeleteAllButtonCategory()
      homePage.selecItemInCategory(['131 - 230 cm'])
      homePage.clickSafeButtonCategory()
      CypressHelper.getWrappedValue('numberOfItemInCategory').then(numberOfItemInCategory => {
        CypressHelper.getWrappedValue('numberOfItemInSave').then(numberOfItems => {
          expect(numberOfItems).to.be.eql(numberOfItemInCategory)
        })
      })

      homePage.selectItemFromCategory('Stili', ['Ornamentale'])
      homePage.clickDeleteAllButtonCategory()
      homePage.selecItemInCategory(['Ornamentale'])
      homePage.clickSafeButtonCategory()
      CypressHelper.getWrappedValue('numberOfItemInCategory').then(numberOfItemInCategory => {
        CypressHelper.getWrappedValue('numberOfItemInSave').then(numberOfItems => {
          expect(numberOfItems).to.be.eql(numberOfItemInCategory)
        })
      })

      homePage.clickSearchButton();

      listingPage.getListingHeaderTitle().then(listingTitle => {
        expect(listingTitle).to.be.eql("Tappeti")
        if (listingTitle.toString() === "Tappeti") {
          CypressHelper.getWrappedValue('selectedItems').then(selectedItems => {
            selectedItems.forEach(chips => {
              expect(listingPage.isChipsPresent(chips)).to.be.true
            });
          })
         }
    })
  })


  it('user can add product from Selected Room Category', () => {
    homePage.chooseRandomItemRoomCategories();
    listingPage.getListingHeaderTitle().then(listingTitle => {
      CypressHelper.getWrappedValue("selectedRoomCategory").then(savedRooms => {
        expect(listingTitle).to.include(savedRooms.toString().toLowerCase())
      })
    })        
})


    it('user can add product from selected Product- Bestseller category', () => {
      homePage.chooseBestsellerCategories();
      CypressHelper.getWrappedValue("isBestsellerSelected").then(isBestsellerSelected => {
        expect(isBestsellerSelected).to.eq('true')
      });
      homePage.goToBestsellers();
      listingPage.getBestsellerPromozioniHeaderTitle().then(listingBestsellersTitle => {
        expect(listingBestsellersTitle).to.be.eql("Bestsellers");
    })
  })


  it('ser can add product from selected Product- Bestseller category', () => {
    homePage.choosePromotionsCategories();
    CypressHelper.getWrappedValue("isPromotionSelected").then(isPromotionSelected => {
      expect(isPromotionSelected).to.eq('true')
    });
    homePage.goToPromotions();
    listingPage.getBestsellerPromozioniHeaderTitle().then(listingPromotionTitle => {
      expect(listingPromotionTitle).to.be.eql("Promozioni");
    })
  })


    it('user can add product from selected bestelling category', () => {
      homePage.chooseRandomItemBestellingCategories();
      listingPage.getListingHeaderTitle().then(listingTitle => {
        CypressHelper.getWrappedValue("selectedBestellingCategory").then(savedBestelling => {       
          expect(listingTitle).to.be.eq(savedBestelling)
          if (savedBestelling.toString() === "Tappeti") {
            expect(listingPage.isChipsAnimalPresent()).to.be.true
          }
        })
      })        
  })


  it('user can add product from selected colors section', () => {
    homePage.goToColorsSection();
    listingPage.getListingHeaderTitle().then(listingTitle => {
      expect(listingTitle).to.be.eql("Tappeti")
      if (listingTitle.toString() === "Tappeti") {
       expect(listingPage.isChipsShinePresent()).to.be.true
      }
    })
  })


  it('user can add product from selected sizes category', () => {
    homePage.chooseRandomItemSizeCategories();
    listingPage.getListingHeaderTitle().then(listingTitle => {
      CypressHelper.getWrappedValue("selectedSizeCategory").then(savedSizes => {
        expect(listingTitle).to.include(savedSizes)
      })
    })        
})

})