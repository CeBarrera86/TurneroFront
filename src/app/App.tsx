import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { router } from '@/app/router';
import '@/app/setup/dayjs';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<div>Cargando...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
