import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, User, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  // MOCK AUTH STATE: Change this to 'parent', 'student', 'tutor', or null to test the dynamic views!
  const user = null; // e.g., { role: 'parent', name: 'David' }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const handleLogout = () => {
    // Clear token logic here
    setIsAvatarDropdownOpen(false);
    navigate('/');
  };

  // Nav Configurations
  const publicLinks = [
    { name: t('common.howItWorks'), path: '/about' },
    { name: t('common.curriculum'), path: '/curriculum' },
    { name: t('common.forParents'), path: '/parent-info' },
    { name: t('common.pricing'), path: '/pricing' }
  ];

  const parentLinks = [
    { name: t('common.dashboard'), path: '/parent/dashboard' },
    { name: t('common.myChildren'), path: '/parent/children' },
    { name: t('common.reports'), path: '/parent/reports' },
    { name: t('common.billing'), path: '/parent/billing' }
  ];

  const studentLinks = [
    { name: t('common.practice'), path: '/student/dashboard' },
    { name: t('common.myProgress'), path: '/student/progress' },
    { name: t('common.streak'), path: '/student/dashboard' }
  ];

  const tutorLinks = [
    { name: t('common.myStudents'), path: '/tutor/students' },
    { name: t('common.reports'), path: '/tutor/reports' },
    { name: t('common.tools'), path: '/tutor/tools' }
  ];

  const getActiveLinks = () => {
    if (!user) return publicLinks;
    if (user.role === 'parent') return parentLinks;
    if (user.role === 'student') return studentLinks;
    if (user.role === 'tutor') return tutorLinks;
    return publicLinks;
  };

  const activeLinks = getActiveLinks();

  const LanguageToggle = ({ mobile }) => (
    <button 
      onClick={toggleLanguage} 
      className={`flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-full transition ${mobile ? 'w-full justify-center mb-6 py-3' : ''}`}
    >
      <span className={i18n.language === 'en' ? 'text-indigo-600' : ''}>EN</span>
      <span className="text-slate-300">/</span>
      <span className={i18n.language === 'fr' ? 'text-indigo-600' : ''}>FR</span>
    </button>
  );

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Brand */}
          <Link to={user ? `/${user.role}/dashboard` : '/'} className="flex items-center gap-3 z-50">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Tutor Pro</span>
          </Link>

          {/* DESKTOP CENTER LINKS (1024px+) */}
          <div className="hidden lg:flex items-center space-x-8">
            {activeLinks.map((link, idx) => (
              <Link key={idx} to={link.path} className="text-slate-600 hover:text-indigo-600 font-bold transition">
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP RIGHT ACTIONS (1024px+) */}
          <div className="hidden lg:flex items-center space-x-5">
            <LanguageToggle />
            
            {!user ? (
              <>
                <Link to="/login" className="text-slate-700 font-bold px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition">
                  {t('common.login')}
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-indigo-200">
                  {t('common.startFreeTrial')}
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-full transition"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <ChevronDown size={16} className="text-slate-500" />
                </button>

                {/* Avatar Dropdown */}
                {isAvatarDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                    <Link to="/settings" onClick={() => setIsAvatarDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                      <User size={16} /> {t('common.profile')}
                    </Link>
                    <Link to="/settings/account" onClick={() => setIsAvatarDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                      <Settings size={16} /> {t('common.settings')}
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition mt-1 border-t border-slate-100 pt-3">
                      <LogOut size={16} /> {t('common.logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON (<1024px) */}
          <div className="lg:hidden flex items-center z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900 p-2">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULL SCREEN MENU (<1024px) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-40 flex flex-col p-6 animate-in slide-in-from-right-full duration-300 lg:hidden overflow-y-auto">
          <LanguageToggle mobile={true} />
          
          <div className="flex flex-col space-y-6 flex-grow">
            {activeLinks.map((link, idx) => (
              <Link key={idx} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col gap-4 pb-12">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center text-slate-700 font-bold py-4 rounded-xl border border-slate-300 active:bg-slate-50">
                  {t('common.login')}
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200">
                  {t('common.startFreeTrial')}
                </Link>
              </>
            ) : (
              <>
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center gap-3 text-slate-700 font-bold py-3"><User size={20} /> {t('common.profile')}</Link>
                <Link to="/settings/account" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center gap-3 text-slate-700 font-bold py-3"><Settings size={20} /> {t('common.settings')}</Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 text-red-600 font-bold py-3"><LogOut size={20} /> {t('common.logout')}</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
