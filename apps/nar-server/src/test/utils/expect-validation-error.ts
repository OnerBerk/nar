function expectValidationError(res: any, expectedMessage: string) {
  expect(res.status).toBe(400);
  expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining(expectedMessage)]));
}
