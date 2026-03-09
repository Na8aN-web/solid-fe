import { useState } from 'react';
import Sidebar from './components/Sidebar';
import BlogPostCard from './components/BlogPostCard';
import BlogPostDetail from './components/BlogPostDetail';
import { blogPosts } from './data';
import { BlogPost } from './data';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <>
      {selectedPost ? (
        <BlogPostDetail post={selectedPost} onBack={handleBackClick} />
      ) : (
        <div className="min-h-screen bg-white py-8">
          <div className="container mx-auto flex flex-col-reverse md:flex-row">
            <Sidebar />
            <div className="flex-1 p-6">
              <h1 className="text-2xl text-[#3D3D3D] font-bold mb-6">Blogs</h1>
              <div>
                {blogPosts.map((post) => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onClick={handlePostClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;