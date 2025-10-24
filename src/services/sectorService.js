export const getSectores = async (token) => {
  const res = await fetch('http://172.16.14.87:5144/api/Sector', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const deleteSector = async (id, token) => {
  const res = await fetch(`http://172.16.14.87:5144/api/Sector/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 409) {
    const data = await res.json();
    throw new Error(data.mensaje);
  }

  if (!res.ok) throw new Error(`Error al eliminar sector: ${res.status}`);
};