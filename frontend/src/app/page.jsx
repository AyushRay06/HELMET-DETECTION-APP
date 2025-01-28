import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      {/* Hero Section */}
      <header className="bg-purple-900 text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Helmet Detection Made Easy
              </h1>
              <p className="mt-4 text-xl text-purple-200">
                Enhance workplace safety with our cutting-edge AI-powered helmet
                detection app.
              </p>
              <Link href="/dashboard">
                <Button
                  className="mt-8 bg-purple-500 hover:bg-purple-600 text-white"
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <svg
                className="h-64 w-64 text-purple-300 mx-auto"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"></path>
                <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path>
                <path d="M4 15v-3a6 6 0 0 1 6-6h0"></path>
                <path d="M14 6h0a6 6 0 0 1 6 6v3"></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                Icon: CheckCircle,
                title: "Real-time Detection",
                description:
                  "Instantly identify helmet usage in live video feeds.",
              },
              {
                Icon: Smartphone,
                title: "Mobile Friendly",
                description: "Use on any device with our responsive web app.",
              },
              {
                Icon: Shield,
                title: "Enhanced Safety",
                description:
                  "Improve workplace safety compliance effortlessly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <feature.Icon className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold text-purple-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-purple-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">
            How to Use
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your account in minutes.",
              },
              {
                step: 2,
                title: "Upload Video",
                description: "Select a video feed or connect a live camera.",
              },
              {
                step: 3,
                title: "Analyze",
                description: "Our AI detects helmet usage in real-time.",
              },
              {
                step: 4,
                title: "Get Results",
                description: "View detailed reports and insights.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  Step {step.step}
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enhance Workplace Safety?
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Try our helmet detection app today and see the difference it makes.
          </p>
          <Link href="/dashboard">
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white"
              size="lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-purple-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Helmet Detection App
              </h3>
              <p>Enhancing workplace safety with AI-powered solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: info@helmetdetection.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} Helmet Detection App. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
