import { browser, element, by, ExpectedConditions } from 'protractor';
import {
    DashboardPage,
    AddHeroPage,
    EditHeroPage
} from './page-objects';

describe('A User', () => {
    let page: DashboardPage;
    let addHeroPage: AddHeroPage;
    let editHeroPage: EditHeroPage;

    beforeEach(() => {
        page = new DashboardPage();
        addHeroPage = new AddHeroPage();
        editHeroPage = new EditHeroPage();
        page.navigateTo();
    });

    it('should display 4 heroes on the dashboard', () => {
        page.navigateTo();
        const cardsCount = page.heroCards.count();
        expect<any>(cardsCount).toBe(4, 'There should be 4 hero cards on the page');
    });

    it('should be able to add a new hero', () => {
        page.addHeroButton.click();

        addHeroPage.nameTextbox.sendKeys('Dr. Fart');
        addHeroPage.saveButton.click();

        page.sidenavIcon.click();
        browser.wait(ExpectedConditions.visibilityOf(page.heroesLink));
        page.heroesLink.click();

        const titles = page.getHeroCardTitles();
        expect(titles).toContain('Dr. Fart');
    });

    it('should be able to delete a hero from the dashboard', () => {
        const deletedHero = page.heroCardTitles.get(0).getText();
        page.heroCardDeleteIcons.get(0).click();
        const titles = page.getHeroCardTitles();
        expect(titles).not.toContain(deletedHero);
    });

    it('should be able to delete a hero from the heroes list', () => {
        page.sidenavIcon.click();
        browser.wait(ExpectedConditions.visibilityOf(page.heroesLink));
        page.heroesLink.click();

        const deletedHero = page.heroCardTitles.get(0).getText();
        page.heroCardDeleteIcons.get(0).click();
        const titles = page.getHeroCardTitles();
        expect(titles).not.toContain(deletedHero);
    });

    it('should be able to view details of a hero from the dashboard', () => {
        const hero = page.heroCardTitles.get(0).getText();
        page.heroCardInfoIcons.get(0).click();
        const name = editHeroPage.nameTextbox.getAttribute('ng-reflect-model');
        expect(name).toContain(hero, 'input should have name of hero pre-populated');

        const header = editHeroPage.nameHeader.getText();
        expect(header).toContain(hero, 'header should have the name of the hero');
    });

    it('should be able to view details of a hero from the heroes list', () => {
        page.sidenavIcon.click();
        browser.wait(ExpectedConditions.visibilityOf(page.heroesLink));
        page.heroesLink.click();

        const hero = page.heroCardTitles.get(0).getText();
        page.heroCardInfoIcons.get(0).click();
        const name = editHeroPage.nameTextbox.getAttribute('ng-reflect-model');
        expect(name).toContain(hero, 'input should have name of hero pre-populated');

        const header = editHeroPage.nameHeader.getText();
        expect(header).toContain(hero, 'header should have the name of the hero');
    });

    it('should be able to edit details of a hero from the heroes list', () => {
        page.sidenavIcon.click();
        browser.wait(ExpectedConditions.visibilityOf(page.heroesLink));
        page.heroesLink.click();

        const hero = page.heroCardTitles.get(0).getText();
        page.heroCardInfoIcons.get(0).click();

        editHeroPage.nameTextbox.clear();
        editHeroPage.nameTextbox.sendKeys('Mr. Bluesky');
        editHeroPage.saveButton.click();

        browser.wait(ExpectedConditions.visibilityOf(element(by.css('md-card-title'))));
        const titles = page.getHeroCardTitles();
        expect(titles).not.toContain(hero);
        expect(titles).toContain('Mr. Bluesky');
    });

    it('should be able to edit details of a hero from the dashboard', () => {
        const hero = page.heroCardTitles.get(0).getText();
        page.heroCardInfoIcons.get(0).click();

        editHeroPage.nameTextbox.clear();
        editHeroPage.nameTextbox.sendKeys('Ivan the Wonderful');
        editHeroPage.saveButton.click();

        browser.wait(ExpectedConditions.visibilityOf(element(by.css('md-card-title'))));

        page.sidenavIcon.click();
        browser.wait(ExpectedConditions.visibilityOf(page.heroesLink));
        page.heroesLink.click();
        browser.wait(ExpectedConditions.urlContains('/heroes'));

        const titles = page.getHeroCardTitles();
        expect(titles).not.toContain(hero);
        expect(titles).toContain('Ivan the Wonderful');
    });
});
