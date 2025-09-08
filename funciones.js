document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registro-form');
    const loginForm = document.getElementById('login-form');
    const mostrarLogin = document.getElementById('mostrar-login');
    const mostrarRegistro = document.getElementById('mostrar-registro');

    mostrarLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registroForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginForm.style.flexDirection = 'column';
        loginForm.style.gap = '1rem';
    });

    mostrarRegistro.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registroForm.style.display = 'flex';
        registroForm.style.flexDirection = 'column';
        registroForm.style.gap = '1rem';
    });

   
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username === '' || password === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

    
        localStorage.setItem('usuario', username);
        localStorage.setItem('contraseña', password);

        alert('¡Registro exitoso!');
        registroForm.reset();
    });

   
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const usuarioGuardado = localStorage.getItem('usuario');
        const contraseñaGuardada = localStorage.getItem('contraseña');

        if (username === usuarioGuardado && password === contraseñaGuardada) {
            alert('¡Inicio de sesión exitoso!');
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });
});
//boton tema oscuro//
const btnTema = document.getElementById('cambiar-tema');
let oscuro = false;
btnTema.addEventListener('click', (e) => {
    e.preventDefault(); // evita cualquier submit accidental
    document.body.classList.toggle('tema-oscuro');
    oscuro = !oscuro;
    btnTema.textContent = oscuro ? 'Cambiar a tema claro' : 'Cambiar tema';
});
        //logica del quiz(falto diseño, añadelo porfi :,v)//
        function entrarAlQuiz(usuario) {
    if (typeof cargarUsuario === 'function') {
        cargarUsuario(usuario);
    } else {
        if (typeof estado !== 'undefined' && estado !== null) {
            estado.usuario = usuario;
            estado.puntos = parseInt(localStorage.getItem(`quiz_${usuario}_puntos`) || '0', 10);
            estado.recompensasDesbloqueadas = JSON.parse(localStorage.getItem(`quiz_${usuario}_rewards`) || '[]');
        }
    }

    const registroForm = document.getElementById('registro-form');
    const loginForm = document.getElementById('login-form');
    const quizContainer = document.getElementById('quiz-container');
    if (registroForm) registroForm.style.display = 'none';
    if (loginForm) loginForm.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'block';

    // OCULTAR el botón de invitado al entrar al quiz
    const btnInvitado = document.getElementById('jugar-invitado');
    if (btnInvitado) btnInvitado.style.display = "none";

    const bienvenida = document.getElementById('bienvenida-usuario');
    if (bienvenida) bienvenida.textContent = `¡Bienvenido, ${usuario}!`;

    // Mostrar puntos totales guardados
    let puntosTotales = parseInt(localStorage.getItem(`quiz_${usuario}_puntos`) || '0', 10);
    document.getElementById('puntos-totales').textContent = puntosTotales;

    if (typeof actualizarStatsUI === 'function') actualizarStatsUI();
}
   document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');
    if (registroForm && !registroForm.dataset._quizHandler) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = (document.getElementById('username')?.value || '').trim() || 'Usuario';
            entrarAlQuiz(usuario);
        });
        registroForm.dataset._quizHandler = '1';
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm && !loginForm.dataset._quizHandler) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
                        const usuario = (document.getElementById('login-username')?.value || '').trim() || 'Usuario';
            entrarAlQuiz(usuario);
        });
        loginForm.dataset._quizHandler = '1';
    }
});

// 1. Banco de preguntas por dificultad y tema (7 por cada una)
const preguntas = {
    cultura: {
        easy: [
            {
                pregunta: "¿Cuál es el océano más grande del mundo?",
                opciones: ["Atlántico", "Índico", "Pacífico", "Ártico"],
                respuesta: 2
            },
            {
                pregunta: "¿Cuál es el país más grande del mundo?",
                opciones: ["Canadá", "China", "Estados Unidos", "Rusia"],
                respuesta: 3
            },
            {
                pregunta: "¿Cuál es el animal terrestre más grande?",
                opciones: ["Elefante africano", "Jirafa", "Rinoceronte", "Hipopótamo"],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es el idioma más hablado en el mundo?",
                opciones: ["Inglés", "Chino mandarín", "Español", "Hindi"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el continente más pequeño?",
                opciones: ["Europa", "Oceanía", "Antártida", "África"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es la capital de Francia?",
                opciones: ["Roma", "Madrid", "París", "Berlín"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué instrumento tiene teclas blancas y negras?",
                opciones: ["Violín", "Piano", "Guitarra", "Flauta"],
                respuesta: 1
            }
        ],
        medium: [
            {
                pregunta: "¿Quién pintó la Mona Lisa?",
                opciones: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el río más largo del mundo?",
                opciones: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
                respuesta: 1
            },
            {
                pregunta: "¿En qué país se encuentra la Torre de Pisa?",
                opciones: ["España", "Italia", "Francia", "Grecia"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el metal más ligero?",
                opciones: ["Aluminio", "Litio", "Hierro", "Plomo"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué país es conocido como la tierra del sol naciente?",
                opciones: ["China", "Japón", "Corea", "Tailandia"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el desierto más grande del mundo?",
                opciones: ["Sahara", "Gobi", "Antártida", "Kalahari"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué gas es esencial para la respiración humana?",
                opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Helio"],
                respuesta: 0
            }
        ],
        hard: [
            {
                pregunta: "¿En qué año cayó el Imperio Romano de Occidente?",
                opciones: ["476", "1492", "1066", "1453"],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es la capital de Mongolia?",
                opciones: ["Astana", "Ulán Bator", "Bakú", "Tiflis"],
                respuesta: 1
            },
            {
                pregunta: "¿Quién escribió 'La Odisea'?",
                opciones: ["Homero", "Sófocles", "Virgilio", "Platón"],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es el elemento químico con símbolo 'W'?",
                opciones: ["Wolframio", "Tungsteno", "Plomo", "Mercurio"],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es la montaña más alta fuera de Asia?",
                opciones: ["Aconcagua", "Kilimanjaro", "Elbrus", "Denali"],
                respuesta: 0
            },
            {
                pregunta: "¿En qué país nació el escritor Franz Kafka?",
                opciones: ["Alemania", "Austria", "República Checa", "Hungría"],
                respuesta: 2
            },
            {
                pregunta: "¿Cuál es el lago más profundo del mundo?",
                opciones: ["Titicaca", "Baikal", "Superior", "Victoria"],
                respuesta: 1
            }
        ]
    },
    historia: {
        easy: [
            {
                pregunta: "¿Quién descubrió América?",
                opciones: ["Colón", "Magallanes", "Pizarro", "Cortés"],
                respuesta: 0
            },
            {
                pregunta: "¿En qué año comenzó la Primera Guerra Mundial?",
                opciones: ["1914", "1939", "1945", "1929"],
                respuesta: 0
            },
            {
                pregunta: "¿Quién fue el primer presidente de México?",
                opciones: ["Benito Juárez", "Guadalupe Victoria", "Porfirio Díaz", "Vicente Guerrero"],
                respuesta: 1
            },
            {
                pregunta: "¿En qué país se construyó la Gran Muralla?",
                opciones: ["Japón", "China", "India", "Corea"],
                respuesta: 1
            },
            {
                pregunta: "¿Quién fue el faraón más famoso de Egipto?",
                opciones: ["Tutankamón", "Ramsés II", "Cleopatra", "Keops"],
                respuesta: 0
            },
            {
                pregunta: "¿En qué ciudad se firmó la Declaración de Independencia de EE.UU.?",
                opciones: ["Nueva York", "Boston", "Filadelfia", "Washington"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué civilización construyó Machu Picchu?",
                opciones: ["Azteca", "Maya", "Inca", "Olmeca"],
                respuesta: 2
            }
        ],
        medium: [
            {
                pregunta: "¿En qué año comenzó la Segunda Guerra Mundial?",
                opciones: ["1914", "1939", "1945", "1929"],
                respuesta: 1
            },
            {
                pregunta: "¿Quién fue el primer emperador romano?",
                opciones: ["Nerón", "Augusto", "Julio César", "Trajano"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué país fue invadido por Alemania en 1939?",
                opciones: ["Francia", "Polonia", "Rusia", "Italia"],
                respuesta: 1
            },
            {
                pregunta: "¿Quién fue el líder de la Revolución Cubana?",
                opciones: ["Che Guevara", "Fidel Castro", "Raúl Castro", "Camilo Cienfuegos"],
                respuesta: 1
            },
            {
                pregunta: "¿En qué año cayó el Muro de Berlín?",
                opciones: ["1989", "1991", "1985", "1979"],
                respuesta: 0
            },
            {
                pregunta: "¿Quién fue el último zar de Rusia?",
                opciones: ["Pedro I", "Nicolás II", "Alejandro III", "Iván IV"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué batalla marcó el fin de Napoleón?",
                opciones: ["Austerlitz", "Borodinó", "Waterloo", "Leipzig"],
                respuesta: 2
            }
        ],
        hard: [
            {
                pregunta: "¿Quién fue el primer emperador romano?",
                opciones: ["Nerón", "Augusto", "Julio César", "Trajano"],
                respuesta: 1
            },
            {
                pregunta: "¿En qué año terminó la Guerra de los Cien Años?",
                opciones: ["1453", "1492", "1415", "1478"],
                respuesta: 0
            },
            {
                pregunta: "¿Quién fue el primer presidente de Estados Unidos?",
                opciones: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué tratado puso fin a la Primera Guerra Mundial?",
                opciones: ["Versalles", "Tordesillas", "Utrecht", "París"],
                respuesta: 0
            },
            {
                pregunta: "¿En qué año se firmó la independencia de México?",
                opciones: ["1810", "1821", "1808", "1830"],
                respuesta: 1
            },
            {
                pregunta: "¿Quién fue el conquistador del Imperio Azteca?",
                opciones: ["Francisco Pizarro", "Hernán Cortés", "Pedro de Alvarado", "Diego de Almagro"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué civilización inventó la escritura cuneiforme?",
                opciones: ["Egipcia", "Sumeria", "China", "Griega"],
                respuesta: 1
            }
        ]
    },
    lenguaje: {
        easy: [
            {
                pregunta: "¿Cuál es el antónimo de 'feliz'?",
                opciones: ["Triste", "Contento", "Alegre", "Divertido"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué letra es la primera del abecedario?",
                opciones: ["B", "A", "C", "D"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el plural de 'lápiz'?",
                opciones: ["Lápizes", "Lápizs", "Lápices", "Lápizeses"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué palabra es un sustantivo?",
                opciones: ["Correr", "Mesa", "Rápido", "Azul"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es un verbo?",
                opciones: ["Cantar", "Rojo", "Mesa", "Grande"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué palabra es un adjetivo?",
                opciones: ["Perro", "Bonito", "Correr", "Casa"],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el diminutivo de 'casa'?",
                opciones: ["Casito", "Casita", "Casilla", "Casón"],
                respuesta: 1
            }
        ],
        medium: [
            {
                pregunta: "¿Qué es un adverbio?",
                opciones: [
                    "Palabra que describe un sustantivo",
                    "Palabra que describe un verbo",
                    "Palabra que describe un adjetivo",
                    "Palabra que describe un pronombre"
                ],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el participio del verbo 'ver'?",
                opciones: ["Visto", "Viendo", "Vido", "Vez"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué es una metáfora?",
                opciones: [
                    "Comparación directa sin usar 'como'",
                    "Exageración intencionada",
                    "Imitación de sonidos",
                    "Repetición de sonidos"
                ],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es el sinónimo de 'rápido'?",
                opciones: ["Lento", "Veloz", "Pequeño", "Grande"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué es una oración compuesta?",
                opciones: [
                    "Una oración con un solo verbo",
                    "Una oración con dos o más verbos",
                    "Una oración sin verbo",
                    "Una oración interrogativa"
                ],
                respuesta: 1
            },
            {
                pregunta: "¿Cuál es el género de la palabra 'agua'?",
                opciones: ["Femenino", "Masculino", "Neutro", "Ambos"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué palabra es un pronombre?",
                opciones: ["Mesa", "Él", "Correr", "Bonito"],
                respuesta: 1
            }
        ],
        hard: [
            {
                pregunta: "¿Quién escribió 'Cien años de soledad'?",
                opciones: ["Borges", "Cortázar", "García Márquez", "Allende"],
                respuesta: 2
            },
            {
                pregunta: "¿Qué es un diptongo?",
                opciones: [
                    "Dos vocales abiertas juntas",
                    "Una vocal abierta y una cerrada juntas",
                    "Dos vocales en la misma sílaba",
                    "Dos consonantes juntas"
                ],
                respuesta: 2
            },
            {
                pregunta: "¿Cuál es el pretérito perfecto del verbo 'andar'?",
                opciones: ["Andé", "Anduve", "Andaba", "Andaría"],
                respuesta: 1
            },
            {
                pregunta: "¿Qué autor escribió 'Don Quijote de la Mancha'?",
                opciones: ["Miguel de Cervantes", "Lope de Vega", "Góngora", "Quevedo"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué es una anáfora?",
                opciones: [
                    "Repetición de palabras al inicio de versos",
                    "Comparación usando 'como'",
                    "Exageración intencionada",
                    "Imitación de sonidos"
                ],
                respuesta: 0
            },
            {
                pregunta: "¿Cuál es el superlativo de 'bueno'?",
                opciones: ["Buenísimo", "Más bueno", "Buenoísimo", "Buenazo"],
                respuesta: 0
            },
            {
                pregunta: "¿Qué palabra es un sustantivo abstracto?",
                opciones: ["Mesa", "Belleza", "Perro", "Casa"],
                respuesta: 1
            },

        ]
    }
};

let preguntasActuales = [];
let indicePregunta = 0;
let puntos = 0;

// 2. Iniciar el quiz al hacer clic en "Comenzar Quiz"
document.getElementById('comenzar-quiz').addEventListener('click', function(e) {
    e.preventDefault();
    const tema = document.getElementById('select-tema').value;
    const dificultad = document.querySelector('input[name="dificultad"]:checked').value;
    preguntasActuales = preguntas[tema][dificultad];
    indicePregunta = 0;
    puntos = 0;
    document.querySelector('.quiz-config').style.display = 'none';
    document.querySelector('.quiz-final').style.display = 'none';
    document.querySelector('.quiz-pregunta').style.display = 'block';
    mostrarPregunta();
});

// 3. Mostrar pregunta y opciones
function mostrarPregunta() {
    const preguntaObj = preguntasActuales[indicePregunta];
    document.getElementById('pregunta-texto').textContent = preguntaObj.pregunta;
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = '';
    preguntaObj.opciones.forEach((op, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.textContent = op;
        btn.onclick = () => seleccionarOpcion(idx);
        opcionesDiv.appendChild(btn);
    });
    document.getElementById('siguiente-pregunta').style.display = 'none';
}

let respuestaSeleccionada = null;
function seleccionarOpcion(idx) {
    respuestaSeleccionada = idx;
  
    document.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = true);

    document.getElementById('siguiente-pregunta').style.display = 'inline-block';
   
    const correcta = preguntasActuales[indicePregunta].respuesta;
    document.querySelectorAll('.opcion-btn')[correcta].style.background = '#34d399';
    if (idx !== correcta) {
        document.querySelectorAll('.opcion-btn')[idx].style.background = '#ef4444';
    } else {
        puntos++;
    }
}

function mostrarResultado() {
    document.querySelector('.quiz-pregunta').style.display = 'none';
    document.querySelector('.quiz-final').style.display = 'block';
    document.getElementById('resultado').textContent = `Obtuviste ${puntos} de ${preguntasActuales.length} puntos.`;

    // Actualiza puntos totales del usuario
    let usuario = localStorage.getItem('usuario') || 'Usuario';
    let puntosTotales = parseInt(localStorage.getItem(`quiz_${usuario}_puntos`) || '0', 10);
    puntosTotales += puntos;
    localStorage.setItem(`quiz_${usuario}_puntos`, puntosTotales);
    document.getElementById('puntos-totales').textContent = puntosTotales;
}


document.getElementById('regresar-config').addEventListener('click', function() {
    document.querySelector('.quiz-pregunta').style.display = 'none';
    document.querySelector('.quiz-config').style.display = 'block';
});

document.getElementById('reiniciar-quiz').addEventListener('click', function() {
    document.querySelector('.quiz-final').style.display = 'none';
    document.querySelector('.quiz-config').style.display = 'block';
});

// Botón "Jugar como invitado"
document.getElementById('jugar-invitado').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('usuario', 'Invitado');
    entrarAlQuiz("invitado");
});


const nuevasTematicas = {
  deporte: {
    easy: [
      { pregunta: "¿Cuántos jugadores hay en un equipo de baloncesto en pista?", opciones: ["5","6","7","11"], respuesta: 0 },
      { pregunta: "¿En qué deporte se usa un bate y una pelota y hay bases?", opciones: ["Rugby","Béisbol","Tenis","Hockey"], respuesta: 1 },
      { pregunta: "¿Cuántos minutos dura un partido de fútbol (sin tiempo añadido)?", opciones: ["80","90","100","70"], respuesta: 1 },
      { pregunta: "¿Qué deporte utiliza una raqueta y una red y se juega individual o dobles?", opciones: ["Tenis","Golf","Natación","Boxeo"], respuesta: 0 },
      { pregunta: "¿En qué deporte se marca un 'try'?", opciones: ["Fútbol americano","Rugby","Baloncesto","Hockey"], respuesta: 1 },
      { pregunta: "¿Cuál es un deporte olímpico de agua?", opciones: ["Remo","Cricket","Squash","Billar"], respuesta: 0 },
      { pregunta: "¿Qué deporte tiene rondas y nocaut como objetivo?", opciones: ["Boxeo","Golf","Badminton","Atletismo"], respuesta: 0 }
    ],
    medium: [
      { pregunta: "¿Cuántos sets se juegan habitualmente en un partido de tenis masculino en Grand Slams?", opciones: ["3","5","6","4"], respuesta: 1 },
      { pregunta: "¿Qué país domina históricamente el rugby de las 'Seis Naciones'?", opciones: ["Nueva Zelanda","Inglaterra","Sudáfrica","Australia"], respuesta: 1 },
      { pregunta: "¿Qué marca el término 'birdie' en golf?", opciones: ["Dos golpes sobre par","Un golpe bajo par","Un golpe sobre par","Un golpe en par"], respuesta: 1 },
      { pregunta: "¿Cuántos jugadores hay en un equipo de voleibol en cancha?", opciones: ["5","6","7","4"], respuesta: 1 },
      { pregunta: "En atletismo, ¿cuántos metros tiene una carrera de medio fondo clásica?", opciones: ["400m","800m","1500m","5000m"], respuesta: 1 },
      { pregunta: "¿Qué disciplina combina esquí de fondo y tiro con rifle?", opciones: ["Combinada nórdica","Biathlon","Pentatlón","Esquí alpino"], respuesta: 1 },
      { pregunta: "¿Qué ventana de puntuación tiene el boxeo profesional por asalto?", opciones: ["10-9","9-9","8-8","10-8"], respuesta: 0 }
    ],
    hard: [
      { pregunta: "¿Quién tiene el récord mundial de los 100m lisos (hombres)?", opciones: ["Usain Bolt","Tyson Gay","Yohan Blake","Justin Gatlin"], respuesta: 0 },
      { pregunta: "¿En qué año se celebraron los primeros juegos olímpicos modernos?", opciones: ["1896","1900","1888","1912"], respuesta: 0 },
      { pregunta: "¿Qué país ganó la Copa Davis por primera vez en 1903?", opciones: ["EE. UU.","Reino Unido","Francia","Australia"], respuesta: 0 },
      { pregunta: "¿Cuál es la distancia oficial del maratón en metros?", opciones: ["42195","40000","42600","42100"], respuesta: 0 },
      { pregunta: "¿Qué atleta batió el récord mundial de salto de longitud en 1991 con 8.95m?", opciones: ["Mike Powell","Bob Beamon","Carl Lewis","Ivan Pedroso"], respuesta: 0 },
      { pregunta: "¿Qué equipo ganó la primera Champions League de la era moderna (1992/93)?", opciones: ["Milan","Barcelona","Olympique de Marsella","PSV"], respuesta: 0 },
      { pregunta: "¿Cuál es la leyenda futbolística con más Balones de Oro (hasta 2024)?", opciones: ["Cristiano Ronaldo","Lionel Messi","Johan Cruyff","Michel Platini"], respuesta: 1 }
    ]
  },

  futbol: {
    easy: [
      { pregunta: "¿Cuántos jugadores hay en campo por equipo en fútbol 11?", opciones: ["9","10","11","12"], respuesta: 2 },
      { pregunta: "¿Qué país ganó el Mundial 2018?", opciones: ["Alemania","Argentina","Francia","Brasil"], respuesta: 2 },
      { pregunta: "¿Cuál es el objetivo del portero?", opciones: ["Marcar goles","Detener goles","Dar asistencias","Sacar córners"], respuesta: 1 },
      { pregunta: "¿Cómo se llama la máxima competición de clubes en Europa?", opciones: ["Europa League","Champions League","Supercopa","Copa Libertadores"], respuesta: 1 },
      { pregunta: "¿Qué color de tarjeta implica expulsión directa en general?", opciones: ["Amarilla","Roja","Verde","Azul"], respuesta: 1 },
      { pregunta: "¿Qué significa 'offside' en español?", opciones: ["Fuera de juego","Falta","Gol válido","Penalti"], respuesta: 0 },
      { pregunta: "¿Cuánto dura un tiempo reglamentario en fútbol?", opciones: ["30 min","45 min","40 min","60 min"], respuesta: 1 }
    ],
    medium: [
      { pregunta: "¿Quién es el máximo goleador de la selección argentina histórica (hasta 2024)?", opciones: ["Gabriel Batistuta","Lionel Messi","Sergio Agüero","Diego Maradona"], respuesta: 1 },
      { pregunta: "¿Qué entrenador ganó la Champions con el Real Madrid en 2018?", opciones: ["Zidane","Mourinho","Ancelotti","Guardiola"], respuesta: 0 },
      { pregunta: "¿Qué club tiene más títulos de LaLiga (España)?", opciones: ["Barcelona","Real Madrid","Atletico Madrid","Valencia"], respuesta: 1 },
      { pregunta: "¿Qué país organizó el Mundial 2014?", opciones: ["Brasil","Sudáfrica","Rusia","Alemania"], respuesta: 0 },
      { pregunta: "¿Qué significa 'hat-trick'?", opciones: ["Tres goles en un partido","Tres asistencias","Tres tarjetas","Tres penaltis"], respuesta: 0 },
      { pregunta: "¿Cuántos clubes disputan la Premier League (temporada clásica)?", opciones: ["18","20","22","24"], respuesta: 1 },
      { pregunta: "¿Qué torneo sudamericano juegan selecciones de América del Sur?", opciones: ["Copa América","Nations League","Eurocopa","CONCACAF Gold Cup"], respuesta: 0 }
    ],
    hard: [
      { pregunta: "¿Quién ganó el Balón de Oro en 1999?", opciones: ["Rivaldo","Ronaldo","Zinedine Zidane","Luis Figo"], respuesta: 0 },
      { pregunta: "¿Cuál es el estadio con mayor capacidad de Europa (aprox.)?", opciones: ["Camp Nou","Wembley","Old Trafford","Santiago Bernabéu"], respuesta: 0 },
      { pregunta: "¿En qué año se jugó el primer mundial de fútbol?", opciones: ["1924","1930","1934","1950"], respuesta: 1 },
      { pregunta: "¿Qué selección ganó la Eurocopa 2004 sorpresivamente?", opciones: ["Grecia","Portugal","Italia","Francia"], respuesta: 0 },
      { pregunta: "¿Quién es el máximo goleador en la historia de los mundiales?", opciones: ["Ninguno","Just Fontaine","Pelé","Miroslav Klose"], respuesta: 3 },
      { pregunta: "¿Cuál es el máximo goleador histórico de la Champions League (hasta 2024)?", opciones: ["Cristiano Ronaldo","Lionel Messi","Raúl","Karim Benzema"], respuesta: 0 },
      { pregunta: "¿Qué técnico inventó la táctica 'catenaccio'?", opciones: ["Helenio Herrera","Giovanni Trapattoni","Arrigo Sacchi","Nereo Rocco"], respuesta: 3 }
    ]
  },

  metal: {
    easy: [
      { pregunta: "¿Qué instrumento es básico en la mayoría de bandas de metal?", opciones: ["Saxofón","Guitarra eléctrica","Flauta","Piano"], respuesta: 1 },
      { pregunta: "¿Qué subgénero es conocido por voces muy graves y agresivas?", opciones: ["Death metal","Pop","Country","Reggae"], respuesta: 0 },
      { pregunta: "¿Qué banda es considerada pionera del heavy metal (UK)?", opciones: ["Black Sabbath","The Beatles","ABBA","Queen"], respuesta: 0 },
      { pregunta: "¿Qué elemento es típico en la estética del metal?", opciones: ["Trajes formales","Pelo largo y cuero","Sombreros de copa","Trajes de baño"], respuesta: 1 },
      { pregunta: "¿Qué técnica en guitarra usa 'power chords' frecuentemente?", opciones: ["Fingerpicking","Power chords","Arco","Sordina"], respuesta: 1 },
      { pregunta: "¿Qué instrumento marca la base rítmica junto con la batería?", opciones: ["Bajo eléctrico","Piano","Violonchelo","Sitar"], respuesta: 0 },
      { pregunta: "¿Cuál es un tema común en letras de metal?", opciones: ["Amor ligero","Fantasía y conflicto","Recetas","Noticias locales"], respuesta: 1 }
    ],
    medium: [
      { pregunta: "¿Qué banda lanzó el álbum 'Master of Puppets'?", opciones: ["Metallica","Iron Maiden","Megadeth","Slayer"], respuesta: 0 },
      { pregunta: "¿Qué término describe la velocidad y técnica rápida en guitarra metal?", opciones: ["Shredding","Strumming","Plucking","Pizzicato"], respuesta: 0 },
      { pregunta: "¿Qué banda es famosa por su mascot 'Eddie' en las portadas?", opciones: ["Iron Maiden","Metallica","Black Sabbath","Judas Priest"], respuesta: 0 },
      { pregunta: "¿Qué subgénero mezcla thrash y speed con técnica instrumental veloz?", opciones: ["Doom metal","Thrash metal","Funk","Ska"], respuesta: 1 },
      { pregunta: "¿Qué festival es famoso por reunir bandas metal en Alemania?", opciones: ["Wacken Open Air","Glastonbury","Coachella","Lollapalooza"], respuesta: 0 },
      { pregunta: "¿Qué bajista creó líneas rítmicas icónicas en metal?", opciones: ["Cliff Burton","Paul McCartney","John Deacon","Flea"], respuesta: 0 },
      { pregunta: "¿Qué técnica vocal se usa a menudo en black metal (voz aguda y rasgada)?", opciones: ["Clean","Screaming/ shriek","Opera","Rap"], respuesta: 1 }
    ],
    hard: [
      { pregunta: "¿Qué álbum de Black Sabbath se considera fundacional del heavy metal (1970)?", opciones: ["Paranoid","Black Sabbath","Master of Reality","Vol. 4"], respuesta: 1 },
      { pregunta: "¿Qué productor trabajó con Metallica en 'Metallica (The Black Album)'?", opciones: ["Bob Rock","Rick Rubin","Mutt Lange","Phil Spector"], respuesta: 0 },
      { pregunta: "¿Qué técnica de afinación baja es habitual en doom y sludge metal?", opciones: ["Drop D/Drop C","Standard E","Open G","Drop A"], respuesta: 0 },
      { pregunta: "¿Qué banda noruega impulsó la segunda ola del black metal?", opciones: ["Mayhem","AC/DC","The Clash","The Police"], respuesta: 0 },
      { pregunta: "¿Qué sello independiente es conocido por el metal extremo en Noruega?", opciones: ["Peaceville","Nuclear Blast","Century Media","Earache"], respuesta: 0 },
      { pregunta: "¿Qué elemento lírico se encuentra frecuentemente en power metal?", opciones: ["Mitología y fantasía","Noticias políticas","Recetas","Manualidades"], respuesta: 0 },
      { pregunta: "¿Qué guitarrista es célebre por su técnica en metal y colaboraciones?", opciones: ["Yngwie Malmsteen","Eric Clapton","Carlos Santana","BB King"], respuesta: 0 }
    ]
  }
};

Object.assign(preguntas, nuevasTematicas);
const culturaChilena = {
  easy: [
    { pregunta: "¿Cuál es la capital de Chile?", opciones: ["Valparaíso", "Santiago", "Concepción", "Antofagasta"], respuesta: 1 },
    { pregunta: "¿Qué flor es el símbolo nacional de Chile?", opciones: ["Copihue", "Rosa", "Lirio", "Clavel"], respuesta: 0 },
    { pregunta: "¿En qué mes se celebran las Fiestas Patrias en Chile?", opciones: ["Julio", "Septiembre", "Octubre", "Noviembre"], respuesta: 1 },
    { pregunta: "¿Qué océano baña las costas de Chile?", opciones: ["Atlántico", "Pacífico", "Índico", "Ártico"], respuesta: 1 },
    { pregunta: "¿Qué baile típico se realiza durante las Fiestas Patrias?", opciones: ["Cueca", "Samba", "Tango", "Cumbia"], respuesta: 0 },
    { pregunta: "¿Qué isla chilena es famosa por sus moáis?", opciones: ["Chiloé", "Isla de Pascua", "Juan Fernández", "Isla Grande"], respuesta: 1 },
    { pregunta: "¿Qué cordillera atraviesa Chile?", opciones: ["Los Andes", "Himalaya", "Alpes", "Rocosas"], respuesta: 0 }
  ],
  medium: [
    { pregunta: "¿Qué poeta chileno ganó el Premio Nobel de Literatura en 1971?", opciones: ["Pablo Neruda", "Gabriela Mistral", "Vicente Huidobro", "Nicanor Parra"], respuesta: 0 },
    { pregunta: "¿Qué desierto se encuentra en el norte de Chile?", opciones: ["Sahara", "Atacama", "Gobi", "Kalahari"], respuesta: 1 },
    { pregunta: "¿Qué plato típico chileno lleva choclo, carne y huevo?", opciones: ["Cazuela", "Pastel de choclo", "Charquicán", "Empanada"], respuesta: 1 },
    { pregunta: "¿Qué ciudad chilena es conocida como la 'ciudad jardín'?", opciones: ["Valparaíso", "Viña del Mar", "La Serena", "Puerto Montt"], respuesta: 1 },
    { pregunta: "¿Qué instrumento es típico de la música folclórica chilena?", opciones: ["Charango", "Guitarra", "Zampoña", "Arpa"], respuesta: 0 },
    { pregunta: "¿Qué bebida alcohólica es típica de Chile?", opciones: ["Pisco", "Tequila", "Ron", "Whisky"], respuesta: 0 },
    { pregunta: "¿Qué región chilena es famosa por sus viñedos?", opciones: ["Atacama", "Valle Central", "Magallanes", "Araucanía"], respuesta: 1 }
  ],
  hard: [
    { pregunta: "¿En qué año se firmó la independencia de Chile?", opciones: ["1810", "1818", "1821", "1830"], respuesta: 1 },
    { pregunta: "¿Qué presidente chileno murió durante el golpe de Estado de 1973?", opciones: ["Salvador Allende", "Augusto Pinochet", "Eduardo Frei", "Patricio Aylwin"], respuesta: 0 },
    { pregunta: "¿Qué poeta chilena ganó el Premio Nobel de Literatura en 1945?", opciones: ["Gabriela Mistral", "Pablo Neruda", "Violeta Parra", "Isabel Allende"], respuesta: 0 },
    { pregunta: "¿Qué volcán es el más alto de Chile?", opciones: ["Osorno", "Parinacota", "Ojos del Salado", "Villarrica"], respuesta: 2 },
    { pregunta: "¿Qué batalla marcó el fin de la Guerra del Pacífico?", opciones: ["Batalla de Chorrillos", "Batalla de Arica", "Batalla de Iquique", "Batalla de Huamachuco"], respuesta: 1 },
    { pregunta: "¿Qué escritor chileno es autor de 'La casa de los espíritus'?", opciones: ["Isabel Allende", "Pablo Neruda", "Gabriela Mistral", "Nicanor Parra"], respuesta: 0 },
    { pregunta: "¿Qué isla chilena es conocida por su mitología y palafitos?", opciones: ["Isla de Pascua", "Chiloé", "Juan Fernández", "Isla Grande"], respuesta: 1 }
  ]
};
Object.assign(preguntas, { culturaChilena });
const boxeo = {
  easy: [
    { pregunta: "¿Cuántos rounds tiene una pelea de boxeo profesional?", opciones: ["10", "12", "8", "15"], respuesta: 1 },
    { pregunta: "¿Qué significa un 'KO' en boxeo?", opciones: ["Knock Out", "Knock Over", "Knock Off", "Knock On"], respuesta: 0 },
    { pregunta: "¿Qué parte del cuerpo está prohibido golpear en el boxeo?", opciones: ["Cabeza", "Cintura", "Espalda", "Pecho"], respuesta: 2 },
    { pregunta: "¿Qué se utiliza para proteger las manos en el boxeo?", opciones: ["Guantes", "Vendas", "Cinta adhesiva", "Muñequeras"], respuesta: 0 },
    { pregunta: "¿Qué peso pertenece a la categoría más ligera en boxeo?", opciones: ["Peso pluma", "Peso gallo", "Peso mosca", "Peso ligero"], respuesta: 2 },
    { pregunta: "¿Qué significa 'jab' en boxeo?", opciones: ["Un golpe recto", "Un golpe cruzado", "Un gancho", "Un uppercut"], respuesta: 0 },
    { pregunta: "¿Qué se hace en el ring antes de comenzar una pelea?", opciones: ["Saludar al árbitro", "Chocar guantes", "Dar un paso atrás", "Girar en círculo"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿Quién es conocido como 'El más grande' en el boxeo?", opciones: ["Mike Tyson", "Muhammad Ali", "Floyd Mayweather", "Sugar Ray Leonard"], respuesta: 1 },
    { pregunta: "¿Qué categoría de peso está entre peso ligero y peso wélter?", opciones: ["Peso superligero", "Peso medio", "Peso pluma", "Peso crucero"], respuesta: 0 },
    { pregunta: "¿Qué significa 'TKO' en boxeo?", opciones: ["Technical Knock Out", "Total Knock Out", "Time Knock Out", "Technical Knock On"], respuesta: 0 },
    { pregunta: "¿Qué boxeador es conocido como 'Iron Mike'?", opciones: ["Mike Tyson", "Evander Holyfield", "George Foreman", "Lennox Lewis"], respuesta: 0 },
    { pregunta: "¿Qué cinturón es el más prestigioso en el boxeo profesional?", opciones: ["WBC", "IBF", "WBO", "WBA"], respuesta: 0 },
    { pregunta: "¿Qué boxeador ganó una medalla de oro en los Juegos Olímpicos de 1992?", opciones: ["Oscar De La Hoya", "Floyd Mayweather", "Roy Jones Jr.", "Evander Holyfield"], respuesta: 0 },
    { pregunta: "¿Qué significa 'uppercut' en boxeo?", opciones: ["Un golpe ascendente", "Un golpe lateral", "Un golpe recto", "Un gancho"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿En qué año se celebró la primera pelea de boxeo con reglas modernas?", opciones: ["1867", "1880", "1900", "1850"], respuesta: 0 },
    { pregunta: "¿Qué boxeador tiene el récord de más defensas consecutivas de un título mundial?", opciones: ["Joe Louis", "Floyd Mayweather", "Rocky Marciano", "Julio César Chávez"], respuesta: 0 },
    { pregunta: "¿Qué boxeador es conocido como 'Manos de Piedra'?", opciones: ["Roberto Durán", "Sugar Ray Leonard", "Marvin Hagler", "Tommy Hearns"], respuesta: 0 },
    { pregunta: "¿Qué boxeador fue apodado 'El Matador'?", opciones: ["Ricardo Mayorga", "Félix Trinidad", "Erik Morales", "Wilfredo Gómez"], respuesta: 1 },
    { pregunta: "¿Qué boxeador fue el primero en ganar títulos mundiales en ocho categorías diferentes?", opciones: ["Manny Pacquiao", "Floyd Mayweather", "Oscar De La Hoya", "Sugar Ray Leonard"], respuesta: 0 },
    { pregunta: "¿Qué boxeador derrotó a Muhammad Ali en la 'Pelea del Siglo' en 1971?", opciones: ["Joe Frazier", "George Foreman", "Ken Norton", "Larry Holmes"], respuesta: 0 },
    { pregunta: "¿Qué boxeador es conocido por su invicto récord de 49-0?", opciones: ["Rocky Marciano", "Floyd Mayweather", "Julio César Chávez", "Joe Calzaghe"], respuesta: 0 }
  ]
};

Object.assign(preguntas, {
  boxeo
});
const eaSportsFC25 = {
  easy: [
    { pregunta: "¿Qué empresa desarrolla EA Sports FC 25?", opciones: ["Konami", "EA Sports", "Ubisoft", "Activision"], respuesta: 1 },
    { pregunta: "¿Qué modo de juego es el más popular en EA Sports FC 25?", opciones: ["Carrera", "Ultimate Team", "Volta", "Amistoso"], respuesta: 1 },
    { pregunta: "¿Qué botón se usa para disparar en la configuración clásica de EA Sports FC 25?", opciones: ["X", "Círculo", "Cuadrado", "Triángulo"], respuesta: 1 },
    { pregunta: "¿Qué equipo tiene la mejor valoración en EA Sports FC 25?", opciones: ["Real Madrid", "Manchester City", "PSG", "Bayern Múnich"], respuesta: 1 },
    { pregunta: "¿Qué significa FUT en EA Sports FC 25?", opciones: ["Football Ultimate Team", "Football United Tournament", "Football Union Team", "Football Ultimate Tournament"], respuesta: 0 },
    { pregunta: "¿Qué jugador tiene la mejor valoración en EA Sports FC 25?", opciones: ["Lionel Messi", "Erling Haaland", "Kylian Mbappé", "Kevin De Bruyne"], respuesta: 2 },
    { pregunta: "¿Qué año se lanzó EA Sports FC como sucesor de FIFA?", opciones: ["2023", "2024", "2025", "2026"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿Qué modo de EA Sports FC 25 permite crear tu propio club?", opciones: ["Carrera", "Ultimate Team", "Volta", "Pro Clubs"], respuesta: 0 },
    { pregunta: "¿Qué jugador aparece en la portada de EA Sports FC 25?", opciones: ["Lionel Messi", "Erling Haaland", "Kylian Mbappé", "Jude Bellingham"], respuesta: 1 },
    { pregunta: "¿Qué liga no está disponible en EA Sports FC 25 debido a exclusividad con otro juego?", opciones: ["Serie A", "LaLiga", "Bundesliga", "J-League"], respuesta: 3 },
    { pregunta: "¿Qué significa SBC en EA Sports FC Ultimate Team?", opciones: ["Squad Building Challenge", "Special Bonus Card", "Super Boost Challenge", "Squad Bonus Challenge"], respuesta: 0 },
    { pregunta: "¿Qué evento especial ocurre en EA Sports FC durante diciembre?", opciones: ["FUTMAS", "TOTY", "Black Friday", "FUT Birthday"], respuesta: 0 },
    { pregunta: "¿Qué tipo de carta es la más rara en EA Sports FC Ultimate Team?", opciones: ["Oro", "TOTY", "IF", "Icono"], respuesta: 3 },
    { pregunta: "¿Qué botón se usa para hacer un pase filtrado en configuración clásica?", opciones: ["Triángulo", "Círculo", "Cuadrado", "X"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿Qué jugador tiene la carta Icono Prime más cara en EA Sports FC 25?", opciones: ["Pelé", "Maradona", "Zidane", "Ronaldo Nazário"], respuesta: 3 },
    { pregunta: "¿Qué edición de EA Sports FC introdujo el modo Ultimate Team?", opciones: ["EA Sports FC 24", "EA Sports FC 25", "EA Sports FC 26", "EA Sports FC 27"], respuesta: 0 },
    { pregunta: "¿Qué equipo tiene más títulos en el modo Carrera de EA Sports FC 25?", opciones: ["Real Madrid", "Manchester United", "Barcelona", "Bayern Múnich"], respuesta: 0 },
    { pregunta: "¿Qué jugador tiene la mejor carta TOTY en EA Sports FC 25?", opciones: ["Lionel Messi", "Kylian Mbappé", "Karim Benzema", "Kevin De Bruyne"], respuesta: 1 },
    { pregunta: "¿Qué significa 'chemistry' en EA Sports FC Ultimate Team?", opciones: ["Química entre jugadores", "Compatibilidad de cartas", "Sinergia de equipo", "Relación de habilidades"], respuesta: 0 },
    { pregunta: "¿Qué botón se usa para hacer un regate avanzado en configuración clásica?", opciones: ["R1", "L1", "R2", "L2"], respuesta: 1 },
    { pregunta: "¿Qué país tiene más estadios licenciados en EA Sports FC 25?", opciones: ["Inglaterra", "España", "Alemania", "Italia"], respuesta: 0 }
  ]
};

const cristianoRonaldo = {
  easy: [
    { pregunta: "¿En qué país nació Cristiano Ronaldo?", opciones: ["España", "Portugal", "Brasil", "Argentina"], respuesta: 1 },
    { pregunta: "¿Qué número de camiseta es más icónico para Cristiano Ronaldo?", opciones: ["7", "10", "9", "11"], respuesta: 0 },
    { pregunta: "¿Qué equipo fichó a Cristiano Ronaldo desde el Sporting de Lisboa?", opciones: ["Real Madrid", "Manchester United", "Juventus", "PSG"], respuesta: 1 },
    { pregunta: "¿Cuántos Balones de Oro ha ganado Cristiano Ronaldo (hasta 2024)?", opciones: ["4", "5", "6", "7"], respuesta: 1 },
    { pregunta: "¿Qué apodo tiene Cristiano Ronaldo?", opciones: ["CR7", "El Bicho", "El Comandante", "Todos los anteriores"], respuesta: 3 },
    { pregunta: "¿En qué año ganó Cristiano Ronaldo su primera Champions League?", opciones: ["2008", "2014", "2016", "2018"], respuesta: 0 },
    { pregunta: "¿Qué selección nacional representa Cristiano Ronaldo?", opciones: ["España", "Portugal", "Brasil", "Italia"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿Cuántos goles marcó Cristiano Ronaldo en su primera temporada con el Real Madrid?", opciones: ["26", "33", "40", "31"], respuesta: 1 },
    { pregunta: "¿Qué entrenador dirigió a Cristiano Ronaldo en el Manchester United?", opciones: ["Alex Ferguson", "José Mourinho", "Pep Guardiola", "Carlo Ancelotti"], respuesta: 0 },
    { pregunta: "¿Qué récord rompió Cristiano Ronaldo en la Eurocopa 2020?", opciones: ["Máximo goleador histórico", "Más asistencias", "Más partidos jugados", "Más goles en un torneo"], respuesta: 0 },
    { pregunta: "¿Qué equipo venció el Real Madrid en la final de la Champions League 2014?", opciones: ["Atlético de Madrid", "Juventus", "Liverpool", "Bayern Múnich"], respuesta: 0 },
    { pregunta: "¿Qué marca deportiva patrocina a Cristiano Ronaldo?", opciones: ["Adidas", "Nike", "Puma", "Under Armour"], respuesta: 1 },
    { pregunta: "¿En qué año debutó Cristiano Ronaldo con la selección de Portugal?", opciones: ["2002", "2003", "2004", "2005"], respuesta: 1 },
    { pregunta: "¿Qué trofeo ganó Cristiano Ronaldo con Portugal en 2016?", opciones: ["Eurocopa", "Liga de Naciones", "Copa del Mundo", "Confederaciones"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿Cuántos goles ha marcado Cristiano Ronaldo en su carrera profesional (hasta 2024)?", opciones: ["Más de 700", "Más de 800", "Más de 900", "Más de 1000"], respuesta: 1 },
    { pregunta: "¿Qué equipo venció al Manchester United en la final de la FA Cup 2005?", opciones: ["Arsenal", "Chelsea", "Liverpool", "Manchester City"], respuesta: 0 },
    { pregunta: "¿Cuántos hat-tricks ha marcado Cristiano Ronaldo en su carrera profesional (hasta 2024)?", opciones: ["Más de 50", "Más de 60", "Más de 70", "Más de 80"], respuesta: 2 },
    { pregunta: "¿Qué récord rompió Cristiano Ronaldo en la Champions League 2013/14?", opciones: ["Más goles en una temporada", "Más asistencias", "Más goles en fase de grupos", "Más goles en finales"], respuesta: 0 },
    { pregunta: "¿Cuantos goles hizo en Champions League en la 2007/2008?", opciones: ["5", "10", "8", "12"], respuesta: 2 },
    { pregunta: "¿A qué equipo le hizo mas hat-tricks?", opciones: ["FC Barcelona", "Atlético de Madrid", "Sevilla", "Levante"], respuesta: 2 },
    { pregunta: "¿Qué trofeo ganó Cristiano Ronaldo con el Al-Nassr en 2023?", opciones: ["Liga Saudí", "Supercopa Saudí", "Copa del Rey Saudí", "Arab Club Champions Cup"], respuesta: 3 }
  ]
};
const rap = {
  easy: [
    { pregunta: "¿En qué país nació el rap?", opciones: ["Estados Unidos", "Jamaica", "Francia", "España"], respuesta: 0 },
    { pregunta: "¿Qué ciudad es considerada la cuna del rap?", opciones: ["Los Ángeles", "Nueva York", "Chicago", "Atlanta"], respuesta: 1 },
    { pregunta: "¿Qué significa 'MC' en el rap?", opciones: ["Master of Ceremony", "Music Creator", "Microphone Controller", "Mega Cool"], respuesta: 0 },
    { pregunta: "¿Qué elemento NO pertenece a la cultura hip hop?", opciones: ["Graffiti", "Breakdance", "Boxeo", "DJing"], respuesta: 2 },
    { pregunta: "¿Quién es conocido como el 'Rey del Hip Hop' en los inicios?", opciones: ["Run DMC", "Grandmaster Flash", "Tupac", "Jay-Z"], respuesta: 1 },
    { pregunta: "¿Qué instrumento se usaba al inicio para crear beats en rap?", opciones: ["Tornamesa", "Guitarra", "Piano", "Batería"], respuesta: 0 },
    { pregunta: "¿Qué estilo de rap nació en la Costa Oeste?", opciones: ["Trap", "Boom Bap", "G-Funk", "Drill"], respuesta: 2 }
  ],
  medium: [
    { pregunta: "¿Qué rapero popularizó la frase 'Thug Life'?", opciones: ["The Notorious B.I.G.", "Eminem", "Tupac", "Snoop Dogg"], respuesta: 2 },
    { pregunta: "¿Qué significa 'freestyle' en el rap?", opciones: ["Cantar con pista", "Improvisar letras", "Hacer un remix", "Escribir en libreta"], respuesta: 1 },
    { pregunta: "¿Qué rapero es apodado Slim Shady?", opciones: ["Eminem", "Dr. Dre", "Nas", "50 Cent"], respuesta: 0 },
    { pregunta: "¿En qué década se popularizó el rap en todo el mundo?", opciones: ["70s", "80s", "90s", "2000s"], respuesta: 2 },
    { pregunta: "¿Qué rapero ganó un Oscar por 'Lose Yourself'?", opciones: ["Kanye West", "Jay-Z", "Eminem", "Drake"], respuesta: 2 },
    { pregunta: "¿Qué significa 'flow' en el rap?", opciones: ["Forma de vestir", "Ritmo y cadencia al rapear", "Técnica de baile", "Nombre de un beat"], respuesta: 1 },
    { pregunta: "¿Qué productor trabajó con N.W.A. y es pionero en el rap?", opciones: ["DJ Khaled", "Dr. Dre", "Metro Boomin", "Rick Rubin"], respuesta: 1 }
  ],
  hard: [
    { pregunta: "¿En qué año fue asesinado Tupac Shakur?", opciones: ["1994", "1996", "1998", "2000"], respuesta: 1 },
    { pregunta: "¿Cuál fue el primer álbum de Nas?", opciones: ["It Was Written", "Illmatic", "Stillmatic", "God's Son"], respuesta: 1 },
    { pregunta: "¿Qué batalla marcó la historia del rap entre la Costa Este y Oeste?", opciones: ["Jay-Z vs Nas", "Tupac vs Biggie", "Drake vs Meek Mill", "Eminem vs Machine Gun Kelly"], respuesta: 1 },
    { pregunta: "¿Qué rapero lanzó el álbum 'The Chronic'?", opciones: ["Snoop Dogg", "Dr. Dre", "Ice Cube", "Kendrick Lamar"], respuesta: 1 },
    { pregunta: "¿Qué estilo de rap se originó en Atlanta?", opciones: ["Trap", "Drill", "Boom Bap", "Crunk"], respuesta: 0 },
    { pregunta: "¿Qué rapero es conocido como 'Hova'?", opciones: ["Nas", "Jay-Z", "Kanye West", "Lil Wayne"], respuesta: 1 },
    { pregunta: "¿Qué rapera fue la primera en ganar un Grammy a Mejor Álbum de Rap?", opciones: ["Missy Elliott", "Cardi B", "Nicki Minaj", "Lauryn Hill"], respuesta: 3 }
  ]
};
const graffiti = {
  easy: [
    { pregunta: "¿Qué es el graffiti?", opciones: ["Un tipo de pintura artística en muros", "Un deporte", "Un baile urbano", "Una técnica de impresión"], respuesta: 0 },
    { pregunta: "¿Con qué herramienta se realiza principalmente el graffiti?", opciones: ["Brocha", "Spray", "Pincel", "Tinta"], respuesta: 1 },
    { pregunta: "¿En qué superficie es más común ver graffiti?", opciones: ["Lienzo", "Muros", "Papel", "Vidrio"], respuesta: 1 },
    { pregunta: "¿Qué significa 'tag' en graffiti?", opciones: ["Firma del artista", "Pintar un mural", "Hacer un boceto", "Nombre del color"], respuesta: 0 },
    { pregunta: "¿Cuál es el color básico más usado en graffiti?", opciones: ["Negro", "Rojo", "Azul", "Verde"], respuesta: 0 },
    { pregunta: "¿Qué estilo de letra es más común en graffiti?", opciones: ["Bubble", "Cursiva", "Tipografía Times", "Arial"], respuesta: 0 },
    { pregunta: "¿Qué elemento urbano es típico para hacer graffiti?", opciones: ["Puertas", "Paredes", "Autos", "Puentes"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿En qué década se popularizó el graffiti como cultura urbana?", opciones: ["1960s", "1970s", "1980s", "1990s"], respuesta: 1 },
    { pregunta: "¿Qué ciudad es considerada la cuna del graffiti moderno?", opciones: ["Los Ángeles", "Nueva York", "París", "Tokio"], respuesta: 1 },
    { pregunta: "¿Qué significa 'throw-up' en graffiti?", opciones: ["Un mural detallado", "Un graffiti rápido con relleno simple", "Una firma pequeña", "Un boceto en papel"], respuesta: 1 },
    { pregunta: "¿Qué artista es considerado pionero del graffiti en Nueva York?", opciones: ["Banksy", "Taki 183", "Seen", "Cope2"], respuesta: 1 },
    { pregunta: "¿Qué estilo se caracteriza por letras grandes y rellenas?", opciones: ["Tag", "Wildstyle", "Throw-up", "Stencil"], respuesta: 2 },
    { pregunta: "¿Qué herramienta se usa para dar brillo y efectos en graffiti?", opciones: ["Marcadores", "Pinceles", "Spray con boquillas especiales", "Tizas"], respuesta: 2 },
    { pregunta: "¿Qué significa 'crew' en graffiti?", opciones: ["Un tipo de letra", "Un grupo de graffiteros", "Una técnica de color", "Un diseño abstracto"], respuesta: 1 }
  ],
  hard: [
    { pregunta: "¿Qué estilo de graffiti se caracteriza por letras complejas e ilegibles?", opciones: ["Throw-up", "Wildstyle", "Bubble", "Stencil"], respuesta: 1 },
    { pregunta: "¿Qué artista británico es famoso por sus graffitis con mensajes políticos?", opciones: ["Banksy", "Daim", "Shepard Fairey", "Retna"], respuesta: 0 },
    { pregunta: "¿Qué técnica consiste en usar plantillas para pintar graffiti?", opciones: ["Tag", "Throw-up", "Stencil", "Wildstyle"], respuesta: 2 },
    { pregunta: "¿Cómo se llama la competencia internacional más famosa de graffiti?", opciones: ["Red Bull BC One", "Write4Gold", "Battle of the Year", "Art Basel"], respuesta: 1 },
    { pregunta: "¿Qué país europeo tuvo un gran auge del graffiti en los 80s junto con EE.UU.?", opciones: ["Francia", "Alemania", "Italia", "España"], respuesta: 1 },
    { pregunta: "¿Qué tipo de boquilla se usa para líneas muy finas en graffiti?", opciones: ["Fat Cap", "Skinny Cap", "Soft Cap", "Hard Cap"], respuesta: 1 },
    { pregunta: "¿Cómo se llama el libro considerado la 'biblia' del graffiti publicado en 1984?", opciones: ["Style Wars", "Subway Art", "Graffiti Kings", "Street Art"], respuesta: 1 }
  ]
};

Object.assign(preguntas, { graffiti });

Object.assign(preguntas, { rap });


Object.assign(preguntas, { eaSportsFC25, cristianoRonaldo });
const marvel = {
  easy: [
    { pregunta: "¿Quién es el líder de los Avengers?", opciones: ["Iron Man", "Capitán América", "Thor", "Hulk"], respuesta: 1 },
    { pregunta: "¿Qué piedra del infinito controla el tiempo?", opciones: ["Piedra del Alma", "Piedra del Tiempo", "Piedra del Poder", "Piedra de la Realidad"], respuesta: 1 },
    { pregunta: "¿Cómo se llama el martillo de Thor?", opciones: ["Stormbreaker", "Mjolnir", "Gungnir", "Jarnbjorn"], respuesta: 1 },
    { pregunta: "¿Qué superhéroe es conocido como el 'Hombre Araña'?", opciones: ["Tony Stark", "Peter Parker", "Bruce Banner", "Steve Rogers"], respuesta: 1 },
    { pregunta: "¿Quién es el villano principal en 'Avengers: Infinity War'?", opciones: ["Ultron", "Thanos", "Loki", "Hela"], respuesta: 1 },
    { pregunta: "¿Qué metal compone el escudo del Capitán América?", opciones: ["Vibranium", "Adamantium", "Acero", "Titanio"], respuesta: 0 },
    { pregunta: "¿Qué personaje dice 'Yo soy Groot'?", opciones: ["Rocket", "Groot", "Drax", "Gamora"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿Quién creó a Ultron?", opciones: ["Bruce Banner", "Tony Stark", "Hank Pym", "Nick Fury"], respuesta: 1 },
    { pregunta: "¿Qué planeta es el hogar de Thanos?", opciones: ["Asgard", "Titan", "Xandar", "Sakaar"], respuesta: 1 },
    { pregunta: "¿Cómo se llama la hermana de Black Panther?", opciones: ["Okoye", "Nakia", "Shuri", "Ramonda"], respuesta: 2 },
    { pregunta: "¿Qué personaje es conocido como el 'Hechicero Supremo'?", opciones: ["Doctor Strange", "Wong", "Anciana", "Loki"], respuesta: 0 },
    { pregunta: "¿Qué organización malvada aparece en 'Capitán América: El Soldado de Invierno'?", opciones: ["Hydra", "AIM", "SHIELD", "Los Skrulls"], respuesta: 0 },
    { pregunta: "¿Qué actor interpreta a Iron Man en el UCM?", opciones: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], respuesta: 1 },
    { pregunta: "¿Qué película del UCM fue la primera en estrenarse?", opciones: ["Iron Man", "Thor", "Capitán América: El Primer Vengador", "Hulk"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿Qué personaje es el primer vengador en los cómics?", opciones: ["Iron Man", "Thor", "Hulk", "Ant-Man"], respuesta: 3 },
    { pregunta: "¿Qué actor interpreta a Loki en el UCM?", opciones: ["Tom Hiddleston", "Chris Hemsworth", "Mark Ruffalo", "Jeremy Renner"], respuesta: 0 },
    { pregunta: "¿Qué villano aparece en 'Spider-Man: Homecoming'?", opciones: ["Mysterio", "El Buitre", "Duende Verde", "Doctor Octopus"], respuesta: 1 },
    { pregunta: "¿Qué personaje es conocido como 'El Soldado de Invierno'?", opciones: ["Sam Wilson", "Bucky Barnes", "Steve Rogers", "Clint Barton"], respuesta: 1 },
    { pregunta: "¿Qué película del UCM recaudó más dinero en taquilla?", opciones: ["Avengers: Endgame", "Avengers: Infinity War", "Spider-Man: No Way Home", "Black Panther"], respuesta: 0 },
    { pregunta: "¿Qué personaje es el padre de Star-Lord?", opciones: ["Ego", "Yondu", "Thanos", "Odin"], respuesta: 0 },
    { pregunta: "¿Qué director dirigió 'Guardianes de la Galaxia'?", opciones: ["James Gunn", "Joss Whedon", "Jon Favreau", "Taika Waititi"], respuesta: 0 }
  ]
};

const brawlStars = {
  easy: [
    { pregunta: "¿Cuántos jugadores hay en un equipo en Brawl Stars?", opciones: ["2", "3", "4", "5"], respuesta: 1 },
    { pregunta: "¿Qué tipo de juego es Brawl Stars?", opciones: ["MOBA", "Battle Royale", "Shooter", "Estrategia"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene un oso como habilidad especial?", opciones: ["Shelly", "Nita", "Colt", "Jessie"], respuesta: 1 },
    { pregunta: "¿Qué moneda se usa para mejorar a los brawlers?", opciones: ["Gemas", "Monedas", "Fichas", "Estrellas"], respuesta: 1 },
    { pregunta: "¿Qué brawler dispara con una escopeta?", opciones: ["Shelly", "Bull", "Darryl", "Todos los anteriores"], respuesta: 3 },
    { pregunta: "¿Qué brawler tiene una torreta como habilidad especial?", opciones: ["Jessie", "Penny", "Pam", "8-Bit"], respuesta: 0 },
    { pregunta: "¿Qué modo de juego consiste en recoger gemas?", opciones: ["Atrapagemas", "Supervivencia", "Balón Brawl", "Caza Estelar"], respuesta: 0 }
  ],
  medium: [
    { pregunta: "¿Qué brawler es un robot que dispara rayos láser?", opciones: ["8-Bit", "Rico", "Barley", "Carl"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene una habilidad especial llamada 'Supervivencia'?", opciones: ["Leon", "Crow", "Edgar", "Mortis"], respuesta: 0 },
    { pregunta: "¿Qué brawler lanza botellas explosivas?", opciones: ["Barley", "Dynamike", "Tick", "Sprout"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene una habilidad que cura a sus aliados?", opciones: ["Pam", "Poco", "Byron", "Todos los anteriores"], respuesta: 3 },
    { pregunta: "¿Qué brawler tiene un ataque que rebota en las paredes?", opciones: ["Rico", "Spike", "Brock", "Colt"], respuesta: 0 },
    { pregunta: "¿Qué brawler es conocido por su velocidad y ataques cuerpo a cuerpo?", opciones: ["Edgar", "Mortis", "Leon", "Crow"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene un ataque que ralentiza a los enemigos?", opciones: ["Spike", "Crow", "Sandy", "Amber"], respuesta: 1 }
  ],
  hard: [
    { pregunta: "¿Qué brawler tiene una habilidad estelar llamada 'Curación Máxima'?", opciones: ["Pam", "Poco", "Byron", "Sprout"], respuesta: 1 },
    { pregunta: "¿Qué brawler fue el primero en tener una habilidad de invisibilidad?", opciones: ["Leon", "Sandy", "Crow", "Edgar"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene un ataque que explota en forma de cruz?", opciones: ["Spike", "Dynamike", "Tick", "Sprout"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene una habilidad que invoca un torbellino?", opciones: ["Gale", "Sandy", "Amber", "Stu"], respuesta: 1 },
    { pregunta: "¿Qué brawler aumenta su velocidad a él y a sus aliados al activar su ulti?", opciones: ["Max", "8-Bit", "Leon", "Carl"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene un ataque que se divide en múltiples proyectiles al impactar?", opciones: ["Spike", "Piper", "Brock", "Amber"], respuesta: 0 },
    { pregunta: "¿Qué brawler tiene una habilidad que invoca un oso?", opciones: ["Nita", "Jessie", "Penny", "Darryl"], respuesta: 0 }
  ]
};

Object.assign(preguntas, { marvel, brawlStars });
const matematicas = {
  easy: [
    { pregunta: "¿Cuánto es 5 + 3?", opciones: ["6", "7", "8", "9"], respuesta: 2 },
    { pregunta: "¿Cuánto es 9 x 2?", opciones: ["16", "18", "20", "22"], respuesta: 1 },
    { pregunta: "¿Cuánto es 12 ÷ 4?", opciones: ["2", "3", "4", "5"], respuesta: 1 },
    { pregunta: "¿Cuánto es 7 - 4?", opciones: ["1", "2", "3", "4"], respuesta: 2 },
    { pregunta: "¿Cuánto es 10 x 10?", opciones: ["100", "200", "50", "150"], respuesta: 0 },
    { pregunta: "¿Cuánto es 15 + 5?", opciones: ["10", "20", "15", "25"], respuesta: 1 },
    { pregunta: "¿Cuánto es 50 ÷ 5?", opciones: ["5", "10", "15", "20"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿Cuánto es 15 x 4?", opciones: ["50", "60", "70", "80"], respuesta: 1 },
    { pregunta: "¿Cuánto es 144 ÷ 12?", opciones: ["10", "11", "12", "13"], respuesta: 2 },
    { pregunta: "¿Cuánto es la raíz cuadrada de 64?", opciones: ["6", "7", "8", "9"], respuesta: 2 },
    { pregunta: "¿Cuánto es 25% de 200?", opciones: ["25", "50", "75", "100"], respuesta: 1 },
    { pregunta: "¿Cuánto es 81 ÷ 9?", opciones: ["7", "8", "9", "10"], respuesta: 2 },
    { pregunta: "¿Cuánto es 11 x 11?", opciones: ["111", "121", "131", "141"], respuesta: 1 },
    { pregunta: "¿Cuánto es 30% de 300?", opciones: ["60", "90", "100", "120"], respuesta: 1 }
  ],
  hard: [
    { pregunta: "¿Cuánto es 123 x 45?", opciones: ["5535", "5530", "5525", "5540"], respuesta: 0 },
    { pregunta: "¿Cuánto es 1024 ÷ 16?", opciones: ["64", "62", "60", "66"], respuesta: 0 },
    { pregunta: "¿Cuánto es la raíz cúbica de 27?", opciones: ["2", "3", "4", "5"], respuesta: 1 },
    { pregunta: "¿Cuánto es 7 elevado al cubo (7³)?", opciones: ["243", "343", "441", "512"], respuesta: 1 },
    { pregunta: "¿Cuánto es 50% de 500?", opciones: ["200", "250", "300", "350"], respuesta: 1 },
    { pregunta: "¿Cuánto es 12 x 12 x 12?", opciones: ["144", "1728", "1296", "1024"], respuesta: 1 },
    { pregunta: "¿Cuánto es 2 elevado a la potencia de 10?", opciones: ["1024", "2048", "512", "256"], respuesta: 0 }
  ]
};

const ciencias = {
  easy: [
    { pregunta: "¿Qué planeta es conocido como el 'Planeta Rojo'?", opciones: ["Venus", "Marte", "Júpiter", "Saturno"], respuesta: 1 },
    { pregunta: "¿Qué gas respiramos principalmente?", opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Helio"], respuesta: 0 },
    { pregunta: "¿Qué órgano bombea sangre en el cuerpo humano?", opciones: ["Pulmones", "Hígado", "Corazón", "Riñones"], respuesta: 2 },
    { pregunta: "¿Qué planeta es el más grande del sistema solar?", opciones: ["Saturno", "Júpiter", "Urano", "Neptuno"], respuesta: 1 },
    { pregunta: "¿Qué animal es conocido como el 'rey de la selva'?", opciones: ["Elefante", "León", "Tigre", "Jaguar"], respuesta: 1 },
    { pregunta: "¿Qué elemento químico tiene el símbolo 'H'?", opciones: ["Helio", "Hidrógeno", "Hierro", "Mercurio"], respuesta: 1 },
    { pregunta: "¿Qué fuerza mantiene los planetas en órbita alrededor del sol?", opciones: ["Magnetismo", "Gravedad", "Inercia", "Fricción"], respuesta: 1 }
  ],
  medium: [
    { pregunta: "¿Qué planeta tiene anillos visibles?", opciones: ["Júpiter", "Saturno", "Urano", "Neptuno"], respuesta: 1 },
    { pregunta: "¿Qué elemento químico tiene el símbolo 'Au'?", opciones: ["Plata", "Oro", "Aluminio", "Uranio"], respuesta: 1 },
    { pregunta: "¿Qué científico propuso la teoría de la relatividad?", opciones: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], respuesta: 1 },
    { pregunta: "¿Qué gas es esencial para la fotosíntesis?", opciones: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"], respuesta: 1 },
    { pregunta: "¿Qué órgano humano es responsable de filtrar la sangre?", opciones: ["Hígado", "Riñones", "Corazón", "Pulmones"], respuesta: 1 },
    { pregunta: "¿Qué tipo de energía utiliza el sol?", opciones: ["Nuclear", "Eólica", "Solar", "Térmica"], respuesta: 0 },
    { pregunta: "¿Qué es el ADN?", opciones: ["Ácido desoxirribonucleico", "Ácido ribonucleico", "Proteína", "Enzima"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿Qué elemento químico tiene el número atómico 79?", opciones: ["Plata", "Oro", "Platino", "Mercurio"], respuesta: 1 },
    { pregunta: "¿Qué planeta tiene el día más largo del sistema solar?", opciones: ["Venus", "Mercurio", "Marte", "Neptuno"], respuesta: 0 },
    { pregunta: "¿Qué científico descubrió la penicilina?", opciones: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Isaac Newton"], respuesta: 0 },
    { pregunta: "¿Qué unidad mide la intensidad de la corriente eléctrica?", opciones: ["Voltios", "Amperios", "Ohmios", "Watts"], respuesta: 1 },
    { pregunta: "¿Qué tipo de roca se forma a partir de lava enfriada?", opciones: ["Ígnea", "Sedimentaria", "Metamórfica", "Basáltica"], respuesta: 0 },
    { pregunta: "¿Qué partícula subatómica tiene carga negativa?", opciones: ["Protón", "Neutrón", "Electrón", "Quark"], respuesta: 2 },
    { pregunta: "¿Qué teoría explica el origen del universo?", opciones: ["Teoría de la Relatividad", "Teoría del Big Bang", "Teoría de la Evolución", "Teoría de Cuerdas"], respuesta: 1 }
  ]
};

Object.assign(preguntas, { matematicas, ciencias });
const anime = {
  easy: [
    { pregunta: "¿Cómo se llama el protagonista de Naruto?", opciones: ["Sasuke", "Naruto", "Kakashi", "Sakura"], respuesta: 1 },
    { pregunta: "¿Qué anime es famoso por la frase 'Gotta catch 'em all'?", opciones: ["Dragon Ball", "Pokemon", "One Piece", "Digimon"], respuesta: 1 },
    { pregunta: "¿En qué anime aparece el personaje Pikachu?", opciones: ["Pokemon", "Digimon", "Yu-Gi-Oh", "Sailor Moon"], respuesta: 0 },
    { pregunta: "¿Qué anime es sobre un chico que quiere ser el Hokage?", opciones: ["One Piece", "Naruto", "Bleach", "Dragon Ball"], respuesta: 1 },
    { pregunta: "¿Cómo se llama el protagonista de Dragon Ball?", opciones: ["Vegeta", "Piccolo", "Goku", "Gohan"], respuesta: 2 },
    { pregunta: "¿Qué anime trata sobre piratas que buscan un tesoro?", opciones: ["Naruto", "One Piece", "Bleach", "Attack on Titan"], respuesta: 1 },
    { pregunta: "¿En qué anime los personajes luchan contra titanes gigantes?", opciones: ["Attack on Titan", "Tokyo Ghoul", "Death Note", "Demon Slayer"], respuesta: 0 }
  ],
  medium: [
    { pregunta: "¿Cómo se llama la espada de Ichigo en Bleach?", opciones: ["Zangetsu", "Sode no Shirayuki", "Hyorinmaru", "Benihime"], respuesta: 0 },
    { pregunta: "¿Qué fruta del diablo come Luffy en One Piece?", opciones: ["Gomu Gomu", "Mera Mera", "Hie Hie", "Yami Yami"], respuesta: 0 },
    { pregunta: "¿Quién es el Shinigami en Death Note?", opciones: ["Light", "L", "Ryuk", "Misa"], respuesta: 2 },
    { pregunta: "¿Cómo se llama el protagonista de My Hero Academia?", opciones: ["Bakugo", "Todoroki", "Midoriya", "Iida"], respuesta: 2 },
    { pregunta: "¿Qué técnica es famosa de Goku en Dragon Ball?", opciones: ["Rasengan", "Kamehameha", "Chidori", "Bankai"], respuesta: 1 },
    { pregunta: "¿En qué anime aparece el personaje Edward Elric?", opciones: ["Fullmetal Alchemist", "Soul Eater", "Blue Exorcist", "Fairy Tail"], respuesta: 0 },
    { pregunta: "¿Cómo se llama la organización criminal en Naruto?", opciones: ["Espada", "Akatsuki", "Phantom Troupe", "League of Villains"], respuesta: 1 }
  ],
  hard: [
    { pregunta: "¿Quién creó el manga de One Piece?", opciones: ["Masashi Kishimoto", "Eiichiro Oda", "Tite Kubo", "Akira Toriyama"], respuesta: 1 },
    { pregunta: "¿En qué año se estrenó el anime original de Dragon Ball?", opciones: ["1984", "1986", "1988", "1990"], respuesta: 1 },
    { pregunta: "¿Cómo se llama el protagonista de Jojo's Bizarre Adventure parte 3?", opciones: ["Jonathan Joestar", "Joseph Joestar", "Jotaro Kujo", "Josuke Higashikata"], respuesta: 2 },
    { pregunta: "¿Qué estudio de animación creó Spirited Away?", opciones: ["Studio Pierrot", "Madhouse", "Studio Ghibli", "Toei Animation"], respuesta: 2 },
    { pregunta: "¿Cuántas formas de Super Saiyan alcanza Goku en Dragon Ball Z?", opciones: ["2", "3", "4", "5"], respuesta: 1 },
    { pregunta: "¿Qué significa 'Bankai' en Bleach?", opciones: ["Liberación inicial", "Liberación final", "Técnica especial", "Transformación"], respuesta: 1 },
    { pregunta: "¿En qué anime aparece la 'Ley del Intercambio Equivalente'?", opciones: ["Fullmetal Alchemist", "Hunter x Hunter", "Code Geass", "Steins;Gate"], respuesta: 0 }
  ]
};

const baloncesto = {
  easy: [
    { pregunta: "¿Cuántos jugadores hay en cancha por equipo en baloncesto?", opciones: ["4", "5", "6", "7"], respuesta: 1 },
    { pregunta: "¿Cuántos puntos vale una canasta normal en baloncesto?", opciones: ["1", "2", "3", "4"], respuesta: 1 },
    { pregunta: "¿Cómo se llama la línea desde donde se anotan 3 puntos?", opciones: ["Línea de tres", "Línea libre", "Línea de falta", "Línea central"], respuesta: 0 },
    { pregunta: "¿Qué significa NBA?", opciones: ["National Basketball Association", "North Basketball America", "New Basketball Arena", "National Ball Association"], respuesta: 0 },
    { pregunta: "¿Cuánto dura un partido de NBA?", opciones: ["40 minutos", "48 minutos", "50 minutos", "60 minutos"], respuesta: 1 },
    { pregunta: "¿Qué jugador es conocido como 'His Airness'?", opciones: ["Kobe Bryant", "LeBron James", "Michael Jordan", "Magic Johnson"], respuesta: 2 },
    { pregunta: "¿Qué equipo juega en Los Ángeles y usa colores morado y dorado?", opciones: ["Lakers", "Clippers", "Warriors", "Kings"], respuesta: 0 }
  ],
  medium: [
    { pregunta: "¿Quién tiene el récord de más puntos en un solo juego de NBA?", opciones: ["Michael Jordan", "Kobe Bryant", "Wilt Chamberlain", "LeBron James"], respuesta: 2 },
    { pregunta: "¿Qué equipo ganó el primer campeonato de la NBA?", opciones: ["Lakers", "Celtics", "Warriors", "76ers"], respuesta: 2 },
    { pregunta: "¿Cuántos títulos de NBA ganaron los Chicago Bulls en los 90s?", opciones: ["4", "5", "6", "7"], respuesta: 2 },
    { pregunta: "¿Qué jugador es conocido como 'The King'?", opciones: ["Kevin Durant", "LeBron James", "Stephen Curry", "Giannis Antetokounmpo"], respuesta: 1 },
    { pregunta: "¿Qué altura tiene un aro de baloncesto oficial?", opciones: ["3.00 metros", "3.05 metros", "3.10 metros", "3.15 metros"], respuesta: 1 },
    { pregunta: "¿Qué equipo tiene más campeonatos en la historia de la NBA?", opciones: ["Lakers", "Celtics", "Bulls", "Warriors"], respuesta: 1 },
    { pregunta: "¿Qué significa MVP en baloncesto?", opciones: ["Most Valuable Player", "Most Versatile Player", "Maximum Value Player", "Major Victory Player"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿Quién anotó 81 puntos en un solo juego en 2006?", opciones: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Shaquille O'Neal"], respuesta: 1 },
    { pregunta: "¿Qué jugador tiene más títulos de MVP en la historia de la NBA?", opciones: ["Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James", "Magic Johnson"], respuesta: 1 },
    { pregunta: "¿En qué año se fundó la NBA?", opciones: ["1946", "1949", "1950", "1953"], respuesta: 0 },
    { pregunta: "¿Qué jugador tiene el récord de más rebotes en un solo juego?", opciones: ["Wilt Chamberlain", "Bill Russell", "Dennis Rodman", "Shaquille O'Neal"], respuesta: 0 },
    { pregunta: "¿Cuántos triple-dobles tiene Russell Westbrook en su carrera?", opciones: ["Más de 150", "Más de 180", "Más de 200", "Más de 220"], respuesta: 2 },
    { pregunta: "¿Qué equipo tuvo la mejor temporada regular con 73 victorias?", opciones: ["Chicago Bulls", "Los Angeles Lakers", "Golden State Warriors", "San Antonio Spurs"], respuesta: 2 },
    { pregunta: "¿Quién es el jugador más joven en anotar 30,000 puntos en la NBA?", opciones: ["Kobe Bryant", "LeBron James", "Michael Jordan", "Kevin Durant"], respuesta: 1 }
  ]
};

const videojuegos = {
  easy: [
    { pregunta: "¿Qué fontanero italiano es protagonista de varios videojuegos de Nintendo?", opciones: ["Luigi", "Mario", "Wario", "Yoshi"], respuesta: 1 },
    { pregunta: "¿En qué videojuego debes construir y sobrevivir usando bloques?", opciones: ["Fortnite", "Minecraft", "Roblox", "Terraria"], respuesta: 1 },
    { pregunta: "¿Qué videojuego de batalla real es famoso por sus bailes?", opciones: ["PUBG", "Apex Legends", "Fortnite", "Call of Duty"], respuesta: 2 },
    { pregunta: "¿Qué consola creó Nintendo en 2017?", opciones: ["Switch", "Wii U", "3DS", "GameCube"], respuesta: 0 },
    { pregunta: "¿En qué videojuego capturas criaturas llamadas Pokémon?", opciones: ["Digimon", "Pokémon", "Yo-Kai Watch", "Monster Hunter"], respuesta: 1 },
    { pregunta: "¿Qué personaje azul corre muy rápido y come anillos dorados?", opciones: ["Sonic", "Mega Man", "Pac-Man", "Kirby"], respuesta: 0 },
    { pregunta: "¿Qué empresa creó PlayStation?", opciones: ["Microsoft", "Nintendo", "Sony", "Sega"], respuesta: 2 }
  ],
  medium: [
    { pregunta: "¿Qué videojuego popularizó el género Battle Royale?", opciones: ["Fortnite", "PUBG", "H1Z1", "Apex Legends"], respuesta: 1 },
    { pregunta: "¿En qué videojuego Link debe rescatar a la Princesa Zelda?", opciones: ["The Legend of Zelda", "Final Fantasy", "Fire Emblem", "Xenoblade"], respuesta: 0 },
    { pregunta: "¿Qué videojuego de Rockstar transcurre en Vice City?", opciones: ["GTA San Andreas", "GTA Vice City", "GTA IV", "Red Dead Redemption"], respuesta: 1 },
    { pregunta: "¿Cuál es la consola más vendida de todos los tiempos?", opciones: ["PlayStation 2", "Nintendo DS", "PlayStation 4", "Nintendo Switch"], respuesta: 0 },
    { pregunta: "¿Qué personaje es la mascota de PlayStation?", opciones: ["Crash Bandicoot", "Spyro", "Ratchet", "No tiene mascota oficial"], respuesta: 3 },
    { pregunta: "¿En qué año se lanzó el primer Super Mario Bros?", opciones: ["1983", "1985", "1987", "1989"], respuesta: 1 },
    { pregunta: "¿Qué videojuego es conocido por la frase 'The cake is a lie'?", opciones: ["Portal", "Half-Life", "Team Fortress", "Left 4 Dead"], respuesta: 0 }
  ],
  hard: [
    { pregunta: "¿Quién es el creador de Minecraft?", opciones: ["Markus Persson (Notch)", "Shigeru Miyamoto", "Hideo Kojima", "John Carmack"], respuesta: 0 },
    { pregunta: "¿Qué videojuego ganó el Game of the Year en 2018?", opciones: ["Red Dead Redemption 2", "God of War", "Spider-Man", "Monster Hunter World"], respuesta: 1 },
    { pregunta: "¿Cuál fue el primer videojuego comercial exitoso?", opciones: ["Pac-Man", "Pong", "Space Invaders", "Asteroids"], respuesta: 1 },
    { pregunta: "¿Qué empresa desarrolló Half-Life?", opciones: ["Valve", "id Software", "Epic Games", "Blizzard"], respuesta: 0 },
    { pregunta: "¿En qué año se fundó Nintendo?", opciones: ["1885", "1889", "1895", "1900"], respuesta: 1 },
    { pregunta: "¿Qué videojuego causó controversia por su violencia en los 90s?", opciones: ["Doom", "Mortal Kombat", "Grand Theft Auto", "Todos los anteriores"], respuesta: 3 },
    { pregunta: "¿Cuál es el videojuego más vendido de todos los tiempos?", opciones: ["Tetris", "Minecraft", "GTA V", "Super Mario Bros"], respuesta: 1 }
  ]
};

Object.assign(preguntas, { anime, baloncesto, videojuegos });
// Variables para el modo desafío
let modoDesafio = false;
let preguntasDesafio = [];
let tiempoRestante = 0;
let intervaloTiempo = null;
let dificultadDesafio = 'easy';
let preguntasCompletadasDesafio = 0;

// Configuración de tiempo por dificultad (en segundos)
const tiemposPorDificultad = {
    easy: 8,
    medium: 7,
    hard: 5
};

// Puntos bonus por completar modo desafío
const puntosBonus = {
    easy: 10,
    medium: 15,
    hard: 20
};

// Generar preguntas aleatorias para el modo desafío
function generarPreguntasDesafio(dificultad, cantidad = 10) {
    const todasLasPreguntas = [];
    
    // Recopilar todas las preguntas de la dificultad seleccionada
    Object.keys(preguntas).forEach(tema => {
        if (preguntas[tema][dificultad]) {
            preguntas[tema][dificultad].forEach(pregunta => {
                todasLasPreguntas.push({
                    ...pregunta,
                    tema: tema
                });
            });
        }
    });
    
    // Mezclar y seleccionar cantidad específica
    const preguntasMezcladas = todasLasPreguntas.sort(() => Math.random() - 0.5);
    return preguntasMezcladas.slice(0, cantidad);
}

// Iniciar modo desafío
function iniciarModoDesafio() {
    modoDesafio = true;
    dificultadDesafio = document.querySelector('input[name="dificultad"]:checked').value;
    preguntasDesafio = generarPreguntasDesafio(dificultadDesafio, 10);
    indicePregunta = 0;
    puntos = 0;
    preguntasCompletadasDesafio = 0;
    
    document.querySelector('.quiz-config').style.display = 'none';
    document.querySelector('.quiz-final').style.display = 'none';
    document.querySelector('.quiz-pregunta').style.display = 'block';
    
    // Mostrar indicador de modo desafío
    mostrarIndicadorDesafio();
    mostrarPreguntaDesafio();
}

// Mostrar indicador visual del modo desafío
function mostrarIndicadorDesafio() {
    const indicador = document.createElement('div');
    indicador.id = 'indicador-desafio';
    indicador.innerHTML = `
        <div class="desafio-header">
            <h3>🏆 MODO DESAFÍO</h3>
            <div class="desafio-info">
                <span>Dificultad: ${dificultadDesafio.toUpperCase()}</span>
                <span>Pregunta: ${indicePregunta + 1}/10</span>
            </div>
            <div class="temporizador" id="temporizador">
                <span id="tiempo-restante">${tiemposPorDificultad[dificultadDesafio]}</span>
            </div>
        </div>
    `;
    
    // Insertar al inicio del contenedor de pregunta
    const contenedorPregunta = document.querySelector('.quiz-pregunta');
    
    // Eliminar indicador anterior si existe para evitar duplicados
    const indicadorViejo = document.getElementById('indicador-desafio');
    if (indicadorViejo) {
        indicadorViejo.remove();
    }
    contenedorPregunta.insertBefore(indicador, contenedorPregunta.firstChild);
}

// Mostrar pregunta en modo desafío
function mostrarPreguntaDesafio() {
    if (indicePregunta >= preguntasDesafio.length) {
        finalizarModoDesafio();
        return;
    }
    
    const preguntaObj = preguntasDesafio[indicePregunta];
    document.getElementById('pregunta-texto').textContent = `[${preguntaObj.tema.toUpperCase()}] ${preguntaObj.pregunta}`;
    
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = '';
    
    preguntaObj.opciones.forEach((op, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.textContent = op;
        btn.onclick = () => seleccionarOpcionDesafio(idx);
        opcionesDiv.appendChild(btn);
    });
    
    document.getElementById('siguiente-pregunta').style.display = 'none';
    
    // Actualizar indicador
    const indicadorInfo = document.querySelector('.desafio-info');
    if (indicadorInfo) {
        indicadorInfo.innerHTML = `
            <span>Dificultad: ${dificultadDesafio.toUpperCase()}</span>
            <span>Pregunta: ${indicePregunta + 1}/10</span>
        `;
    }
    
    // Iniciar temporizador
    iniciarTemporizador();
}

// Iniciar temporizador
function iniciarTemporizador() {
    tiempoRestante = tiemposPorDificultad[dificultadDesafio];
    const tiempoDisplay = document.getElementById('tiempo-restante');
    const temporizador = document.getElementById('temporizador');
    
    if (tiempoDisplay) {
        tiempoDisplay.textContent = tiempoRestante;
    }
    
    // Reiniciar estilos del temporizador
    temporizador.style.backgroundColor = 'transparent';
    temporizador.style.animation = 'none';

    // Limpiar intervalo anterior si existe
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }
    
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        if (tiempoDisplay) {
            tiempoDisplay.textContent = tiempoRestante;
        }
        
        // Cambiar color cuando queda poco tiempo
        if (temporizador) {
            if (tiempoRestante <= 2) {
                temporizador.style.backgroundColor = '#ef4444';
                temporizador.style.animation = 'pulse 0.5s infinite';
            } else if (tiempoRestante <= 4) {
                temporizador.style.backgroundColor = '#f59e0b';
            }
        }
        
        // Tiempo agotado
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            tiempoAgotadoDesafio();
        }
    }, 1000);
}

// Cuando se agota el tiempo
function tiempoAgotadoDesafio() {
    // Deshabilitar botones
    document.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = true);
    
    // Mostrar respuesta correcta
    const correcta = preguntasDesafio[indicePregunta].respuesta;
    document.querySelectorAll('.opcion-btn')[correcta].style.background = '#34d399';
    
    // Mostrar mensaje de tiempo agotado
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-tiempo';
    mensaje.textContent = '⏰ ¡Tiempo agotado!';
    mensaje.style.color = '#ef4444';
    mensaje.style.fontWeight = 'bold';
    mensaje.style.textAlign = 'center';
    mensaje.style.marginTop = '10px';
    
    document.getElementById('opciones').appendChild(mensaje);
    
    // Mostrar botón siguiente después de 2 segundos
    setTimeout(() => {
        document.getElementById('siguiente-pregunta').style.display = 'inline-block';
    }, 2000);
}

// Seleccionar opción en modo desafío
function seleccionarOpcionDesafio(idx) {
    // Detener temporizador
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }
    
    respuestaSeleccionada = idx;
    document.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = true);
    
    const correcta = preguntasDesafio[indicePregunta].respuesta;
    document.querySelectorAll('.opcion-btn')[correcta].style.background = '#34d399';
    
    if (idx !== correcta) {
        document.querySelectorAll('.opcion-btn')[idx].style.background = '#ef4444';
    } else {
        puntos++;
        // Bonus por tiempo restante
        const bonusTiempo = Math.floor(tiempoRestante / 2);
        puntos += bonusTiempo;
    }
    
    preguntasCompletadasDesafio++;
    document.getElementById('siguiente-pregunta').style.display = 'inline-block';
}

// Finalizar modo desafío
function finalizarModoDesafio() {
    modoDesafio = false;
    
    // Limpiar temporizador
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }
    
    // Quitar indicador
    const indicador = document.getElementById('indicador-desafio');
    if (indicador) {
        indicador.remove();
    }
    
    // Calcular puntos totales con bonus
    const puntosBase = puntos;
    const bonus = puntosBonus[dificultadDesafio];
    const puntosFinales = puntosBase + bonus;
    
    document.querySelector('.quiz-pregunta').style.display = 'none';
    document.querySelector('.quiz-final').style.display = 'block';
    
    document.getElementById('resultado').innerHTML = `
        <div class="resultado-desafio">
            <h3>🏆 ¡DESAFÍO COMPLETADO!</h3>
            <p>Respuestas correctas: ${puntosBase}/10</p>
            <p>Puntos base: ${puntosBase}</p>
            <p>Bonus por completar desafío: +${bonus}</p>
            <p><strong>Total: ${puntosFinales} puntos</strong></p>
        </div>
    `;
    
    // Actualizar puntos totales del usuario
    let usuario = localStorage.getItem('usuario') || 'Usuario';
    let puntosTotales = parseInt(localStorage.getItem(`quiz_${usuario}_puntos`) || '0', 10);
    puntosTotales += puntosFinales;
    localStorage.setItem(`quiz_${usuario}_puntos`, puntosTotales);
    document.getElementById('puntos-totales').textContent = puntosTotales;
    
    // Restablecer para próximo juego
    puntos = 0;
}

// Modificar el botón de comenzar quiz para incluir modo desafío
document.getElementById('comenzar-quiz').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Verificar si está activado el modo desafío
    const modoDesafioCheckbox = document.getElementById('modo-desafio');
    
    if (modoDesafioCheckbox && modoDesafioCheckbox.checked) {
        iniciarModoDesafio();
    } else {
        // Lógica normal del quiz (código existente)
        const tema = document.getElementById('select-tema').value;
        const dificultad = document.querySelector('input[name="dificultad"]:checked').value;
        preguntasActuales = preguntas[tema][dificultad];
        indicePregunta = 0;
        puntos = 0;
        document.querySelector('.quiz-config').style.display = 'none';
        document.querySelector('.quiz-final').style.display = 'none';
        document.querySelector('.quiz-pregunta').style.display = 'block';
        mostrarPregunta();
    }
});

// Modificar el botón siguiente para manejar modo desafío
document.getElementById('siguiente-pregunta').addEventListener('click', function() {
    if (modoDesafio) {
        indicePregunta++;
        if (indicePregunta < preguntasDesafio.length) {
            mostrarPreguntaDesafio();
        } else {
            finalizarModoDesafio();
        }
    } else { // Lógica para el modo normal
        indicePregunta++;
        if (indicePregunta < preguntasActuales.length) {
            mostrarPregunta();
        } else {
            mostrarResultado();
        }
    }
});