import { ArrowRight, Globe, Package, Truck } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-5xl mx-auto text-center text-white">
        {/* Logo/Icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Truck className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">MPK Cargo Logistics</h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto">
          Your trusted partner in global freight solutions. Delivering excellence across borders with speed,
          reliability, and care.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Package className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Secure Shipping</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Truck className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <Globe className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">Global Network</h3>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-3 bg-white text-purple-700 hover:bg-gray-100 px-10 py-5 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-2xl">
          Access Your Dashboard
          <ArrowRight className="w-6 h-6" />
        </Link>

        {/* Additional Info */}
        <p className="text-purple-200 mt-8 text-sm">Track shipments • Manage orders • Real-time updates</p>
      </div>
    </div>
  )
}
