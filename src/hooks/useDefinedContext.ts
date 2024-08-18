import { type Context, useContext } from 'react';

import { isDefined } from '../utils/isDefined';

export function useDefinedContext<T>(context: Context<T>): NonNullable<T> {
  const _context = useContext(context);

  if (!isDefined(_context)) {
    throw new Error(
      `${context.displayName} returned ${_context}. useDefinedContext might be used outside of its provider`,
    );
  }

  return _context;
}
