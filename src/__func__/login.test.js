import mountRoute from 'src/__testHelpers__/mountRoute';
import getFormFiller from 'src/__testHelpers__/fill';

test('Login page', async () => {
  const page = await mountRoute('/auth', { authenticated: false });

  const formFiller = getFormFiller(page.wrapper);
  formFiller([
    { name: 'username', value: 'test-username' },
    { name: 'password', value: 'test-password' }
  ]);

  await page.simulate('form', 'submit');

  expect(page.currentRoute()).toEqual('/dashboard');
});
