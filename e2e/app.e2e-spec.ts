import { AngularJobsPage } from './app.po';

describe('angular-jobs App', () => {
  let page: AngularJobsPage;

  beforeEach(() => {
    page = new AngularJobsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
