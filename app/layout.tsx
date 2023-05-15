import './globals.css'

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
      <body className='bg-[#293E68] text-white'>
        <main className="w-full flex justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
