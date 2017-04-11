import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

export class AddHeroPage extends AppPage {
    nameTextbox = element(by.css('input[placeholder="Name"]'));
    saveButton = element(by.buttonText('Save'));

    navigateTo() {
        return browser.get('/heroes/add');
    }
}
