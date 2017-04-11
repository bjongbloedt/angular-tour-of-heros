import { browser, element, by } from 'protractor';

export class AppPage {
    heroesLink = element(by.linkText('Heroes'));
    sidenavIcon = element(by.css('md-toolbar button.mat-icon-button'));
    heroCards = element.all(by.css('md-card'));
    heroCardTitles = element.all(by.css('md-card-title'));
    heroCardDeleteIcons = element.all(by.css('md-card button[data-qa="delete-icon"]'));
    heroCardInfoIcons = element.all(by.css('md-card button[data-qa="info-icon"]'));

}
