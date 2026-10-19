import { describe, expect, it } from 'vitest';
import { ProductionSeedOptionsSchema } from '../database/production-seed-options.schema.js';

describe('ProductionSeedOptionsSchema', () => {
  it('normaliza el correo proporcionado explícitamente', () => {
    expect(
      ProductionSeedOptionsSchema.parse(['--email', 'Admin@Example.org']),
    ).toEqual(['--email', 'admin@example.org']);
  });

  it.each([
    [],
    ['--email'],
    ['admin@example.org'],
    ['--email', 'invalid'],
    ['--email', 'admin@example.org', 'extra'],
  ])('rechaza argumentos inválidos: %j', (...args) => {
    expect(ProductionSeedOptionsSchema.safeParse(args).success).toBe(false);
  });
});
