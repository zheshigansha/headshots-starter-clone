import Link from "next/link"

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🤖 Headshots AI
        </h1>
        <p className="text-gray-600 mb-6">
          Professional AI-generated headshots in minutes
        </p>
        <div className="space-y-3">
          <Link 
            href="/login" 
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link 
            href="/get-credits" 
            className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Buy Credits (Test Creem)
          </Link>
        </div>
      </div>
    </div>
  )
}
