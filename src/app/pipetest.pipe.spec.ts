import { PipetestPipe } from './pipetest.pipe';

describe('PipetestPipe', () => {
  it('create an instance', () => {
    const pipe = new PipetestPipe();
    expect(pipe).toBeTruthy();
  });
});
