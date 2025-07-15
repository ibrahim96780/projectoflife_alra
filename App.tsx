import React, { useState } from 'react';
import Header from './components/Header';
import FooterNav from './components/FooterNav';
import ContentCarousel from './components/ContentCarousel';
import LivePlayer from './components/LivePlayer';
import LiveChat from './components/LiveChat';
import DiscoursesPage from './components/DiscoursesPage';
import ProfilePage from './components/ProfilePage';
import { MOCK_VIDEO_CONTENT, SUPPORTED_LANGUAGES } from './constants';
import type { Language } from './types';

const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [activeTab, setActiveTab] = useState('Home');

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
              <div className="lg:col-span-2">
                <LivePlayer 
                  currentLanguage={currentLanguage} 
                  onLanguageChange={handleLanguageChange} 
                />
              </div>
              <div className="hidden lg:block">
                <LiveChat currentLanguage={currentLanguage} />
              </div>
            </div>

            <div className="mt-12">
              <ContentCarousel title="Recent Discourses" videos={MOCK_VIDEO_CONTENT.trending} />
              <ContentCarousel title="Upcoming Live Events" videos={MOCK_VIDEO_CONTENT.upcoming} />
            </div>
            
            <div className="lg:hidden mt-8 px-4">
                <div className="h-[70vh]">
                     <LiveChat currentLanguage={currentLanguage} />
                </div>
            </div>
          </>
        );
      case 'Live':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            <div className="lg:col-span-2">
              <LivePlayer 
                currentLanguage={currentLanguage} 
                onLanguageChange={handleLanguageChange} 
              />
            </div>
            <div className="lg:col-span-1">
              <div className="h-[70vh] lg:h-full">
                <LiveChat currentLanguage={currentLanguage} />
              </div>
            </div>
          </div>
        );
      case 'Discourses':
        return <DiscoursesPage />;
      case 'Profile':
        return <ProfilePage />;
      default:
        return null; // Should not happen
    }
  };

  return (
    <div className="bg-light-bg text-light-text min-h-screen font-sans">
      <Header />

      <main className="pt-20 pb-20 container mx-auto">
        {renderContent()}
      </main>

      <FooterNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;