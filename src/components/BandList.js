import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
	const [bands, setBands] = useState([]);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on("current-bands", (bands) => {
			setBands(bands);
		});
		return () => socket.off("current-bands");
	}, [socket]);

	const cambioNombre = (event, id) => {
		const newName = event.target.value;

		setBands((bands) =>
			bands.map((band) => {
				if (band.id === id) {
					band.name = newName;
				}
				return band;
			})
		);
	};

	const onPerdioFoco = (id, name) => {
		socket.emit("cambiar-nombre", {
			id,
			name,
		});
	};
	const votar = (id) => {
		socket.emit("votar-banda", id);
	};
	const borrarBanda = (id) => {
		socket.emit("borrar-banda", id);
	};
	const createRow = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className="btn btn-primary" onClick={() => votar(band.id)}>
						+1
					</button>
				</td>
				<td>
					<input
						type="text"
						className="form-control"
						value={band.name}
						name="name"
						onChange={(e) => cambioNombre(e, band.id)}
						onBlur={() => onPerdioFoco(band.id, band.name)}
					/>
				</td>
				<td>
					<h3>{band.votes}</h3>
				</td>
				<td>
					<button
						className="btn btn-danger"
						onClick={() => borrarBanda(band.id)}>
						Borrar
					</button>
				</td>
			</tr>
		));
	};
	return (
		<>
			<table className="table table-stripped">
				<thead>
					<tr>
						<th></th>
						<th>Nombres</th>
						<th>Votos</th>
						<th>Borrar</th>
					</tr>
				</thead>
				<tbody>{createRow()}</tbody>
			</table>
		</>
	);
};
