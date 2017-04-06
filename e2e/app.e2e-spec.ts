import { AngularCliProjectPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('angular-cli-project App', () => {
  let page: AngularCliProjectPage;

  beforeEach(() => {
    page = new AngularCliProjectPage();
  });

  it('should display 4 heroes', () => {
    page.navigateTo();
    const cardsCount = element.all(by.css('md-card')).count();
    expect<any>(cardsCount).toBe(4, 'There should be 4 hero cards on the page');
  });

});
