import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from './routes';

vi.mock('./storage', () => ({
  storage: {
    getUser: vi.fn(),
    getUserInvoices: vi.fn(),
  },
}));

vi.mock('./replitAuth', () => ({
  setupAuth: vi.fn(),
  isAuthenticated: (req: any, res: any, next: any) => {
    req.user = { claims: { sub: 'test-user-id' } };
    next();
  },
}));

describe('/api/download-receipt', () => {
  it('should return a receipt with only paid invoices', async () => {
    const { storage } = await import('./storage');
    const app = express();
    await registerRoutes(app);

    (storage.getUser as vi.Mock).mockResolvedValue({ email: 'test@example.com' });
    (storage.getUserInvoices as vi.Mock).mockResolvedValue([
      { id: '1', amount: '10.00', status: 'paid', description: 'Paid Invoice' },
      { id: '2', amount: '20.00', status: 'pending', description: 'Pending Invoice' },
      { id: '3', amount: '30.00', status: 'failed', description: 'Failed Invoice' },
    ]);

    const response = await request(app).get('/api/download-receipt');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/plain/);
    expect(response.text).toContain('PAID TRANSACTIONS');
    expect(response.text).toContain('Paid Invoice - $10.00 (paid)');
    expect(response.text).not.toContain('Pending Invoice');
    expect(response.text).not.toContain('Failed Invoice');
    expect(response.text).toContain('Total Paid: $10.00');
  });
});
