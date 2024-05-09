import customAxios from "../base_URL";
import toast, { Toaster } from "react-hot-toast";

interface DeletePostProps {
	postId: string;
	postTitle: string;
	onUpdate: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId, postTitle, onUpdate }) => {
	// const handleDelete = async () => {
	// 	try {
	// 		const confirm = window.confirm(`Are you sure you want to delete this post, "${postTitle} ?`);
	// 		if (confirm) {
	// 			const response = await customAxios.delete(`/api/posts/delete/${postId}`);
	// 			if (response.status === 200) {
	// 				onUpdate();
	// 				console.log("Post deleted successfully");
	// 			} else {
	// 				console.error("Failed to delete post");
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Error deleting post", error);
	// 	}
	// };

	const handleDelete = () => {
		toast(
			(t) => (
				<div className="absolute w-screen h-screen top-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
					<div className="bg-[#FFFFFF] w-[300px] p-6 rounded-xl">
						<div className="mb-4">
							<p className="text-[#F95A50] text-center text-base mb-4">{postTitle}</p>
							<p className="text-center text-sm">Are you sure you want to delete this post?</p>
						</div>
						<div className="flex justify-around">
							<button
								onClick={() => toast.dismiss(t.id)}
								className="bg-[#FDEACD] cardButtons w-[60px] h-[20px]">
								Cancel
							</button>
							<button
								onClick={async () => {
									const response = await customAxios.delete(`/api/posts/delete/${postId}`);
									if (response.status === 200) {
										toast.dismiss(t.id);
										onUpdate();
										console.log("Post deleted");
									} else {
										console.log("Failed to delete post");
									}
								}}
								className="bg-[#F95A50] cardButtons w-[60px] h-[20px]">
								Delete
							</button>
						</div>
					</div>
				</div>
			),
			{ duration: Infinity }
		);
	};

	return (
		<>
			<button className="bg-[#F95A50] cardButtons w-[60px] h-[20px]" onClick={handleDelete}>
				Delete
			</button>
			<Toaster />
		</>
	);
};

export default DeletePost;
