import { describe, expect, it, vi } from 'vitest';
import { getEnvironment, isDevelopment, isPreview, isProduction } from './getEnvironment';

describe('getEnvironment', () => {
   it('getEnvironment', () => {
      vi.stubEnv('VERCEL_ENV', 'development');
      expect(getEnvironment()).toBe('development');

      vi.stubEnv('VERCEL_ENV', 'preview');
      expect(getEnvironment()).toBe('preview');

      vi.stubEnv('VERCEL_ENV', 'production');
      expect(getEnvironment()).toBe('production');
   });

   it('isProduction', () => {
      vi.stubEnv('VERCEL_ENV', 'development');
      expect(isProduction()).toBe(false);
      vi.stubEnv('VERCEL_ENV', 'production');
      expect(isProduction()).toBe(true);
   });

   it('isPreview', () => {
      vi.stubEnv('VERCEL_ENV', 'development');
      expect(isPreview()).toBe(false);
      vi.stubEnv('VERCEL_ENV', 'preview');
      expect(isPreview()).toBe(true);
   });

   it('isDevelopment', () => {
      vi.stubEnv('VERCEL_ENV', 'development');
      expect(isDevelopment()).toBe(true);
      vi.stubEnv('VERCEL_ENV', 'preview');
      expect(isDevelopment()).toBe(false);
   });
});
