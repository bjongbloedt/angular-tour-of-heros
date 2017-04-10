import { browser, element, by, ExpectedConditions } from 'protractor';
import { AngularCliProjectPage } from './app.po';

describe('A User', () => {
    let page: AngularCliProjectPage;
    const heroesLink = element(by.linkText('Heroes'));

    beforeEach(() => {
        page = new AngularCliProjectPage();
        page.navigateTo();
    });

    it('should be able to add a new hero', () => {
        element(by.css('div.add-hero')).click();

        element(by.css('input[placeholder="Name"]')).sendKeys('Dr. Fart');
        element(by.buttonText('Save')).click();

        element(by.css('md-toolbar button.mat-icon-button')).click();
        browser.wait(ExpectedConditions.visibilityOf(heroesLink));
        heroesLink.click();

        const titles = element.all(by.css('md-card-title')).map(elem => {
            return elem.getText();
        });
        expect(titles).toContain('Dr. Fart');
    });

    it('should be able to delete a hero from the dashboard', () => {
        const deletedHero = element.all(by.css('md-card-title')).get(0).getText();
        element.all(by.css('md-card button[data-qa="delete-icon"]')).get(0).click();
        const titles = element.all(by.css('md-card-title')).map(elem => {
            return elem.getText();
        });
        expect(titles).not.toContain(deletedHero);
    });

    it('should be able to delete a hero from the heroes list', () => {
        element(by.css('md-toolbar button.mat-icon-button')).click();
        browser.wait(ExpectedConditions.visibilityOf(heroesLink));
        heroesLink.click();

        const deletedHero = element.all(by.css('md-card-title')).get(0).getText();
        element.all(by.css('md-card button[data-qa="delete-icon"]')).get(0).click();
        const titles = element.all(by.css('md-card-title')).map(elem => {
            return elem.getText();
        });
        expect(titles).not.toContain(deletedHero);
    });

    it('should be able to view details of a hero from the dashboard', () => {
        const hero = element.all(by.css('md-card-title')).get(0).getText();
        element.all(by.css('md-card button[data-qa="info-icon"]')).get(0).click();
        const name = element(by.css('input[placeholder="Hero Name"]')).getAttribute('ng-reflect-model');
        expect(name).toContain(hero, 'input should have name of hero pre-populated');

        const header = element(by.css('h2')).getText();
        expect(header).toContain(hero, 'header should have the name of the hero');
    });

    it('should be able to view details of a hero from the heroes list', () => {
        element(by.css('md-toolbar button.mat-icon-button')).click();
        browser.wait(ExpectedConditions.visibilityOf(heroesLink));
        heroesLink.click();

        const hero = element.all(by.css('md-card-title')).get(0).getText();
        element.all(by.css('md-card button[data-qa="info-icon"]')).get(0).click();
        const name = element(by.css('input[placeholder="Hero Name"]')).getAttribute('ng-reflect-model');
        expect(name).toContain(hero, 'input should have name of hero pre-populated');

        const header = element(by.css('h2')).getText();
        expect(header).toContain(hero, 'header should have the name of the hero');
    });

    it('should be able to edit details of a hero from the heroes list', () => {
        element(by.css('md-toolbar button.mat-icon-button')).click();
        browser.wait(ExpectedConditions.visibilityOf(heroesLink));
        heroesLink.click();

        const hero = element.all(by.css('md-card-title')).get(0).getText();
        element.all(by.css('md-card button[data-qa="info-icon"]')).get(0).click();

        element(by.css('input[placeholder="Hero Name"]')).clear();
        element(by.css('input[placeholder="Hero Name"]')).sendKeys('Mr. Bluesky');
        element(by.buttonText('Save')).click();

        browser.wait(ExpectedConditions.visibilityOf(element(by.css('md-card-title'))));
        const titles = element.all(by.css('md-card-title')).map(elem => {
            return elem.getText();
        });
        expect(titles).not.toContain(hero);
        expect(titles).toContain('Mr. Bluesky');
    });

    it('should be able to edit details of a hero from the dashboard', () => {
        const hero = element.all(by.css('md-card-title')).get(0).getText();
        element.all(by.css('md-card button[data-qa="info-icon"]')).get(0).click();

        element(by.css('input[placeholder="Hero Name"]')).clear();
        element(by.css('input[placeholder="Hero Name"]')).sendKeys('Ivan the wonderful');
        element(by.buttonText('Save')).click();

        browser.wait(ExpectedConditions.visibilityOf(element(by.css('md-card-title'))));

        element(by.css('md-toolbar button.mat-icon-button')).click();
        browser.wait(ExpectedConditions.visibilityOf(heroesLink));
        heroesLink.click();
        browser.wait(ExpectedConditions.urlContains('/heroes'));

        const titles = element.all(by.css('md-card-title')).map(elem => {
            return elem.getText();
        });
        expect(titles).not.toContain(hero);
        expect(titles).toContain('Ivan the wonderful');
    });
});
