import Link from "next/link";
import { Shield, FileText, Mail, Info, Smartphone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-lg mb-20">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl shadow-lg flex items-center justify-center mb-4">
          <Smartphone className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Stickerly</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">v1.1.0 - Professional Release</p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
          Made with ❤️ by MD Arsalan
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-2">Legal & Support</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Link href="/privacy" className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition border-b border-gray-100">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1 font-medium text-gray-800">Privacy Policy</div>
          </Link>
          
          <Link href="/terms" className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition border-b border-gray-100">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 font-medium text-gray-800">Terms of Service</div>
          </Link>

          <Link href="/contact" className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 transition">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 font-medium text-gray-800">Contact Us</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
