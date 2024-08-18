import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

const rootElement = document.getElementById('root');

function init() {
  if (!rootElement) {
    throw new Error('Unable to mount react, root element is missing');
  }

  const root = createRoot(rootElement);

  root.render(<RouterProvider router={router} />);
}

init();
