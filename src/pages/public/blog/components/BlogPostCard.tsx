// src/components/BlogPostCard.tsx
import { BlogPost } from '../data';

interface BlogPostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const BlogPostCard = ({ post, onClick }: BlogPostCardProps) => {
  return (
    <div className="mb-12">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover mb-4 rounded-md cursor-pointer"
        onClick={() => onClick(post)}
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

      <h2 
        className="text-xl text-[#2D2828] font-semibold mb-2 cursor-pointer hover:text-primary"
        onClick={() => onClick(post)}
      >
        {post.title}
      </h2>
      <p className="text-[#827E7E] text-[14px] mb-4">{post.excerpt}</p>
      <button 
        className="bg-white border border-primary text-primary px-6 py-1 rounded-md text-sm flex items-center hover:bg-primary hover:text-white transition-colors duration-300"
        onClick={() => onClick(post)}
      >
        Read More
        <span className="ml-1 text-lg">+</span>
      </button>
    </div>
  );
};

export default BlogPostCard;