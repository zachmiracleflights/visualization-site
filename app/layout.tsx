import './globals.css'

import Footer from './components/Footer'

export const metadata = {
  title: 'Miracle Flights Visualization App',
  description: 'Visualizes all relevant Miracle Flights data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-r from-slate-700 to-gray-800'>
        <main className="w-full flex justify-center">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
