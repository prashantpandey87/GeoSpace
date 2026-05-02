import '../styles/global/index.css'
import AppLayout from '../Components/Layout/AppLayout'
import Providers from './providers'

export const metadata = {
  title: 'GeoScope',
  description: 'Explore country details around the world.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  )
}
