import { Link } from "react-router-dom";
import { clearToken, getToken } from "../context/LocalStorage";
import Card from "../components/Card";
import CreatePost from "../components/CreatePost";
import customAxios from "../base_URL";
import { Post } from "../components/Card";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
	role: string;
}

const Home: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalAccounts, setTotalAccounts] = useState<number | null>(null);
	const [totalPosts, setTotalPosts] = useState<number | null>(null);
	const [myPosts, setMyPosts] = useState<number | null>(null);

	useEffect(() => {
		const token = getToken();
		if (token) {
			const decodedToken = jwtDecode<DecodedToken>(token);
			const userRole = decodedToken.role;

			if (userRole === "admin") {
				fetchAllPosts();
				fetchMyPosts();
				fetchTotalAccounts();
			} else {
				fetchMyPosts();
			}
		}
	}, [isDeleted]);

	const fetchMyPosts = async () => {
		try {
			const response = await customAxios.post(`/api/posts/mypost`);
			setPosts(response.data.data);
			setMyPosts(response.data.data.length);
			setLoading(false);
		} catch (error) {
			console.log("Error fetching MyPosts", error);
			setError("Error fetching MyPost. Please try again later");
			setLoading(false);
		}
	};

	const fetchAllPosts = async () => {
		try {
			const response = await customAxios.get(`/api/posts`);
			setPosts(response.data.data);
			setTotalPosts(response.data.totalPosts);
			setLoading(false);
		} catch (error) {
			console.log("Failed to fetch post data", error);
			setError("Failed to fetch post data. Please Try again later");
			setLoading(false);
		}
	};

	const fetchTotalAccounts = async () => {
		try {
			const response = await customAxios.get(`/api/accounts`);
			setTotalAccounts(response.data.accounts.length);
			setLoading(false);
		} catch (error) {
			console.log("Failed to fetch account data", error);
			setError("Failed to fetch account data");
			setLoading(false);
		}
	};

	const handleDelete = () => {
		setIsDeleted(!isDeleted);
	};

	const handleCreate = async () => {
		const token = getToken();
		if (token) {
			const decodedToken = jwtDecode<DecodedToken>(token);
			const userRole = decodedToken.role;

			if (userRole === "admin") {
				await fetchMyPosts();
				await fetchAllPosts();
			} else {
				await fetchMyPosts();
			}
		}
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const onLogout = () => {
		clearToken();
	};

	if (loading) {
		return <p className="loading">Loading...</p>;
	}

	if (error) {
		return <p className="loading">{error}</p>;
	}

	return (
		<div className="">
			<div className="w-full px-10 py-6 mx-auto">
				<div className="flex justify-between">
					<button className="postButton bg-[#F8B959]" onClick={openModal}>
						Add New Post
					</button>
					<Link to="/login">
						<button className="text-[#F95A50] text-lg tracking-wide" onClick={onLogout}>
							Logout
						</button>
					</Link>
				</div>

				<h1 className="text-lg text-center tracking-wide py-6">Post List</h1>

				{totalAccounts && (
					<div className="flex flex-col items-center gap-5 mt-10 mb-16 sm:flex-row sm:justify-between">
						<div className="bg-[#FDEACD] adminView">
							<h2 className="postDetails">Total Account</h2>
							<p className="postDetails">{totalAccounts}</p>
						</div>
						<div className="bg-[#E6A5A1] adminView ">
							<h2 className="postDetails">Total Post</h2>
							<p className="postDetails">{totalPosts}</p>
						</div>
						<div className="bg-[#d9f8cf] adminView">
							<h2 className="postDetails">My Post</h2>
							<p className="postDetails">{myPosts}</p>
						</div>
					</div>
				)}

				<div className="flex justify-center">
					<Card posts={posts} onUpdate={handleDelete} />
				</div>

				<CreatePost isOpen={isModalOpen} onClose={closeModal} onCreate={handleCreate} />
			</div>
		</div>
	);
};

export default Home;
