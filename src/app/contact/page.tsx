export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">Have a question or need support? We're here to help.</p>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <a href="mailto:support@stickerly.app" className="text-green-600 hover:underline">support@stickerly.app</a>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Developer</h3>
          <p className="text-gray-600">MD Arsalan</p>
        </div>
      </div>
    </div>
  );
}
