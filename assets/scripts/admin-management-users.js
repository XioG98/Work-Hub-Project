let users = [];
let editIndex = null;
let deleteIndex = null;
let confirmDeleteModal = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el modal de confirmación
    confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    
    // Configurar el botón de confirmación
    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
        if (deleteIndex !== null) {
            users.splice(deleteIndex, 1);
            updateTable();
            confirmDeleteModal.hide();
        }
    });
    
    // Cargar datos de ejemplo
    loadSampleData();
});

function loadSampleData() {
    // Datos de ejemplo
    users = [
        ];
    updateTable();
}

function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy}`;
}

function openRegisterModal(index = null) {
    document.getElementById('userForm').reset();
    editIndex = index;
    if (index !== null) {
        const u = users[index];
        document.getElementById('userName').value = u.name;
        document.getElementById('userEmail').value = u.email;
        document.getElementById('userTipo').value = u.tipo;
        document.getElementById('userEstado').value = u.estado;
        document.getElementById('userModalLabel').innerText = 'Editar Usuario';
    } else {
        document.getElementById('userModalLabel').innerText = 'Registrar Usuario';
    }
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function saveUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const tipo = document.getElementById('userTipo').value;
    const estado = document.getElementById('userEstado').value;
    const fecha = getTodayDate();

    if (editIndex !== null) {
        users[editIndex] = { ...users[editIndex], name, email, tipo, estado };
    } else {
        const id = 'USR-' + (users.length + 1);
        users.push({ id, name, email, tipo, estado, fecha });
    }
    updateTable();
    bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
}

function confirmDelete(index) {
    deleteIndex = index;
    confirmDeleteModal.show();
}

function updateTable() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';
    users.forEach((user, i) => {
        tbody.innerHTML += `
            <tr>
                <td><input type="checkbox"></td>
                <td>${user.id}</td>
                <td>${user.name || ''}</td>
                <td>${user.email || ''}</td>
                <td><span class="badge bg-light text-dark border">${user.tipo}</span></td>
                <td><span class="${user.estado === 'Activo' ? 'status-activo' : 'status-inactivo'}">${user.estado}</span></td>
                <td>${user.fecha}</td>
                <td>
                    <div class="dropdown action-dropdown">
                        <button class="btn btn-light border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">⋮</button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-eye"></i> Ver perfil</a></li>
                            <li><a class="dropdown-item" href="#" onclick="openRegisterModal(${i})"><i class="bi bi-pencil"></i> Editar</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="confirmDelete(${i})"><i class="bi bi-trash"></i> Eliminar</a></li>
                        </ul>
                    </div>
                </td>
            </tr>`;
    });
}

function filterUsers() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#userTableBody tr');
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(term) ? '' : 'none';
    });
}

function toggleAll(source) {
    const checkboxes = document.querySelectorAll('#userTableBody input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = source.checked);
}
