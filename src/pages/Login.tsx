import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { setToken } from "../context/LocalStorage";
import customAxios from "../base_URL";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (data: { email: string; password: string }) => {
		try {
			const response = await customAxios.post(`/api/account/login`, data);
			const token = response.data.token;
			setToken(token);
			toast.success("Login Successful");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (error) {
			toast.error("Login Failed. Please check your email or password.");

			console.error("Login error:", error);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center">
			<div className="max-w-xs w-full mx-auto px-12 py-8 bg-[#FFFFFF] rounded-xl">
				<h1 className="formTitle">Login Page</h1>

				<form action="" className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="" className="formLabel">
							Email
						</label>
						<input
							{...register("email", { required: "Please enter a valid email" })}
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
								required: "Please enter your password.",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters long",
								},
							})}
							type="password"
							autoComplete="off"
							className="formInput"
						/>
						<p className="errorText">{errors.password?.message}</p>
					</div>

					<div className="space-y-2">
						<button type="submit" className="formButton">
							Login
						</button>
						<Toaster />
						<div>
							<Link to="/signup">
								<p className="formText">Create an account</p>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
