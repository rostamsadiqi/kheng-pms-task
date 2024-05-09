import customAxios from "../base_URL";
import { Link, useParams } from "react-router-dom";
import { clearToken } from "../context/LocalStorage";
import { Post } from "../components/Card";
import { useEffect, useState } from "react";

const onLogout = () => {
	clearToken();
};

const ViewPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		const fetchPostDetails = async () => {
			try {
				const response = await customAxios.get(`/api/posts/view/${postId}`);
				setPost(response.data);
			} catch (error) {
				console.error("Error fetching post details", error);
			}
		};
		fetchPostDetails();
	}, [postId]);

	if (!post) {
		return <p className="loading">Loading...</p>;
	}

	return (
		<div className="">
			<div className="w-full px-10 py-6 mx-auto">
				<div className="flex justify-between">
					<Link to="/">
						<button className="postButton bg-[#F8B959]">Back</button>
					</Link>

					<Link to="/login">
						<button className="text-[#F95A50] text-lg tracking-wide" onClick={onLogout}>
							Logout
						</button>
					</Link>
				</div>

				<h1 className="text-lg text-center tracking-wide pt-6 pb-16">View Post</h1>

				<div className="flex flex-col justify-center bg-[#FFFFFF]  shadow-md rounded-lg py-10 px-8 text-justify">
					<h2 className="text-base font-semibold mb-3">{post.title}</h2>
					<p className="text-gray-700 text-sm mb-6">{post.body}</p>
					<div className="flex gap-1 flex-wrap">
						<span className="flex gap-1 flex-wrap">
							{post.tags?.map((tag) => (
								<span key={tag} className="bg-[#FDEACD] cardButtons w-fit h-[20px] px-3 pt-[0.5px]">
									{tag}
								</span>
							))}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewPost;
