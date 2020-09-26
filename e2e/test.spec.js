const t = 10000;
const mailer = 'm@autotest.mail';
const random = Math.floor(Math.random() * 10000000 + 1);

const widgetEl = async () => {
  const el = {};

  el.container = await $('[data-e2e=product-list-widget]');
  el.title = await el.container.$('h1');
  el.btnVolume = await el.container.$('[data-e2e=btn-volume]');
  el.btnChange = await el.container.$('[data-e2e=btn-change]');
  el.productList = await el.container.$('[data-e2e=product-list]');

  return el;
}

describe('e2e main', () => {
  it('Run application in browser', async () => {
    await browser.url('http://localhost:3001/signup');
  });

  it('Should title exist', async () => {
    const widget = await widgetEl();
    const h1 = widget.title;
    const h1Text = await h1.getText();

    expect(h1Text).toContain('Market');
  });

  it('Should correct column name', async () => {
    const widget = await widgetEl();
    const switchedColumn = await widget.productList.$('thead th:nth-child(3)');
    const volumeText = await switchedColumn.getText();

    await widget.btnChange.click();
    const changeText = await switchedColumn.getText();

    expect(volumeText).toContain('Volume');
    expect(changeText).toContain('Change');
  });

});
