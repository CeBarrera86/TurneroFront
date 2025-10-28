import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import NuevoButton from '../../components/botones/NuevoButton';
import TablaListado from '../../components/tablas/TablaListado';
import ConfirmDialog from '../../components/dialogos/ConfirmDialog';
import ErrorDialog from '../../components/dialogos/ErrorDialog';
import { getEstados, deleteEstado } from '../../services/estadoService';

const Estados = () => {
	const { setTitulo } = useOutletContext();
	const [estados, setEstados] = useState([]);
	const [errorDialog, setErrorDialog] = useState('');
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [estadoAEliminar, setEstadoAEliminar] = useState(null);
	const nuevoEstadoRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		setTitulo('Estados');
		const token = sessionStorage.getItem('token');
		getEstados(token).then(setEstados).catch((err) => console.error('Error al cargar estados:', err));
	}, [setTitulo]);

	const handleEdit = (id) => { navigate(`/estados/editar/${id}`); };

	const handleDeleteClick = (id) => {
		setEstadoAEliminar(id);
		setConfirmDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		const token = sessionStorage.getItem('token');
		try {
			await deleteEstado(estadoAEliminar, token);
			setEstados((prev) => prev.filter((e) => e.id !== estadoAEliminar));
		} catch (err) {
			setErrorDialog(err.message);
		} finally {
			setConfirmDialogOpen(false);
			setEstadoAEliminar(null);
		}
	};

	const columns = [
		{ label: 'ID', key: 'id' },
		{ label: 'Letra', key: 'letra' },
		{ label: 'Descripción', key: 'descripcion' }
	];

	return (
		<Container>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ width: '100%', maxWidth: 500 }}>
					<Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
						<Grid>
							<Typography variant="h5">Listado</Typography>
						</Grid>
						<Grid>
							<NuevoButton ref={nuevoEstadoRef} label="Nuevo Estado" to="/estados/crear" />
						</Grid>
					</Grid>

					<TablaListado
						columns={columns}
						rows={estados}
						onEdit={handleEdit}
						onDelete={handleDeleteClick}
					/>
				</Box>
			</Box>

			<ConfirmDialog open={confirmDialogOpen} title="¿Eliminar estado?" message="Esta acción no se puede deshacer." onConfirm={handleConfirmDelete} onCancel={() => {
				setConfirmDialogOpen(false);
				setTimeout(() => { nuevoEstadoRef.current?.focus(); }, 0);
			}} />
			<ErrorDialog open={!!errorDialog} mensaje={errorDialog} onClose={() => setErrorDialog('')} />
		</Container>
	);
};

export default Estados;