import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// User Pages
import { LandingPage } from './pages/LandingPage';
import { UserDashboard } from './pages/UserDashboard';
import { OpportunitySearch } from './pages/OpportunitySearch';
import { OpportunityDetail } from './pages/OpportunityDetail';
import { MapView } from './pages/MapView';
import { UserProfile } from './pages/UserProfile';
import { SavedOpportunities } from './pages/SavedOpportunities';
import { EventSubmission } from './pages/EventSubmission';
import { SubmissionConfirmation } from './pages/SubmissionConfirmation';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';

// Admin Pages
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminReviewQueue } from './pages/AdminReviewQueue';
import { AdminReviewDetail } from './pages/AdminReviewDetail';
import { AdminManageOpportunities } from './pages/AdminManageOpportunities';
import { AdminFlaggedContent } from './pages/AdminFlaggedContent';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminUserManagement } from './pages/AdminUserManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public/User Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/opportunities" element={<OpportunitySearch />} />
        <Route path="/opportunity/:id" element={<OpportunityDetail />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/saved" element={<SavedOpportunities />} />
        <Route path="/submit" element={<EventSubmission />} />
        <Route path="/submission-confirmation" element={<SubmissionConfirmation />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/review-queue" element={<AdminReviewQueue />} />
        <Route path="/admin/review/:id" element={<AdminReviewDetail />} />
        <Route path="/admin/manage" element={<AdminManageOpportunities />} />
        <Route path="/admin/flagged" element={<AdminFlaggedContent />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}