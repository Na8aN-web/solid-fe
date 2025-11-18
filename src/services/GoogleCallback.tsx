import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { handleGoogleCallback } from '../store/slices/authSlice';

const GoogleCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
    const [hasProcessed, setHasProcessed] = useState(false);

    useEffect(() => {
        // Prevent duplicate processing
        if (hasProcessed) return;

        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const errorParam = searchParams.get('error');

        // If there's an error from Google OAuth
        if (errorParam) {
            console.error('Google OAuth error:', errorParam);
            setHasProcessed(true);
            navigate('/login', { 
                state: { error: 'Google authentication was cancelled or failed' } 
            });
            return;
        }

        // If we have the authorization code, process it
        if (code) {
            setHasProcessed(true);
            dispatch(handleGoogleCallback({ code, state: state || undefined }))
                .unwrap()
        } else {
            setHasProcessed(true);
            navigate('/login', { 
                state: { error: 'Invalid authentication response from Google' } 
            });
        }
    }, [searchParams, dispatch, navigate, hasProcessed]);

    // Redirect based on authentication status
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    // Handle errors
    useEffect(() => {
        if (error && hasProcessed) {
            console.error('Authentication error:', error);
            navigate('/login', { 
                state: { error: error } 
            });
        }
    }, [error, navigate, hasProcessed]);

    // Show loading state while processing
    if (isLoading || !hasProcessed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">
                        Completing Google Sign In...
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Please wait while we authenticate your account
                    </p>
                </div>
            </div>
        );
    }

    // This should rarely be shown as we redirect in useEffects
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="text-yellow-500 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-700">
                    Processing Authentication
                </h2>
                <p className="text-gray-500 mt-2 mb-4">
                    Please wait while we complete your authentication...
                </p>
            </div>
        </div>
    );
};

export default GoogleCallback;