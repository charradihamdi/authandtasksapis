import { Test, TestingModule } from '@nestjs/testing';
import { Tesks } from './tesks';

describe('Tesks', () => {
  let provider: Tesks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Tesks],
    }).compile();

    provider = module.get<Tesks>(Tesks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
