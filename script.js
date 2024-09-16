function calcular() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;
    const actividad = document.getElementById('actividad').value;
    const pesoMeta = parseFloat(document.getElementById('peso-meta').value);

    const imc = peso / (altura * altura);
    const bmr = calcularBMR(sexo, peso, altura * 100, edad);
    const caloriasRecomendadas = calcularCaloriasDiarias(bmr, actividad);
    const tiempoMeta = calcularTiempoParaMeta(peso, pesoMeta, caloriasRecomendadas);
    const dieta = generarDieta(caloriasRecomendadas);

    let estadoIMC = determinarEstadoIMC(imc);

    // Mostrar resultados en la página
    document.getElementById('imc-resultado').textContent = `Tu IMC es: ${imc.toFixed(2)}`;
    document.getElementById('estado-imc').textContent = `Estado: ${estadoIMC}`;
    document.getElementById('bmr-resultado').textContent = `Tu BMR es: ${bmr.toFixed(2)} calorías diarias`;
    document.getElementById('calorias-recomendadas').textContent = `Debes consumir aproximadamente: ${caloriasRecomendadas.toFixed(2)} calorías diarias`;
    document.getElementById('tiempo-meta').textContent = `Podrías alcanzar tu peso objetivo en aproximadamente: ${tiempoMeta} semanas`;
    document.getElementById('dieta-recomendada').innerHTML = dieta;

    mostrarProgreso([peso, pesoMeta]);
}

function determinarEstadoIMC(imc) {
    let estadoIMC = '';
    if (imc < 16) {
        estadoIMC = 'Desnutrición grave';
    } else if (imc >= 16 && imc <= 16.9) {
        estadoIMC = 'Desnutrición moderada';
    } else if (imc >= 17 && imc <= 18.4) {
        estadoIMC = 'Desnutrición leve';
    } else if (imc >= 18.5 && imc <= 21.9) {
        estadoIMC = 'Peso insuficiente';
    } else if (imc >= 22 && imc <= 24.9) {
        estadoIMC = 'Normopeso';
    } else if (imc >= 25 && imc <= 26.9) {
        estadoIMC = 'Riesgo de sobrepeso';
    } else if (imc >= 27 && imc <= 29.9) {
        estadoIMC = 'Sobrepeso grado II (preobesidad)';
    } else if (imc >= 30 && imc <= 34.9) {
        estadoIMC = 'Obesidad grado I';
    } else if (imc >= 35 && imc <= 39.9) {
        estadoIMC = 'Obesidad grado II';
    } else if (imc >= 40 && imc <= 49.9) {
        estadoIMC = 'Obesidad grado III';
    } else if (imc >= 50) {
        estadoIMC = 'Obesidad grado IV';
    }
    return estadoIMC;
}

function descargarInforme() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const imc = document.getElementById('imc-resultado').textContent;
    const estadoIMC = document.getElementById('estado-imc').textContent;
    const bmr = document.getElementById('bmr-resultado').textContent;
    const caloriasRecomendadas = document.getElementById('calorias-recomendadas').textContent;
    const tiempoMeta = document.getElementById('tiempo-meta').textContent;
    const dieta = document.getElementById('dieta-recomendada').innerText;

    // Generar el informe en PDF
    doc.text(`Informe de Evaluación de IMC`, 10, 10);
    doc.text(`Nombre: ${nombre} ${apellidos}`, 10, 20);
    doc.text(imc, 10, 30);
    doc.text(estadoIMC, 10, 40);
    doc.text(bmr, 10, 50);
    doc.text(caloriasRecomendadas, 10, 60);
    doc.text(tiempoMeta, 10, 70);
    doc.text("Dieta Recomendada:", 10, 80);
    const lines = doc.splitTextToSize(dieta, 180); // Ajustar el tamaño del texto
    doc.text(lines, 10, 90);

    // Descargar el PDF
    doc.save("Informe_IMC.pdf");
}

function calcularBMR(sexo, peso, altura, edad) {
    if (sexo === 'masculino') {
        return 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
    } else {
        return 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
    }
}

function calcularCaloriasDiarias(bmr, actividad) {
    let factorActividad;
    switch (actividad) {
        case 'sedentario':
            factorActividad = 1.2;
            break;
        case 'ligero':
            factorActividad = 1.375;
            break;
        case 'moderado':
            factorActividad = 1.55;
            break;
        case 'intenso':
            factorActividad = 1.725;
            break;
        default:
            factorActividad = 1.2;
    }
    return bmr * factorActividad;
}

function calcularTiempoParaMeta(pesoActual, pesoMeta, caloriasRecomendadas) {
    // Aquí puedes implementar una fórmula para calcular el tiempo estimado
    const deficitDiario = 500; // Ejemplo de déficit calórico diario
    const caloriasParaPerderKg = 7700; // Aproximadamente 7700 calorías para perder 1 kg de grasa
    const deficitTotal = (pesoActual - pesoMeta) * caloriasParaPerderKg;
    return (deficitTotal / deficitDiario).toFixed(1); // Tiempo en semanas
}

function generarDieta(caloriasRecomendadas) {
    // Puedes crear una dieta de ejemplo o recomendaciones personalizadas
    return `Para mantener tu peso, debes consumir aproximadamente ${caloriasRecomendadas.toFixed(2)} calorías diarias.`;
}

function mostrarProgreso(pesos) {
    const ctx = document.getElementById('graficaProgreso').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Inicio', 'Meta'],
            datasets: [{
                label: 'Peso',
                data: pesos,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Etapas'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Peso (kg)'
                    }
                }
            }
        }
    });
}
