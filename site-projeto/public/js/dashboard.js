// dashboard.js
// Busca o resultado do usuário e monta KPIs, gráfico e recomendações

const styleDisplay = ['Terror','Roguelike','Ação','História','FPS','RPG','Puzzle'];
const styleKeyMap = {
    'Terror':'terror', 'Roguelike':'roguelike', 'Ação':'acao', 'História':'historia', 'FPS':'fps', 'RPG':'rpg', 'Puzzle':'puzzle'
};

async function carregarDashboard() {
    const id = sessionStorage.ID_USUARIO;
    if (!id) {
        alert('Você precisa estar logado para ver sua dashboard.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`/quiz/resultado/${id}`);
        if (res.status === 204) {
            mostrarSemResultado();
            return;
        }
        if (!res.ok) {
            const txt = await res.text();
            console.error('Erro ao buscar resultado:', txt);
            mostrarSemResultado();
            return;
        }

        const json = await res.json();
        montarDashboard(json);

    } catch (err) {
        console.error(err);
        mostrarSemResultado();
    }
}

function mostrarSemResultado() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div style="padding:24px;background:rgba(255,255,255,0.03);border-radius:8px;">
            <h2>Ainda não há resultado</h2>
            <p>Parece que você ainda não fez o quiz. <a href="quiz.html">Clique aqui para descobrir seu tipo</a> — é rápido e divertido.</p>
        </div>
    `;
}

function montarDashboard(resultado) {
    // monta array ordenado de estilos
    const estilos = styleDisplay.map(name => ({ name, value: Number(resultado[ styleKeyMap[name] ] || 0) }));
    estilos.sort((a,b) => b.value - a.value);

    // KPIs
    const principal = estilos[0];
    const segundo = estilos[1];
    document.getElementById('principal-nome').textContent = `${principal.name} — ${principal.value}%`;
    document.getElementById('principal-frase').textContent = frasePorEstilo(principal.name);
    document.getElementById('segundo-nome').textContent = `${segundo.name} — ${segundo.value}%`;
    document.getElementById('segundo-frase').textContent = frasePorEstilo(segundo.name);

    // lista de estilos
    const ul = document.getElementById('lista-estilos');
    ul.innerHTML = '';
    styleDisplay.forEach(s => { const li = document.createElement('li'); li.textContent = s; ul.appendChild(li); });

    // Ritmo e foco
    const ritmo = Number(resultado.ritmo || 0);
    const foco = Number(resultado.foco || 0);
    document.getElementById('ritmo-bar').style.width = ritmo + '%';
    document.getElementById('ritmo-valor').textContent = ritmo;
    document.getElementById('foco-bar').style.width = foco + '%';
    document.getElementById('foco-valor').textContent = foco;

    // Gráfico
    const labels = estilos.map(e => e.name);
    const data = estilos.map(e => e.value);

    const colors = estilos.map((e, i) => i === 0 ? 'rgba(0,0,0,0.95)' : 'rgba(130,130,130,0.5)');

    const ctx = document.getElementById('chartCompatibilidade').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{ label: 'Compatibilidade (%)', data, backgroundColor: colors, borderColor: colors, borderWidth: 1, maxBarThickness: 20, barPercentage: 0.8, categoryPercentage: 0.8 }]
        },
        options: {
            indexAxis: 'y',
            scales: { x: { min: 0, max: 100 } },
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // Recomendações (4 cards: 2 do principal, 1 do segundo, 1 do terceiro)
    const reco = recomendacoesBasicas();
    const escolhidos = [];
    const prim = estilos[0].name;
    const seg = estilos[1].name;
    const ter = estilos[2].name;

    // pega até 2 do principal
    (reco[prim] || []).slice(0,2).forEach(r => escolhidos.push({ estilo: prim, jogo: r.titulo, desc: r.desc }));
    // 1 do segundo
    (reco[seg] || []).slice(0,1).forEach(r => escolhidos.push({ estilo: seg, jogo: r.titulo, desc: r.desc }));
    // 1 do terceiro
    (reco[ter] || []).slice(0,1).forEach(r => escolhidos.push({ estilo: ter, jogo: r.titulo, desc: r.desc }));

    const grid = document.getElementById('recoGrid');
    grid.innerHTML = '';
    escolhidos.forEach(item => {
        const div = document.createElement('div');
        div.className = 'reco-item';
        div.innerHTML = `
            <div class="reco-tag">${item.estilo}</div>
            <div class="reco-title">${item.jogo}</div>
            <div class="reco-desc">${item.desc}</div>
        `;
        grid.appendChild(div);
    });
}

function frasePorEstilo(estilo) {
    const frases = {
        'Terror': 'Você aprecia atmosferas que prendem a respiração e momentos intensos.',
        'Roguelike': 'Gosta de desafios que mudam a cada tentativa e recompensam aprendizado.',
        'Ação': 'Preferência por combates dinâmicos e espetáculo em gameplay.',
        'História': 'A narrativa e os personagens são o que mais te marcam.',
        'FPS': 'A precisão e o tiroteio em primeira pessoa te empolgam.',
        'RPG': 'Construir e evoluir personagens é o que te prende.',
        'Puzzle': 'Resolver enigmas e desafios lógicos é sua praia.'
    };
    return frases[estilo] || '';
}

function recomendacoesBasicas() {
    // Recomendações iniciais. Mostro aqui para você aprovar as escolhas dos estilos que não foram especificados.
    return {
        'Terror': [ { titulo: 'Resident Evil 4', desc: 'Survival clássico, atmosfera tensa.' }, { titulo: 'Silent Hill 2', desc: 'Terror psicológico e narrativa perturbadora.' } ],
        'Roguelike': [ { titulo: 'Hades', desc: 'Runs intensas com progressão persistente.' }, { titulo: 'The Binding of Isaac', desc: 'Action roguelike com grandes variações.' } ],
        'Ação': [ { titulo: 'Devil May Cry 5', desc: 'Combates estilizados e frenéticos.' } ],
        'História': [ { titulo: 'Life Is Strange', desc: 'Narrativa episódica e escolhas emocionais.' }, { titulo: 'To the Moon', desc: 'Foco em história e emoção.' } ],
        'FPS': [ { titulo: 'Half-Life 2', desc: 'Clássico de narrativa e ação em primeira pessoa.' }, { titulo: 'DOOM (2016)', desc: 'Ação acelerada e intenso ritmo.' } ],
        'RPG': [ { titulo: 'The Witcher 3', desc: 'Mundo vasto e narrativa profunda.' }, { titulo: 'Skyrim', desc: 'Exploração e construção de personagem.' } ],
        'Puzzle': [ { titulo: 'Portal 2', desc: 'Quebra-cabeças inteligentes com humor.' }, { titulo: 'Braid', desc: 'Puzzles com design artístico e narrativo.' } ]
    };
}
