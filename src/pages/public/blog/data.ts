export interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    image: string;
}

export interface Category {
    name: string;
    count: number;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Getting the Best For Your Vehicle",
        author: "Marvellous",
        date: "October 11, 2024",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/blog5.png",
    },
    {
        id: 2,
        title: "Getting the Best For Your Vehicle",
        author: "Marvellous",
        date: "October 11, 2024",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/blog6.png",
    },
    {
        id: 3,
        title: "Getting the Best For Your Vehicle",
        author: "Marvellous",
        date: "October 11, 2024",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/blog7.png",
    },
    {
        id: 4,
        title: "Getting the Best For Your Vehicle",
        author: "Marvellous",
        date: "October 11, 2024",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/blog8.png",
    },
];

export const categories: Category[] = [
    { name: "Repair Parts", count: 11 },
    { name: "Body Parts", count: 11 },
    { name: "Performance Parts", count: 11 },
    { name: "Electronics", count: 2 },
    { name: "Exchange Rate", count: 5 },
];

export const tags = [
    "Repair Parts",
    "Body Parts",
    "Performance Parts",
    "Electronics",
    "Exchange Rate",
];

export const recentPosts = blogPosts.slice(0, 4);