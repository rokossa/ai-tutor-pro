import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';

export default function AccountSettings() {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Deletion State
  const [deleteStep, setDeleteStep] = useState(1);
  const [childPreference, setChildPreference] = useState('delete');
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const handleExportData = () => {
    setIsExporting(true);
    // Simulate API delay for generating the JSON package
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ mock: "data" }));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "aitutorpro_export.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      setIsExporting(false);
    }, 1500);
  };

  const handleConfirmDeletion = (e) => {
    e.preventDefault();
    setIsDeleting(true);
    // Simulate API call to schedule deletion
    setTimeout(() => {
      setIsDeleting(false);
      setDeletionSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Account Settings</h1>

        {/* Data & Privacy Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Your Data & Privacy</h2>
          <p className="text-slate-500 mb-6">We believe you own your data. Download a complete record of your family's progress, AI interactions, and account history.</p>
          
          <button 
            onClick={handleExportData}
            disabled={isExporting}
            className="flex items-center gap-2 bg-slate-100 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-200 transition border border-slate-300 disabled:opacity-50"
          >
            {isExporting ? "Generating Package..." : "⬇ Export My Data (JSON)"}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
          <h2 className="text-xl font-bold text-red-800 mb-2">Danger Zone</h2>
          <p className="text-red-600 mb-6">Permanently delete your account, cancel your subscription, and remove all associated child profiles.</p>
          
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            Delete Account
          </button>
        </div>
      </main>

      {/* Deletion Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {!deletionSuccess ? (
              <div className="p-8">
                {deleteStep === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Are you absolutely sure?</h3>
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                      <p className="text-orange-800 text-sm font-medium">
                        This action will initiate a <strong>14-day cooling-off period</strong>. After 14 days, your subscription will be canceled and your data will be permanently wiped to comply with COPPA/PIPEDA regulations.
                      </p>
                    </div>
                    
                    <h4 className="font-bold text-slate-800 mb-2">What happens to your children's profiles?</h4>
                    <div className="space-y-3 mb-8">
                      <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                        <input type="radio" name="childAction" checked={childPreference === 'delete'} onChange={() => setChildPreference('delete')} className="mt-1" />
                        <div>
                          <p className="font-bold text-slate-800">Delete all child data</p>
                          <p className="text-sm text-slate-500">Permanently erase their progress and AI tutoring history.</p>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                        <input type="radio" name="childAction" checked={childPreference === 'transfer'} onChange={() => setChildPreference('transfer')} className="mt-1" />
                        <div>
                          <p className="font-bold text-slate-800">Transfer to Co-Parent</p>
                          <p className="text-sm text-slate-500">Keep their profiles active under your registered co-parent.</p>
                        </div>
                      </label>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                      <button onClick={() => setDeleteStep(2)} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">Continue</button>
                    </div>
                  </div>
                )}

                {deleteStep === 2 && (
                  <form onSubmit={handleConfirmDeletion}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Verify it's you</h3>
                    <p className="text-slate-600 mb-6">Please enter your password to confirm account deletion.</p>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full border border-slate-300 rounded-lg p-3 mb-8 focus:ring-2 focus:ring-red-500 outline-none" 
                    />
                    <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => setDeleteStep(1)} className="px-6 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Back</button>
                      <button type="submit" disabled={!password || isDeleting} className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:opacity-50">
                        {isDeleting ? "Processing..." : "Schedule Deletion"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">⏳</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Deletion Scheduled</h3>
                <p className="text-slate-600 mb-6">Your account will be permanently deleted in 14 days. If you change your mind before then, simply log back in to cancel the request.</p>
                <button onClick={() => window.location.href = '/'} className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800">
                  Return to Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
