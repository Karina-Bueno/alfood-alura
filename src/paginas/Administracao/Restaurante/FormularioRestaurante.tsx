import { AppBar, Box, Button, Container, Link, Paper, TableContainer, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";

const FormularioRestaurante = () => {

	const parametros = useParams()

	useEffect(() => {
		if (parametros.id) {
			axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}`)
				.then(resposta => setNomeRestaurante(resposta.data.nome))
		}
	}, [parametros])

	const [nomeRestaurante, setNomeRestaurante] = useState('')

	const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault()

		if (parametros.id) {
			http.put(`restaurantes/${parametros.id}/`, {
				nome: nomeRestaurante
			})
				.then(() => {
					alert("Restaurante atualizado com sucesso!")
				})
		} else {
			http.post('restaurantes/', {
				nome: nomeRestaurante
			})
				.then(() => {
					alert("Restaurante cadastrado com sucesso!")
				})
		}

	} 

	return (
		<>
			{/* conteudo da página */}
			< Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
				<Typography component="h1" variant="h6">Formulário de Restaurante</Typography>
				<Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
					<TextField
						value={nomeRestaurante}
						onChange={evento => setNomeRestaurante(evento.target.value)}
						label="Nome do Restaurante"
						variant="standard"
						fullWidth
						required
					/>
					<Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
				</Box>
			</Box >
		</>
	)
}

export default FormularioRestaurante;