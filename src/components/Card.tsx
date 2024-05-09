import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import { useState } from "react";

export interface Post {
	id: string;
	date: string;
	title: string;
	body: string;
	tags: string[];
}

interface CardProps {
	posts: Post[];
	onUpdate: () => void;
}

const Card: React.FC<CardProps> = ({ posts, onUpdate }) => {
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const handleEditClick = (post: Post) => {
		setSelectedPost(post);
	};

	const handleCloseEdit = () => {
		setSelectedPost(null);
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString([], {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
	};

	const limitWords = (text: string, limit: number) => {
		if (!text) return "";
		const words = text.split(" ");
		return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
	};

	console.log(posts);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			{posts?.length === 0 ? (
				<p>No posts available</p>
			) : (
				posts?.map((post, index) => (
					<div
						key={post.id || index}
						className="bg-[#FFFFFF] w-[240px] h-[280px] shadow-md rounded-lg grid grid-cols-1 grid-flow-row p-4 ">
						<p className="text-[#f8b959] text-xs mb-4">{formatDate(post.date)}</p>
						<h2 className="text-base font-semibold mb-1">{limitWords(post.title, 8)}</h2>
						<p className="text-gray-700 text-sm mb-2">{limitWords(post.body, 12)}</p>
						<div className="flex gap-1 flex-wrap mb-3">
							{post.tags?.map((tag, index) => (
								<span
									key={tag || index}
									className="bg-[#FDEACD] cardButtons w-fit h-[20px] px-3 pt-[0.5px]">
									{tag}
								</span>
							))}
						</div>
						<div className="flex justify-between">
							<div>
								<button
									className="bg-[#d9f8cf] cardButtons w-[60px] h-[20px]"
									onClick={() => handleEditClick(post)}>
									Edit
								</button>
							</div>

							<Link to={`/posts/${post.id}`}>
								<button className="bg-[#f8b959] cardButtons w-[60px] h-[20px]">View</button>
							</Link>
							<div>
								<DeletePost postId={post.id} onUpdate={onUpdate} postTitle={post.title} />
							</div>
						</div>
					</div>
				))
			)}

			{selectedPost && (
				<EditPost
					postId={selectedPost.id}
					onClose={handleCloseEdit}
					onUpdate={onUpdate}
					initialPost={selectedPost}
				/>
			)}
		</div>
	);
};

export default Card;
