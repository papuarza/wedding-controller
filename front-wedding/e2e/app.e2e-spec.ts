import { FronWeddingPage } from './app.po';

describe('fron-wedding App', function() {
  let page: FronWeddingPage;

  beforeEach(() => {
    page = new FronWeddingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
