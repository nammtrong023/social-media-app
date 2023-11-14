import './globals.css';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import AuthProvider from '@/components/providers/auth-provider';
import TanStackProvider from '@/components/providers/tanstack-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { SocketProvider } from '@/components/providers/socket-provider';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
    title: 'Meetmax',
    description: 'Social media app',
    icons: {
        icon: [
            {
                url: '/favicon.ico',
                href: '/favicon.ico',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={roboto.className}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <TanStackProvider>
                        <AuthProvider>
                            <SocketProvider>
                                <ModalProvider />
                                <Toaster
                                    richColors
                                    closeButton
                                    position='top-center'
                                />
                                {children}
                            </SocketProvider>
                        </AuthProvider>
                    </TanStackProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
