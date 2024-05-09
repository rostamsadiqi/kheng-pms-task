import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Register />} />
				<Route path="/posts/:postId" element={<ViewPost />} />
			</Routes>
		</>
	);
}

export default App;
