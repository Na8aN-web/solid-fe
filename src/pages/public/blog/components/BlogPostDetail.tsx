// src/components/BlogPostDetail.tsx
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../data';
import Sidebar from './Sidebar';
import { tags } from '../data';

interface BlogPostDetailProps {
    post: BlogPost;
    onBack: () => void;
}

const BlogPostDetail = ({ post, onBack }: BlogPostDetailProps) => {
    const [commentData, setCommentData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        comment: '',
        saveInfo: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCommentData({
            ...commentData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentData({
            ...commentData,
            saveInfo: e.target.checked
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Comment submitted:', commentData);
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto flex flex-col-reverse md:flex-row">
                <Sidebar />
                <div className="flex-1 p-6">

                    <h1 className="text-2xl text-[#3D3D3D] font-bold mb-6">Blogs</h1>
                    <div className="mb-12">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-96 object-cover mb-4 rounded-md"
                        />
                        <div className="mb-2 flex items-center text-sm text-[#5E5E5E]">
                            <span>By: {post.author}</span>
                            <span className="text-primary flex items-center font-semibold text-sm px-2 py-0.5 rounded ml-2">
                                <img
                                    src="/calendar.png"
                                    alt="calendar icon"
                                    className="w-4 h-4 mr-1"
                                />
                                {post.date}
                            </span>
                        </div>
                        <h1 className="text-[20px] text-[#2D2828] font-bold my-6">{post.title}</h1>

                        <div className="prose max-w-none text-[14px] mb-8">
                            <p className="text-[#827E7E] mb-4">{post.excerpt}</p>
                            <p className="text-[#827E7E] mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p className="text-[#827E7E] mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <p className="text-[#827E7E] mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="font-bold mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-white text-black border border-primary rounded-full px-3 py-1 text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <button
                                onClick={onBack}
                                className="flex items-center font-semibold text-primary hover:text-blue-800"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Previous Post
                            </button>
                        </div>

                        <div className="mb-8 border border-[#D9D9D9] rounded-[40px] py-[60px] px-[32px] md:w-[600px]">
                            <h2 className="text-2xl font-bold mb-4">Leave A Reply</h2>
                            <p className="text-sm text-[#2D2828] mb-4">Your email address will not be published. Required fields are marked*</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="comment" className="block mb-2 text-[#2D2828] text-[14px]">Comment*</label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        value={commentData.comment}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                        placeholder="Write your comment"
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="firstName" className="block mb-2 text-[14px] text-[#2D2828]">First Name*</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={commentData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-3"
                                            placeholder="First Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block mb-2 text-[14px] text-[#2D2828]">Last Name*</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={commentData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-3"
                                            placeholder="Last Name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-2 text-[14px] text-[#2D2828]">Email Address*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={commentData.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="website" className="block mb-2 text-[14px] text-[#2D2828]">Website</label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={commentData.website}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                        placeholder="Enter your website address"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="saveInfo"
                                            checked={commentData.saveInfo}
                                            onChange={handleCheckboxChange}
                                            className="mr-2"
                                        />
                                        <span className="text-sm py-6 text-[#003366]">
                                            Save my name, email, and website in this browser for the next time I comment
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-medium py-3 rounded-md hover:bg-blue-900"
                                >
                                    Post A Comment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;