import { describe, expect, it } from 'vitest';
import { FixtureContext } from '../database/fixture-context.js';

describe('FixtureContext', () => {
  const context = new FixtureContext(new Date('2026-10-18T03:15:00Z'), 'admin');

  it('conserva identidades y genera claves diferentes con formato UUID v4', () => {
    expect(context.getId('person')).toBe(
      new FixtureContext(new Date(), 'other').getId('person'),
    );
    expect(context.getId('person')).not.toBe(context.getId('appointment'));
    expect(context.getId('person')).toMatch(
      /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/,
    );
  });

  it('falla explícitamente si falta una dependencia', () => {
    expect(() => context.getReference('roles', 'mentor')).toThrow(
      'No existe el catálogo',
    );
    context.setReference('roles', 'mentor', 'id');
    expect(context.getReference('roles', 'mentor')).toBe('id');
  });

  it('calcula el lunes en Bolivia sin depender de la zona del proceso', () => {
    expect(context.getDate('monday', 0, false).toISOString()).toBe(
      '2026-10-12T04:00:00.000Z',
    );
    expect(context.getDate('monday', 540, false).toISOString()).toBe(
      '2026-10-12T13:00:00.000Z',
    );
    expect(context.getDate('monday', 1440, true).toISOString()).toBe(
      '2026-10-13T00:00:00.000Z',
    );
  });

  it('conserva la referencia al restar minutos y al convertir fechas locales', () => {
    expect(context.getDate('anchor', -15, false).toISOString()).toBe(
      '2026-10-18T03:00:00.000Z',
    );
    expect(context.getDate('anchor', 0, true).toISOString()).toBe(
      '2026-10-17T00:00:00.000Z',
    );
    expect(context.anchor.toISOString()).toBe('2026-10-18T03:15:00.000Z');
  });
});
