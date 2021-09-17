import 'cypress-xpath'
import {StringUtils} from "./string.utils";

export class CypressHelper { 

    public static click(locator: string, timeout?: { timeout: number }) {
        CypressHelper.getWebElement(locator, timeout).click(timeout);
    }

    public static check(checkboxLocator: string, timeout?: { timeout: number }) {
        CypressHelper.getWebElement(checkboxLocator).check(timeout);
    }

    public static getWebElement(locator: string, timeout?: { timeout: number }) {
        return locator.startsWith('//') ? cy.xpath(locator, timeout) : cy.get(locator, timeout);
    }

    public static clear(locator: string) {
        CypressHelper.getWebElement(locator).clear();
    }

    public static shouldHaveNumberResults(locator: string, resultsCount: number) {
        CypressHelper.getWebElement(locator).its('length') .should('eq', 1);
    }

    public static shouldExist(locator: string) {
        CypressHelper.getWebElement(locator, {timeout:10000}).should('exist');
    }

    public static isElementPresent(locator: string) {
        return Cypress.$(locator).length > 0
    }

    public static containsText(locator: string, text: string, timeout?: { timeout: number }) {
        CypressHelper.getWebElement(locator, timeout).contains(text);
    }

    public static fill(locator: string, data: string) {
        CypressHelper.getWebElement(locator).clear();
        CypressHelper.getWebElement(locator).type(data);
    } 

    public static waitForAddressChangeTo(path: string) {
        return cy.url({timeout: 100000}).should('include', path);
    }

    public static clearStorage() {
        cy.clearLocalStorage()
    }

    public static waitForElementPresent(locator: string): boolean {
        return (cy.get(locator, {timeout: 1000000}).should('exist')) ? true : false;
    }

    public static dropDownSelect(locator: string, value: string) {
        CypressHelper.getWebElement(locator, {timeout: 30000}).click().get('mat-option').contains(value).click();
    }

    public static isTextCorrect(locator: string, requiredText: string) {
        return CypressHelper.getWebElement(locator).then(($element) => {
            return $element.text() === requiredText;
        })
    }

    public static getText(locator: string, timeout?: { timeout: number }) {
        return CypressHelper.getWebElement(locator, timeout).then(($element) => {
            return $element.text()
        })

    }

 
    public static getTextByIndex(locator: string, index: number) {
        return CypressHelper.getWebElement(locator).eq(index).then(($element) => {
            return $element.text()
        })

    }

    public static getAttribute(locator: string, attribute: string) {
        return CypressHelper.getWebElement(locator).invoke("attr", attribute).then((text) => {
            return text
        })
    }

    getTableValue(tableLocator: string, rowIndex: string, cellIndex: string) {
        const cellSelector = `tr:nth-child(${rowIndex}) td:nth-child(${cellIndex})`;
        return CypressHelper.getWebElement(tableLocator).get(cellSelector).then($element => {
            return $element.text()
        })

    }

   public static logOut() {
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear()
        });
        cy.clearCookies();

    }
    static hasMoreElementsThanZero(elementName: string) {
        cy.get(elementName).then((elements) => {
            expect(elements.length).to.be.gt(0, 'Number of elements:[' + elementName + '] should be > than 0');
        })
    }

 

    static wrapValue(obj: any, name: string) {
        cy.wrap(obj).as(name);
    }

    static getWrappedValue(name: string) {
        return cy.get('@' + name);
    }

 
    static getEnvironmentVariable(variableName: string) {
        return Cypress.env(variableName);
    }

    static hasExactlyNumberOfElementsOnPage(elementName: string, quantity: number) {
        this.getWebElement(elementName).then((elements) => {
            expect(elements.length).to.be.eq(quantity, 'Number of elements:[' + elementName + '] should be equal to ' + quantity);

        })

    }

    static getNumberOfElements(locator) {
        return Cypress.$(locator).length;
    }
}