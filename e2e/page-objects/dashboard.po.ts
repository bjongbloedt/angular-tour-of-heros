import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

export class DashboardPage extends AppPage {
    addHeroButton = element(by.css('div.add-hero'));

    navigateTo() {
        return browser.get('/dashboard');
    }

    getHeroCardTitles() {
        return this.heroCardTitles.map(elem => {
            return elem.getText();
        });
    }
}
