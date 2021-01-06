import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
	const [valor, setValor] = useState("");

	const { socket } = useContext(SocketContext);

	const onSubmit = (e) => {
		e.preventDefault();

		if (valor.trim().length > 0) {
			socket.emit("nueva-banda", { valor });

			setValor("");
		}
	};
	return (
		<>
			<h3>Agregar Banda</h3>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					className="form-control"
					placeholder="Nuevo nombre"
					value={valor}
					onChange={(e) => setValor(e.target.value)}
				/>
			</form>
		</>
	);
};
