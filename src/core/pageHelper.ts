import {getPage} from '@src/core/driver';

export const stubRequest = async (urlPattern: string, payload: object, statusCode = 200) => {
  await getPage().route(urlPattern, async (route) => {
    await route.fulfill({
      status: statusCode,
      body: JSON.stringify(payload),
      contentType: 'application/json',
    });
  });
};
