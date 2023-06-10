import './styles/globals.css'

export const metadata = {
  title: 'CleanSense',
  description: 'The data-driven toilet guidance and management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
