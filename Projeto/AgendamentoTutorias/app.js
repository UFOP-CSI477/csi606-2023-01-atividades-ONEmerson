const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0001',
    database: 'agendamento_tutorias'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão ao banco de dados estabelecida.');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('AgendamentoTutorias/public/index.html');
});


app.get('/api/agendamentos', (req, res) => {
    const query = 'SELECT * FROM horarios';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            res.status(500).json({ error: 'Erro ao buscar agendamentos' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/agendamento/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Agendamentos WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamento:', err);
            res.status(500).json({ error: 'Erro ao buscar agendamento' });
        } else {
            res.json(results);
        }
    });
});


app.post('/api/agendamentos', async (req, res) => {
    const { horario_id, nome, matricula, email, telefone, senha } = req.body;

    let aluno_id;
    const alunoQuery = 'SELECT id FROM Alunos WHERE matricula = ?';
    const [alunoResults] = await db.promise().query(alunoQuery, [matricula]);

    if (alunoResults.length > 0) {
        aluno_id = alunoResults[0].id;
    } else {

        const alunoInsertQuery = 'INSERT INTO Alunos (nome, matricula, email, telefone, senha) VALUES (?, ?, ?, ?, ?)';
        const [alunoInsertResult] = await db.promise().query(alunoInsertQuery, [nome, matricula, email, telefone, senha]);
        aluno_id = alunoInsertResult.insertId;
    }

    const agendamentoQuery = 'INSERT INTO Agendamentos (horario_id, aluno_id) VALUES (?, ?)';
    db.query(agendamentoQuery, [horario_id, aluno_id], (err, result) => {
        if (err) {
            console.error('Erro ao criar agendamento:', err);
            res.status(500).json({ error: 'Erro ao criar agendamento' });
        } else {
            const updateHorarioQuery = 'UPDATE Horarios SET disponivel = ? WHERE id = ?';
            db.query(updateHorarioQuery, [0, horario_id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Erro ao atualizar disponibilidade do horário:', updateErr);
                } else {
                    console.log('Disponibilidade do horário atualizada com sucesso');
                }
            });
            
            res.status(201).json({ message: 'Agendamento criado com sucesso' });
        }
    });
});

app.put('/api/agendamentos/:id', async (req, res) => {
    const agendamentoId = req.params.id;
    const { senha } = req.body;

    try {
        const agendamentoQuery = 'SELECT * FROM Agendamentos WHERE id = ?';
        const [agendamentoResults] = await db.promise().query(agendamentoQuery, [agendamentoId]);

        if (agendamentoResults.length === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        const alunoQuery = 'SELECT senha FROM Alunos WHERE id = ?';
        const [alunoResults] = await db.promise().query(alunoQuery, [agendamentoResults[0].aluno_id]);

        if (alunoResults.length === 0 || alunoResults[0].senha !== senha) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const { horario_id } = agendamentoResults[0];
        const updateQuery = 'UPDATE Agendamentos SET horario_id = ? WHERE id = ?';
        await db.promise().query(updateQuery, [horario_id, agendamentoId]);

        res.json({ message: 'Agendamento atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
});

app.put('/api/horario/:id', async (req, res) => {
    const horarioId = req.params.id;

    try {
        const updateQuery = 'UPDATE Horarios SET disponivel = 1 WHERE id = ?'
        await db.promise().query(updateQuery, [horarioId]);

        res.json({ message: 'Horario excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao altear hoario:', error);
        res.status(500).json({ error: 'Erro ao alterar hoario' });
    }
});

app.get('/api/aluno/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT nome FROM Alunos WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar aluno:', err);
            res.status(500).json({ error: 'Erro ao buscar aluno' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.json({ nome: 'Aluno não encontrado' });
            }
        }
    });
});

app.get('/api/alunos/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Alunos WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar aluno:', err);
            res.status(500).json({ error: 'Erro ao buscar aluno' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Aluno não encontrado' });
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});