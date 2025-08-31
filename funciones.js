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
            }
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

document.getElementById('siguiente-pregunta').addEventListener('click', function() {
    indicePregunta++;
    if (indicePregunta < preguntasActuales.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});

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
