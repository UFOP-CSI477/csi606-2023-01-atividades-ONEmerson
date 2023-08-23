const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0001',
    database: 'agendamento_tutorias'
});

const horarios = [];

// Gerar horários de segunda a sexta-feira das 8h às 11h com intervalos de 30 minutos
const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const horaInicial = 8;
const horaFinal = 11;
const intervalo = 30;

for (let dia = 0; dia < diasSemana.length; dia++) {
    let hora = horaInicial;
    let minutos = 0;

    while (hora < horaFinal) {
        horarios.push({
            dia_semana: diasSemana[dia],
            horario: `${hora}:${minutos.toString().padStart(2, '0')}`,
            disponivel: true
        });

        minutos += intervalo;

        if (minutos >= 60) {
            minutos -= 60;
            hora++;
        }

        if (hora === horaFinal) {
            break;
        }
    }

    hora = horaInicial;
}

// Inserir os horários no banco de dados
db.promise().query('INSERT INTO Horarios (dia_semana, horario, disponivel) VALUES ?', [horarios.map(horario => [horario.dia_semana, horario.horario, horario.disponivel])])
    .then(() => {
        console.log('Horários inseridos no banco de dados.');
    })
    .catch(error => {
        console.error('Erro ao inserir horários no banco de dados:', error);
    });
