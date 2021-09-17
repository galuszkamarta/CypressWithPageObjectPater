import { CypressHelper } from "../utils/cypress.helper";
import { PageElements } from "./page.elements";

export class  MyAccountPage {
    private readonly elements: PageElements = {
        button: {
            login: "//button[@value='Accedi']"
        },
        input: {
            username: "//input[@id='username']",
            password: "//input[@id='password']"
        },
        text: {
            greetingMessage: "//nav[@class='woocommerce-MyAccount-navigation col-12 col-md-4']//h1[@class='d-none d-md-block']",
            errorMessage: "//ul[@class='woocommerce-error']"
        }
    }

    private readonly credentials = {
        correct : {
            username: 'DoloresPromocjaTestowa@gmail.com',
            password: 'DzisiajTestujemy'
        },
        incorrect : {
            username: 'DoloresPromocjaTestowa@gmail.com',
            password: 'dzisiajTestujemy' 
        }
    }

    constructor() {}

    public loginAsDolores(credentialsCorrect: boolean){
        const credentials = credentialsCorrect? this.credentials.correct : this.credentials.incorrect
        CypressHelper.getWebElement(this.elements.input.username).type(credentials.username, {force: true});
            CypressHelper.getWebElement(this.elements.input.password).type(credentials.password, {force: true});
            CypressHelper.click(this.elements.button.login)
    }

    public getGreetingMessage(){
        return CypressHelper.getText(this.elements.text.greetingMessage)
    }

    public getErrorMessage(){
    return CypressHelper.getText(this.elements.text.errorMessage)
    }
}
