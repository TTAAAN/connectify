import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, Mail, Clock, FileCheck } from 'lucide-react';

export function SubmissionConfirmation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation/Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>

          <h1 className="text-4xl mb-4">Submission Received!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for sharing your opportunity with the Connectify community
          </p>

          {/* Submission Details */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-left space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Submission ID</span>
                  <Badge variant="outline" className="text-lg px-3 py-1">SUB-1006</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Opportunity Title</span>
                  <span>Blockchain Development Conference</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Submitted On</span>
                  <span>{new Date().toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Tracker */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="text-lg mb-6">Review Status</h3>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                <div className="absolute top-5 left-0 w-1/3 h-1 bg-blue-600 -z-10"></div>
                
                <div className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm">Submitted</span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500">Under Review</span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <FileCheck className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500">Approved/Rejected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="mb-8 text-left">
            <CardContent className="pt-6">
              <h3 className="text-lg mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="mb-1">Admin Review</h4>
                    <p className="text-sm text-gray-600">
                      Our moderation team will review your submission for authenticity and completeness. 
                      This typically takes 24-48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600">2</span>
                  </div>
                  <div>
                    <h4 className="mb-1">Notification</h4>
                    <p className="text-sm text-gray-600">
                      You'll receive an email notification once your submission has been reviewed. 
                      Check your inbox and spam folder.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">3</span>
                  </div>
                  <div>
                    <h4 className="mb-1">Go Live</h4>
                    <p className="text-sm text-gray-600">
                      Once approved, your opportunity will be published on the platform and visible to all users. 
                      You'll be able to track views and applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Notification Confirmation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center justify-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <p className="text-blue-900">
              A confirmation email has been sent to <strong>your@email.com</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Link to="/profile">
              <Button variant="outline" size="lg">
                View My Submissions
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
