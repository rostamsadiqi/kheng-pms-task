import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setToken } from "../context/LocalStorage";
import customAxios from "../base_URL";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
			role: "",
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (data: {
		username: string;
		email: string;
		password: string;
		role: string;
	}) => {
		try {
			const response = await customAxios.post(`/api/account/register`, data);
			const token = response.data.token;
			setToken(token);
			toast.success("Account successfully created. Redirecting to login page.");
			setTimeout(() => {
				navigate("/login");
			}, 1000);
			console.log(response.data);
		} catch (error) {
			toast.error("Failed to create account. Please make sure you have filled in all the fields.");

			console.error("Registration error:", error);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center">
			<div className="max-w-xs w-full mx-auto px-12 py-8 bg-[#FFFFFF] rounded-xl">
				<h1 className="formTitle">Register User</h1>

				<form action="" className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="" className="formLabel">
							Username
						</label>
						<input
							{...register("username", {
								required: "Please enter a username",
							})}
							type="text"
							autoComplete="off"
							className="formInput"
						/>
						<p className="errorText">{errors.username?.message}</p>
					</div>
					<div>
						<label htmlFor="" className="formLabel">
							Email
						</label>
						<input
							{...register("email", {
								required: "Please enter a valid email",
							})}
							type="text"
							autoComplete="off"
							className="formInput"
						/>
						<p className="errorText">{errors.email?.message}</p>
					</div>
					<div>
						<label htmlFor="" className="formLabel">
							Password
						</label>
						<input
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Password must be 6 characters or more",
								},
							})}
							type="password"
							autoComplete="off"
							className="formInput"
						/>
						<p className="errorText">{errors.password?.message}</p>
					</div>
					<div>
						<label htmlFor="" className="formLabel pb-1">
							Role
						</label>
						<div className="formInput">
							<select
								id="role"
								className="w-full text-xs bg-transparent"
								{...register("role", {
									required: "Please select a role",
								})}>
								<option disabled selected value="">
									Select role
								</option>
								<option value="admin">Admin</option>
								<option value="user">User</option>
							</select>
						</div>
						<p className="errorText">{errors.role?.message}</p>
					</div>

					<div className="space-y-2">
						<button type="submit" className="formButton">
							Register
						</button>
						<Toaster />
						<div>
							<Link to="/login">
								<p className="formText">Back to Login Page</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
