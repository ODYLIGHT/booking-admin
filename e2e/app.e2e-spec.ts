import { BookingAdminPage } from './app.po';

describe('booking-admin App', () => {
  let page: BookingAdminPage;

  beforeEach(() => {
    page = new BookingAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
