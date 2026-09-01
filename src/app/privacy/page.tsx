export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-gray">
        <p>Last updated: September 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <p>Stickerly respects your privacy. We do not collect or store any personal information on our servers. All sticker processing (such as background removal and image conversion) is handled directly on your device or safely via temporary cloud APIs that do not retain data.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">2. Local Storage</h2>
        <p>Your sticker packs are stored entirely locally on your device using browser Local Storage and your phone's native file system. We do not sync, read, or upload your created stickers to any centralized database.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">3. Third-Party Services</h2>
        <p>We utilize the following third-party services which may process data according to their own privacy policies:</p>
        <ul className="list-disc pl-6 my-2">
          <li><strong>Tenor API:</strong> For searching and fetching GIFs.</li>
          <li><strong>Remove.bg:</strong> For background removal processing.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">4. App Permissions</h2>
        <p>The Android version of Stickerly requests storage permissions solely for the purpose of saving your sticker packs locally so that WhatsApp can read them when you add a pack.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">5. Contact</h2>
        <p>If you have any questions about our privacy practices, please contact us.</p>
      </div>
    </div>
  );
}
