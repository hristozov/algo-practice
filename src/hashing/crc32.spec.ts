import { expect } from 'chai';

import { CRC32 } from './crc32';

describe('CRC32', () => {
  let crc32: CRC32;

  beforeEach(() => (crc32 = new CRC32()));

  it('calculates the CRC32 for "hello" correctly', () => {
    expect(crc32.update('hello').finalize()).to.equal(907060870);
  });
});
