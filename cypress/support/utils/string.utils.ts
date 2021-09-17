import moment = require('moment');


export class StringUtils {

    public static randomString(len: number, charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        let randomString = '';
        for (let i = 0; i < len; i++) {
            let randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

 
    public static getRandomValue(fieldName: string, value: string) {
        return value.includes('number') ?
            StringUtils.randomString(fieldName === 'houseNumber' ? 1 : 10, '123456789')
            : StringUtils.randomString(8);

    }


    public static generateRandomValue(fieldName: string, value: string) {
        switch (value) {
            case '<random_option>':
                return ':)'
            case '<random_string>':
                return StringUtils.randomString(8);
            default:
                console.log('WARNING!!! Not recognized value' + value);
        }
        return value.includes('number') ?
            StringUtils.randomString(fieldName === 'houseNumber' ? 1 : 10, '123456789')
            : StringUtils.randomString(8);
    }

 

    static camelCase(str) {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

 
    static toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


    static searchJSON(json, key, value) {
        return json.filter(
            function (data) {
                return data[key] == value
            }
        );
    }

}