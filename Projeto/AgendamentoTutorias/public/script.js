const editModal = document.getElementById('editModal');
const confirmEditButton = document.getElementById('confirmEditButton');
const senhaEditField = document.getElementById('senhaEdit');

const deleteModal = document.getElementById('deleteModal');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');
const senhaDeleteField = document.getElementById('senhaDelete');


function populateHorariosTable(horarios) {
    const tableBody = document.querySelector('#horarios tbody');

    horarios.forEach(horario => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = horario.dia_semana;
        row.insertCell().textContent = horario.horario;

        const statusCell = row.insertCell();
        statusCell.textContent = horario.disponivel ? 'Disponível' : 'Indisponível';

        if (!horario.disponivel) {
            statusCell.classList.add('indisponivel');
            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `

                <button class="excluir" data-horario-id="${horario.id}" data-horario='${JSON.stringify(horario)}'>Excluir</button>
            `;
            
        } else {
            statusCell.classList.add('disponivel');
        }

        const agendamentoCell = row.insertCell();
        agendamentoCell.textContent = horario.agendamento ? horario.agendamento.nome : '';

        row.addEventListener('click', () => {
            const selectedRow = tableBody.querySelector('.selecionado');
            if (selectedRow) {
                selectedRow.classList.remove('selecionado');
            }
            row.classList.add('selecionado');

            const horarioId = horario.id;
            document.querySelector('#horario_id').value = horarioId; 
        });
    });
}



function populateHorariosSelect(horarios) {
    const select = document.getElementById('horario_id');
    select.innerHTML = '';

    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario.id;
        option.textContent = `${horario.dia_semana} - ${horario.horario}`;
        select.appendChild(option);
    });
}


async function fetchHorarios() {
    try {
        const response = await fetch('/api/agendamentos');
        const data = await response.json();

        console.log('dados recebidos do servidor:',data);
        populateHorariosTable(data);
        populateHorariosSelect(data.filter(horario => horario.disponivel));
    } catch (error) {
        console.error('Erro ao buscar horários:', error);
    }
}

// Função para agendar um novo horário
async function agendarHorario(horarioId, nome, matricula, email, telefone, senha) {
    try {
        const response = await fetch('/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ horario_id: horarioId, nome, matricula, email, telefone, senha })
        });

        const data = await response.json();
        await fetchHorarios();

        window.alert('Agendamento efetuado com sucesso!');

        document.querySelector('#nome').value = '';
        document.querySelector('#matricula').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#telefone').value = '';
        document.querySelector('#senha').value = '';
    } catch (error) {
        console.error('Erro ao agendar horário:', error);
    }
}



async function editarAgendamento(horarioId, senha) {
    try {
        const response = await fetch(`/api/agendamentos/${horarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ senha })
        });

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Erro ao editar agendamento:', error);
    }
}

async function excluirAgendamento(horarioId) {
    try {
        const response = await fetch(`/api/horario/${horarioId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Erro ao editar horario:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchHorarios();

    const tableBody = document.querySelector('#horarios tbody');
    tableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('excluir')) {
            const horario = JSON.parse(event.target.getAttribute('data-horario'));
            console.log(horario);
            await excluirAgendamento(horario.id);
            location.reload();
        }
    });
});

function showEditModal(horario) {
    editModal.style.display = 'block';

    confirmEditButton.onclick = async () => {
        const senha = senhaEditField.value;
        if (senha) {
            await editarAgendamento(horario.id, senha);
            hideModal(editModal);
        }
    };
}

function showDeleteModal(horario) {
    deleteModal.style.display = 'block';

    confirmDeleteButton.onclick = async () => {
        const senha = senhaDeleteField.value;
        if (senha) {
            await excluirAgendamento(horario.id, senha);
            hideModal(deleteModal);
        }
    };
}


function hideModal(modal) {
    modal.style.display = 'none';
    senhaEditField.value = '';
    senhaDeleteField.value = '';
}

const formAgendamento = document.getElementById('form-agendamento');

formAgendamento.addEventListener('submit', async (event) => {
    event.preventDefault();

    const horarioId = document.querySelector('#horario_id').value;
    const nome = document.querySelector('#nome').value;
    const matricula = document.querySelector('#matricula').value;
    const email = document.querySelector('#email').value;
    const telefone = document.querySelector('#telefone').value;
    const senha = document.querySelector('#senha').value;

    await agendarHorario(horarioId, nome, matricula, email, telefone, senha);


const tableBody = document.querySelector('#horarios tbody');
tableBody.innerHTML = '';

await fetchHorarios();

});