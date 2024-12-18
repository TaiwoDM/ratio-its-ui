import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">ITS</Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link href="/ratio-problem" className="text-gray-600 hover:text-primary">Ratio Problem</Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section
          className="relative bg-gradient-to-r from-primary to-primary-foreground text-white py-20"
          style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/student-desk-top-view-teenager-home-workplace-table-with-studying-stationery-tablet-with-computer-game_107791-3451.jpg?ga=GA1.1.340841201.1717685554&semt=ais_hybrid)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        >
          
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>

          <div className="container relative mx-auto px-4 text-center z-[2]">

            <h1 className="text-4xl md:text-6xl font-bold mb-6">Intelligent Tutoring System</h1>
            <p className="text-xl mb-8">Learn smarter, faster, and more effectively with AI-powered tutoring</p>
            <Button asChild size="lg">
              <Link href="/ratio-problem">Start Learning</Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
                <p className="text-gray-600">Personalized learning paths tailored to your needs</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Comprehensive Curriculum</h3>
                <p className="text-gray-600">Wide range of subjects and topics to explore</p>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
                <p className="text-gray-600">Real-time assessment and progress tracking</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2024 Intelligent Tutoring System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}