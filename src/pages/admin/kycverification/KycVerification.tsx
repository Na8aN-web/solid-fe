import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Bell, X, ArrowUpDown, FileText, CheckCircle2, AlertTriangle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import boxBroken from "../../../assets/box-broken.svg";
import {
  fetchAllKYCSubmissions,
  fetchKYCCounters,
  reviewKYC,
  setCurrentPage,
  clearError,
  type KYCSubmission,
  type KYCReviewData,
  setFilters
} from "../../../store/slices/kycSlice";
import { RootState } from "../../../store";

interface KycCardProps {
  title: string;
  count: number;
  color?: string;
  icon?: React.ReactNode;
}

const KycCard: React.FC<KycCardProps> = ({ title, count, color = "bg-blue-50", icon }) => (
  <div className={`${color} flex gap-3 items-center justify-start p-4 rounded-lg shadow-sm border w-full`}>
    <div className="flex-shrink-0">
      {icon || <img src={boxBroken} alt="kyc" className="w-8 h-8" />}
    </div>
    <div className="flex flex-col justify-between text-start">
      <p className="text-sm text-gray-600">{title}</p>
      <span className="text-2xl font-bold text-gray-900">{count}</span>
    </div>
  </div>
);

interface ReviewModalProps {
  submission: KYCSubmission;
  onClose: () => void;
}
const DocumentErrorModal: React.FC<{ isOpen: boolean; onClose: () => void; documentType: string }> = ({
  isOpen,
  onClose,
  documentType
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[2px] flex items-center justify-center z-[60]">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-semibold">Document Unavailable</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          No {documentType} document is available for this submission.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#002244] transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewModal: React.FC<ReviewModalProps> = ({ submission, onClose }) => {
  const dispatch = useDispatch();
  const { submitting } = useSelector((state: RootState) => state.kyc);
  const {
    submissions,
    counters,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalSubmissions,
    filters
  } = useSelector((state: RootState) => state.kyc);
  const [documentError, setDocumentError] = useState<{ show: boolean; type: string }>({
    show: false,
    type: ''
  });

  // Fix: Initialize without status or set it to one of the allowed values
  const [reviewData, setReviewData] = useState<Omit<KYCReviewData, 'status'> & { status?: KYCReviewData['status'] }>({
    checklist: {
      documentQuality: submission.checklist?.documentQuality || false,
      matchingDetails: submission.checklist?.matchingDetails || false,
      validExpiryDates: submission.checklist?.validExpiryDates || false
    },
    reviewComment: submission.reviewComment || ''
  });

  const handleChecklistChange = (field: keyof KYCReviewData['checklist']) => {
    setReviewData(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [field]: !prev.checklist[field]
      }
    }));
  };

  const handleSubmitReview = async (status: 'Approved' | 'Rejected' | 'Flagged') => {
    const finalReviewData: KYCReviewData = {
      status,
      checklist: reviewData.checklist,
      reviewComment: reviewData.reviewComment
    };

    try {
      await dispatch(reviewKYC({
        id: submission._id,
        reviewData: finalReviewData
      }) as any).unwrap();
      onClose();
      // Refresh the submissions list and counters
      dispatch(fetchAllKYCSubmissions({
        page: currentPage,
        limit: itemsPerPage,
        status: filters.status === 'All' ? undefined : filters.status,
        search: filters.searchTerm || undefined
      }) as any);
      dispatch(fetchKYCCounters() as any);
    } catch (error) {
      console.error('Review failed:', error);
    }
  };

  const handleViewDocument = (documentUrl: string | undefined, documentType: string) => {
    if (!documentUrl) {
      setDocumentError({ show: true, type: documentType });
      return;
    }

    const fullUrl = documentUrl.startsWith('http') ? documentUrl : `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}${documentUrl}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold">KYC Review</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${submission.status === 'Approved' ? 'bg-green-100 text-green-800' :
              submission.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                submission.status === 'Flagged' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
              }`}>
              {submission.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Business Info Section */}
          <article className="space-y-6">
            <header className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Business Information</h3>
            </header>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Business Name</p>
                  <p className="text-gray-900 font-medium">{submission.businessName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Registration Number</p>
                  <p className="text-gray-900 font-medium">{submission.registrationNumber}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Business Address</p>
                <p className="text-gray-900 font-medium">{submission.businessAddress}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Business Type</p>
                  <p className="text-gray-900 font-medium">{submission.typeOfBusiness}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Tax ID</p>
                  <p className="text-gray-900 font-medium">{submission.taxId}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email Address</p>
                  <p className="text-gray-900 font-medium">{submission.ownerId.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Date of Incorporation</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(submission.dateOfIncorporation).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {submission.website && (
                <div>
                  <p className="text-gray-500 text-sm mb-1">Website</p>
                  <a
                    href={submission.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {submission.website}
                  </a>
                </div>
              )}
            </div>
          </article>

          {/* Document Upload Section */}
          <article className="space-y-6">
            <header className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-semibold">Uploaded Documents</h3>
            </header>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 font-medium">Business Registration Certificate</p>
                  {submission.documents.businessCert && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                </div>
                <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between bg-white">
                  <span className="text-sm text-gray-600">
                    {submission.documents.businessCert ? 'Certificate uploaded' : 'No document uploaded'}
                  </span>
                  {submission.documents.businessCert && (
                    <button
                      onClick={() => handleViewDocument(submission.documents.businessCert, 'business certificate')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 font-medium">Proof of Address</p>
                  {submission.documents.proofOfAddress && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                </div>
                <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between bg-white">
                  <span className="text-sm text-gray-600">
                    {submission.documents.proofOfAddress ? 'Address proof uploaded' : 'No document uploaded'}
                  </span>
                  {submission.documents.proofOfAddress && (
                    <button
                      onClick={() => handleViewDocument(submission.documents.proofOfAddress, 'proof of address')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 font-medium">Proof of Product Sourcing</p>
                  {submission.documents.proofOfSourcing && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                </div>
                <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between bg-white">
                  <span className="text-sm text-gray-600">
                    {submission.documents.proofOfSourcing ? 'Sourcing proof uploaded' : 'No document uploaded'}
                  </span>
                  {submission.documents.proofOfSourcing && (
                    <button
                      onClick={() => handleViewDocument(submission.documents.proofOfSourcing, 'proof of sourcing')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Verification Checklist Section */}
        <div className="mb-6 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Verification Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-md">
              <input
                type="checkbox"
                checked={reviewData.checklist.documentQuality}
                onChange={() => handleChecklistChange('documentQuality')}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 font-medium">Document Quality</label>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-md">
              <input
                type="checkbox"
                checked={reviewData.checklist.matchingDetails}
                onChange={() => handleChecklistChange('matchingDetails')}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 font-medium">Matching Details</label>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white rounded-md">
              <input
                type="checkbox"
                checked={reviewData.checklist.validExpiryDates}
                onChange={() => handleChecklistChange('validExpiryDates')}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700 font-medium">Valid Expiry Dates</label>
            </div>
          </div>
        </div>

        {/* Review Comments */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Review Comments
          </label>
          <textarea
            value={reviewData.reviewComment}
            onChange={(e) => setReviewData(prev => ({ ...prev, reviewComment: e.target.value }))}
            className="w-full p-4 border border-gray-300 rounded-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Add your review comments here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleSubmitReview('Approved')}
            disabled={submitting}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 h-12 rounded-lg text-white font-medium transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            {submitting ? 'Processing...' : 'Approve'}
          </button>
          <button
            onClick={() => handleSubmitReview('Rejected')}
            disabled={submitting}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 h-12 rounded-lg text-white font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            {submitting ? 'Processing...' : 'Reject'}
          </button>
          <button
            onClick={() => handleSubmitReview('Flagged')}
            disabled={submitting}
            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 h-12 rounded-lg text-white font-medium transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            {submitting ? 'Processing...' : 'Flag'}
          </button>
        </div>
        {documentError.show && (
          <DocumentErrorModal
            isOpen={documentError.show}
            onClose={() => setDocumentError({ show: false, type: '' })}
            documentType={documentError.type}
          />
        )}
      </div>
    </div>
  );
};

const KycVerification: React.FC = () => {
  const dispatch = useDispatch();
  const {
    submissions,
    counters,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalSubmissions,
    filters
  } = useSelector((state: RootState) => state.kyc);

  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
  const [searchInput, setSearchInput] = useState(filters.searchTerm);

  const handleFilterChange = (status: string) => {
    dispatch(setFilters({ ...filters, status }));
    dispatch(setCurrentPage(1)); // Reset to first page when changing filters
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // This will trigger the useEffect that fetches data with the new search term
      dispatch(setFilters({ ...filters, searchTerm: searchInput }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchAllKYCSubmissions({
      page: currentPage,
      limit: itemsPerPage,
      status: filters.status === 'All' ? undefined : filters.status,
      search: filters.searchTerm || undefined
    }) as any);
    dispatch(fetchKYCCounters() as any);
  }, [dispatch, currentPage, itemsPerPage, filters.status, filters.searchTerm]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const filterOptions = [
    { value: "All", label: "All", count: counters?.total || 0 },
    { value: "Pending", label: "Pending", count: counters?.pending || 0 },
    { value: "Approved", label: "Approved", count: counters?.approved || 0 },
    { value: "Rejected", label: "Rejected", count: counters?.rejected || 0 },
    { value: "Flagged", label: "Flagged", count: counters?.flagged || 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Flagged":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const openReview = (submission: KYCSubmission) => {
    setSelectedSubmission(submission);
  };

  const closeReview = () => {
    setSelectedSubmission(null);
  };

  // Calculate pagination info
  const totalPages = Math.ceil(totalSubmissions / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalSubmissions);

  if (error) {
    return (
      <AdminLayout pageTitle="KYC Verification">
        <div className="flex items-center justify-center h-64">
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4 font-medium">Error: {error}</p>
            <button
              onClick={() => {
                dispatch(clearError());
                dispatch(fetchAllKYCSubmissions({
                  page: currentPage,
                  limit: itemsPerPage,
                  status: filters.status === 'All' ? undefined : filters.status,
                  search: filters.searchTerm || undefined
                }) as any);
                dispatch(fetchKYCCounters() as any);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="">
      <div className="space-y-6">
        {/* Header Section */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-2xl font-bold text-gray-900">
                KYC Verification
              </h1>
              <div className="relative w-full sm:w-80">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for KYC submissions..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Notification Button */}
            <div className="flex gap-4">
              <button className="flex gap-2 justify-center items-center px-6 py-3 bg-[#003366] rounded-lg text-white text-sm font-medium hover:bg-[#002244] transition-colors">
                <Bell className="w-4 h-4" />
                Send Notification
              </button>
            </div>
          </div>
        </section>

        {/* KYC Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {loading && !counters ? (
            <div className="col-span-full flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <KycCard
                title="Total Submitted"
                count={counters?.total || 0}
                color="bg-blue-50"
                icon={<FileText className="w-8 h-8 text-blue-600" />}
              />
              <KycCard
                title="Pending"
                count={counters?.pending || 0}
                color="bg-yellow-50"
                icon={<AlertTriangle className="w-8 h-8 text-yellow-600" />}
              />
              <KycCard
                title="Approved"
                count={counters?.approved || 0}
                color="bg-green-50"
                icon={<CheckCircle2 className="w-8 h-8 text-green-600" />}
              />
              <KycCard
                title="Rejected"
                count={counters?.rejected || 0}
                color="bg-red-50"
                icon={<X className="w-8 h-8 text-red-600" />}
              />
              <KycCard
                title="Flagged"
                count={counters?.flagged || 0}
                color="bg-orange-50"
                icon={<AlertTriangle className="w-8 h-8 text-orange-600" />}
              />
            </>
          )}
        </section>

        {/* Filters */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="overflow-x-auto">
              <div className="flex gap-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${filters.status === filter.value
                      ? "bg-[#003366] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                <ArrowUpDown className="w-4 h-4" />
                Sort by Date
              </button>
            </div>
          </div>
        </section>

        {/* Submissions Table */}
        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
                    <th className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded"
                      />
                    </th>
                    <th className="p-4 font-medium">Business Name</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Submission Date</th>
                    <th className="p-4 font-medium">Business Type</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="w-12 h-12 text-gray-300" />
                          <p className="font-medium">
                            {filters.searchTerm
                              ? "No submissions match your search criteria"
                              : "No KYC submissions found"}
                          </p>
                          <p className="text-sm">
                            {filters.searchTerm
                              ? "Try adjusting your search terms"
                              : "KYC submissions will appear here once users start applying"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    submissions.map((submission) => (
                      <tr
                        key={submission._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                              {submission.businessName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {submission.registrationNumber}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-700">
                          {submission.ownerId.email}
                        </td>
                        <td className="p-4 text-sm text-gray-700">
                          {new Date(submission.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="p-4 text-sm text-gray-700">
                          {submission.typeOfBusiness}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            className="px-4 py-2 bg-[#003366] text-white text-xs font-medium rounded-md hover:bg-[#002244] transition-colors"
                            onClick={() => openReview(submission)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Pagination */}
        {!loading && submissions.length > 0 && totalPages > 1 && (
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{endIndex} of {totalSubmissions} submissions
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ←
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNum = i + 1;

                  // Show only a limited number of pages with ellipsis
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${currentPage === pageNum
                          ? "bg-[#003366] text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 3 ||
                    pageNum === currentPage + 3
                  ) {
                    return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Review Modal */}
        {selectedSubmission && (
          <ReviewModal
            submission={selectedSubmission}
            onClose={closeReview}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default KycVerification;