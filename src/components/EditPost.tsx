import { useState } from "react";
import { useForm } from "react-hook-form";
import customAxios from "../base_URL";
import { Post } from "./Card";

export interface EditPostProps {
	postId: string;
	onClose: () => void;
	onUpdate: () => void;
	initialPost: Post;
}

export interface PostFormData {
	title: string;
	body: string;
	tags: string[];
}

const EditPost: React.FC<EditPostProps> = ({ postId, onClose, onUpdate, initialPost }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PostFormData>();

	const onSubmit = async (data: PostFormData) => {
		setIsSubmitting(true);
		try {
			const response = await customAxios.put(`/api/posts/edit/${postId}`, data);
			if (response.status === 200) {
				onUpdate();
				onClose();
			} else {
				console.error("Failed to edit post", response);
			}
		} catch (error) {
			console.error("Failed to edit post", error);
		}
		setIsSubmitting(false);
	};

	setValue("title", initialPost.title);
	setValue("body", initialPost.body);
	setValue("tags", initialPost.tags);

	return (
		<div className="absolute w-full h-screen top-0 left-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
			<div className="bg-[#FFFFFF] w-[280px] max-w-[280px] p-6 rounded-xl">
				<h2 className="text-lg font-semibold mb-5 text-center">Edit Post</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className="formLabel">Title</label>
						<input
							type="text"
							className="formInput mb-3"
							{...register("title", { required: "Please enter a title" })}
						/>
						<p className="errorText">{errors.title?.message}</p>
					</div>
					<div>
						<label className="formLabel mb-1">Content</label>
						<textarea
							className="formInput h-32 mb-3"
							{...register("body", { required: "Please enter some words" })}
						/>
						<p className="errorText">{errors.body?.message}</p>
					</div>
					<div>
						<label className="formLabel mb-1">Tags</label>
						<div className="formInput">
							<select
								id="tags"
								className="w-full text-xs bg-transparent"
								{...register("tags", {
									required: "Please select at least one tag",
								})}
								multiple
								size={4}>
								<option disabled value="default">
									Hold Ctrl to select multiple tags
								</option>
								<option value="history">History</option>
								<option value="american">American</option>
								<option value="crime">Crime</option>
								<option value="science">Science</option>
								<option value="fiction">Fiction</option>
								<option value="fantasy">Fantasy</option>
								<option value="space">Space</option>
								<option value="adventure">Adventure</option>
								<option value="nature">Nature</option>
								<option value="environment">Environment</option>
								<option value="philosophy">Philosophy</option>
								<option value="psychology">Psychology</option>
								<option value="health">Health</option>
							</select>
						</div>
					</div>

					<div className="flex justify-around mt-4">
						<button className="bg-[#FDEACD] postButton" onClick={onClose}>
							Cancel
						</button>
						<button className="bg-[#F8B959] postButton" type="submit" disabled={isSubmitting}>
							Edit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditPost;
