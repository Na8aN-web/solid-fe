// src/components/Sidebar.tsx
import { Search } from 'lucide-react';
import { recentPosts, categories, tags } from '../data';

const Sidebar = () => {
    return (
        <div className="w-full md:w-64 bg-[#F9F9F9] p-4">
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Search</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full text-[12px] px-4 py-2 border rounded-md pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
            </div>

            <div className="mb-12">
                <h2 className="font-semibold text-[16px] mb-4">Recent Posts</h2>
                {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center mb-4">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover mr-3"
                        />
                        <div>
                            <div className="flex items-center">
                                <span className="text-primary flex items-center font-semibold text-sm">
                                    <img
                                        src="/calendar.png"
                                        alt="calendar icon"
                                        className="w-4 h-4 mr-1"
                                    />
                                    {post.date}
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-[#2D2828] mt-1">
                                {post.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-12">
                <h2 className="font-semibold text-[16px] my-6">Categories</h2>
                {categories.map((category, index) => (
                    <div key={index} className="flex justify-start gap-2 my-4 items-center py-2">
                        <span>{category.name}</span>
                        <span className="bg-[#E7EAEA] text-[#5E5E5E] px-2 py-0.5 rounded-md text-[16px]">
                            {category.count}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <h2 className="font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-[#F9F9F9] border border-[#003366] rounded-full px-3 py-1 text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;