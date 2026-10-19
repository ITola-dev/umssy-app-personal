import { beforeEach, describe, expect, it, vi } from 'vitest';
import bcrypt from 'bcrypt';
import type { Prisma } from '../../../prisma/client.js';
import { seedProductionAdmin } from '../seeds/production-admin.seed.js';

describe('seedProductionAdmin', () => {
  const tx = {
    user: { findUnique: vi.fn(), create: vi.fn() },
    userRole: { findFirst: vi.fn(), create: vi.fn() },
    role: { findUniqueOrThrow: vi.fn() },
  };
  const seedAdmin = () =>
    seedProductionAdmin(
      tx as unknown as Prisma.TransactionClient,
      'admin@example.org',
    );

  beforeEach(() => {
    vi.resetAllMocks();
    tx.user.findUnique.mockResolvedValue(null);
    tx.userRole.findFirst.mockResolvedValue(null);
    tx.role.findUniqueOrThrow.mockResolvedValue({ id: 'admin-role' });
    tx.user.create.mockResolvedValue({ id: 'admin-user' });
  });

  it('genera una contraseña distinta por cuenta y guarda únicamente su hash', async () => {
    const first = await seedAdmin();
    const second = await seedAdmin();
    expect(first.isCreated).toBe(true);
    expect(first.password).toHaveLength(32);
    expect(first.password).not.toBe(second.password);
    const stored = tx.user.create.mock.calls[0]![0].data;
    expect(stored.password).not.toBe(first.password);
    expect(await bcrypt.compare(first.password!, stored.password)).toBe(true);
    expect(tx.userRole.create).toHaveBeenCalledWith({
      data: { userId: 'admin-user', roleId: 'admin-role' },
    });
  });

  it('conserva la contraseña del administrador existente', async () => {
    tx.user.findUnique.mockResolvedValue({ id: 'existing', isActive: true });
    tx.userRole.findFirst.mockResolvedValue({ id: 'assignment' });
    expect(await seedAdmin()).toEqual({
      email: 'admin@example.org',
      password: null,
      isCreated: false,
    });
    expect(tx.user.create).not.toHaveBeenCalled();
    expect(tx.userRole.create).not.toHaveBeenCalled();
  });

  it('no eleva los permisos de una cuenta existente', async () => {
    tx.user.findUnique.mockResolvedValue({ id: 'graduate', isActive: true });
    await expect(seedAdmin()).rejects.toThrow('sin rol administrativo');
    expect(tx.userRole.create).not.toHaveBeenCalled();
  });

  it('no reactiva cuentas desactivadas', async () => {
    tx.user.findUnique.mockResolvedValue({ id: 'inactive', isActive: false });
    await expect(seedAdmin()).rejects.toThrow('desactivada');
    expect(tx.user.create).not.toHaveBeenCalled();
  });

  it('rechaza crear otro administrador', async () => {
    tx.userRole.findFirst.mockResolvedValue({ id: 'other-admin' });
    await expect(seedAdmin()).rejects.toThrow('Ya existe un administrador');
    expect(tx.user.create).not.toHaveBeenCalled();
  });
});
