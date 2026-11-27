

const styles = ["Terror", "Roguelike", "Ação", "História", "FPS", "RPG", "Puzzle"];

const questions = [
    {
        question: "Qual momento de um jogo você nunca esqueceu?",
        type: "style",
        options: [
            { text: "Entrar numa casa sombria com música tensa", points: { Terror: 3 } },
            { text: "Roubar um item valioso e recomeçar com builds diferentes", points: { Roguelike: 3 } },
            { text: "Derrotar um chefe com um combo estiloso", points: { Ação: 3 } },
            { text: "Uma cena que me fez sentir uma história profunda", points: { História: 3 } }
        ]
    },
    {
        question: "O que te prende mais numa sessão de jogo?",
        type: "style",
        options: [
            { text: "Atmosfera opressiva e sustos", points: { Terror: 3 } },
            { text: "Testar novas estratégias e aprender com falhas", points: { Roguelike: 3 } },
            { text: "Combates fluidos e sequências intensas", points: { Ação: 3 } },
            { text: "Escolhas narrativas e personagens marcantes", points: { História: 3 } }
        ]
    },
    {
        question: "Em que tipo de mundo você mais gosta de se perder?",
        type: "style",
        options: [
            { text: "Mundos sombrios cheios de criaturas", points: { Terror: 2, RPG: 1 } },
            { text: "Mapas gerados onde cada partida é diferente", points: { Roguelike: 3 } },
            { text: "Cenários pensados para combates frenéticos", points: { Ação: 3 } },
            { text: "Ambientes ricos que contam uma história", points: { História: 3 } }
        ]
    },
    {
        question: "Como você prefere enfrentar desafios?",
        type: "style",
        options: [
            { text: "Com furtividade e tensão", points: { Terror: 2, Puzzle: 1 } },
            { text: "Com tentativa e erro, aprendendo a cada run", points: { Roguelike: 3 } },
            { text: "Dominando combos e habilidades", points: { Ação: 3 } },
            { text: "Seguindo a narrativa até o fim", points: { História: 3 } }
        ]
    },
    {
        question: "Que memória de jogatina te traz mais nostalgia?",
        type: "style",
        options: [
            { text: "Uma cena arrepiante na escuridão", points: { Terror: 3 } },
            { text: "Reiniciar para tentar uma build diferente", points: { Roguelike: 2, RPG: 1 } },
            { text: "Girar combos até derrotar inimigos com estilo", points: { Ação: 3 } },
            { text: "Uma história que te prendeu por horas", points: { História: 3 } }
        ]
    },
    {
        question: "Que mecânica te diverte mais?",
        type: "style",
        options: [
            { text: "Criar estratégias e builds", points: { RPG: 3 } },
            { text: "Resolver enigmas que exigem lógica", points: { Puzzle: 3 } },
            { text: "Tiro em primeira pessoa com mira precisa", points: { FPS: 3 } },
            { text: "Sistema de mortes que te faz tentar novamente", points: { Roguelike: 2, Ação: 1 } }
        ]
    },
    {
        question: "Como passa o tempo quando joga?",
        type: "style",
        options: [
            { text: "Segura a respiração em salas escuras", points: { Terror: 3 } },
            { text: "Explora itens e combinações", points: { Roguelike: 2, RPG: 1 } },
            { text: "Melhora minhas habilidades nos combates", points: { Ação: 3 } },
            { text: "Resolve quebra-cabeças no caminho", points: { Puzzle: 3 } }
        ]
    },
    {
        question: "Que tipo de final mais te marca?",
        type: "style",
        options: [
            { text: "Um final perturbador que fica na cabeça", points: { Terror: 3 } },
            { text: "Um final que depende das suas escolhas", points: { RPG: 2, História: 1 } },
            { text: "Vitória celebrada após lutas épicas", points: { Ação: 3 } },
            { text: "Satisfação por ter resolvido todos os enigmas", points: { Puzzle: 3 } }
        ]
    },
    {
        question: "Qual descrição combina com suas sessões favoritas?",
        type: "style",
        options: [
            { text: "Silêncio tenso antes de algo terrível", points: { Terror: 3 } },
            { text: "Cada tentativa é uma nova história", points: { Roguelike: 3 } },
            { text: "Combates coreografados e espetáculo", points: { Ação: 3 } },
            { text: "Histórias e personagens complexos", points: { História: 3 } }
        ]
    },
    {
        question: "O que te faz voltar a um jogo?",
        type: "style",
        options: [
            { text: "Atmosfera e sustos que me prendem", points: { Terror: 2, História: 1 } },
            { text: "Sistema de runs que nunca fica igual", points: { Roguelike: 3 } },
            { text: "Melhorar minha performance em combates", points: { Ação: 3 } },
            { text: "Construir personagens e evoluir", points: { RPG: 3 } }
        ]
    },
    {
        question: "Como você descreve seu ritmo de jogo ideal?",
        type: "ritmo",
        options: [
            { text: "Ciclos calmos, explorar sem pressa", ritmo: 0 },
            { text: "Uma mistura, com momentos tensos", ritmo: 33 },
            { text: "Gosto de aceleração e ação constante", ritmo: 66 },
            { text: "Frenético, sem parar", ritmo: 100 }
        ]
    },
    {
        question: "O quanto a narrativa importa pra você?",
        type: "foco",
        options: [
            { text: "Só jogabilidade, história pouco importa", foco: 0 },
            { text: "Gosto de um pouco de história", foco: 33 },
            { text: "História importante", foco: 66 },
            { text: "Somente narrativa, história é essencial", foco: 100 }
        ]
    }
];

let current = 0;
let stylePoints = {};
let ritmo = 0;
let foco = 0;
let maxPerStyle = {};
const styleKeyMap = {
    'Terror': 'terror',
    'Roguelike': 'roguelike',
    'Ação': 'acao',
    'História': 'historia',
    'FPS': 'fps',
    'RPG': 'rpg',
    'Puzzle': 'puzzle'
};

function iniciarQuiz() {
    if (!sessionStorage.ID_USUARIO) {
        alert('Você precisa estar logado para fazer o quiz. Será redirecionado para o login.');
        window.location.href = 'login.html';
        return;
    }

    styles.forEach(s => { stylePoints[s] = 0; maxPerStyle[s] = 0; });

    questions.forEach(q => {
        if (q.type !== 'style') return;
        styles.forEach(s => {
            let maior = 0;
            q.options.forEach(opt => {
                if (opt.points && opt.points[s]) {
                    if (opt.points[s] > maior) maior = opt.points[s];
                }
            });
            maxPerStyle[s] += maior;
        });
    });

    renderQuestion();
}

function renderQuestion() {
    const q = questions[current];
    document.getElementById('progress').textContent = `Pergunta ${current + 1} de ${questions.length}`;
    document.getElementById('question').textContent = q.question;

    const form = document.getElementById('optionsForm');
    form.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const id = `opt${idx}`;
        const label = document.createElement('label');
        label.className = 'option-label';
        label.htmlFor = id;

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.id = id;
        input.value = idx;

        const span = document.createElement('span');
        span.textContent = opt.text;

        label.appendChild(input);
        label.appendChild(span);
        form.appendChild(label);
    });
}

function proximaPergunta(e) {
    e.preventDefault();
    const seleção = document.querySelector('input[name="option"]:checked');
    if (!seleção) {
        alert('Por favor, escolha uma alternativa antes de prosseguir.');
        return;
    }

    const q = questions[current];
    const escolha = q.options[Number(seleção.value)];

    if (q.type === 'style') {
        if (escolha.points) {
            Object.keys(escolha.points).forEach(s => {
                if (!stylePoints[s]) stylePoints[s] = 0;
                stylePoints[s] += escolha.points[s];
            });
        }
    } else if (q.type === 'ritmo') {
        ritmo = escolha.ritmo || 0;
    } else if (q.type === 'foco') {
        foco = escolha.foco || 0;
    }

    current++;
    if (current >= questions.length) {
        finalizarQuiz();
    } else {
        renderQuestion();
    }
}

function finalizarQuiz() {
    const resultados = {};
    styles.forEach(s => {
        const obtido = stylePoints[s] || 0;
        const max = maxPerStyle[s] || 0;
        const key = styleKeyMap[s];
        resultados[key] = max > 0 ? Math.round((obtido / max) * 100) : 0;
    });

    const payload = {
        idUsuario: sessionStorage.ID_USUARIO,
        terror: resultados['terror'],
        roguelike: resultados['roguelike'],
        acao: resultados['acao'],
        historia: resultados['historia'],
        fps: resultados['fps'],
        rpg: resultados['rpg'],
        puzzle: resultados['puzzle'],
        ritmo: Math.round(ritmo),
        foco: Math.round(foco)
    };

    fetch('/quiz/salvar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(res => {
        if (res.ok) {
            window.location.href = 'dashboard.html';
        } else {
            res.text().then(txt => { alert('Erro ao salvar resultado: ' + txt); });
        }
    }).catch(err => {
        console.error(err);
        alert('Erro na comunicação com o servidor. Resultado não salvo.');
    });
}
