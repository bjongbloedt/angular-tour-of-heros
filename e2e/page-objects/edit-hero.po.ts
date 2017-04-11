import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

export class EditHeroPage extends AppPage {
    nameHeader = element(by.css('h2'));
    nameTextbox = element(by.css('input[placeholder="Hero Name"]'));
    saveButton = element(by.buttonText('Save'));

    navigateTo(heroId: string) {
        return browser.get(`/heroes/${heroId}`);
    }
}
