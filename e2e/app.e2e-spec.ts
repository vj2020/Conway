import { ConwayAngularPage } from './app.po';

describe('conway-angular App', () => {
  let page: ConwayAngularPage;

  beforeEach(() => {
    page = new ConwayAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
