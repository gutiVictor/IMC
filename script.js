function calcular() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;
    const actividad = document.getElementById('actividad').value;
    const pesoMeta = parseFloat(document.getElementById('peso-meta').value);

    // Cálculo de IMC
    const imc = peso / (altura * altura);
    document.getElementById('imc-resultado').textContent = `Tu IMC es: ${imc.toFixed(2)}`;

    // Determinar estado según IMC actualizado
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
    document.getElementById('estado-imc').textContent = `Estado: ${estadoIMC}`;

    // Cálculo de BMR
    const bmr = calcularBMR(sexo, peso, altura * 100, edad);
    document.getElementById('bmr-resultado').textContent = `Tu BMR es: ${bmr.toFixed(2)} calorías diarias`;

    // Recomendación calórica según nivel de actividad
    const caloriasRecomendadas = calcularCaloriasDiarias(bmr, actividad);
    document.getElementById('calorias-recomendadas').textContent = `Debes consumir aproximadamente: ${caloriasRecomendadas.toFixed(2)} calorías diarias`;

    // Tiempo para alcanzar el peso objetivo
    const tiempoMeta = calcularTiempoParaMeta(peso, pesoMeta, caloriasRecomendadas);
    document.getElementById('tiempo-meta').textContent = `Podrías alcanzar tu peso objetivo en aproximadamente: ${tiempoMeta} semanas`;

    // Dieta recomendada
    const dieta = generarDieta(caloriasRecomendadas);
    document.getElementById('dieta-recomendada').innerHTML = dieta;

    // Mostrar gráfico de progreso
    mostrarProgreso([peso, pesoMeta]);
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
    const deficitCaloricoDiario = 500;  // Se considera un déficit de 500 calorías por día
    const deficitPorSemana = deficitCaloricoDiario * 7;
    const kilosAPerder = pesoActual - pesoMeta;
    const semanas = (kilosAPerder * 7700) / deficitPorSemana;
    return semanas.toFixed(1);
}

function generarDieta(caloriasRecomendadas) {
    const desayuno = (caloriasRecomendadas * 0.25).toFixed(2);
    const almuerzo = (caloriasRecomendadas * 0.35).toFixed(2);
    const cena = (caloriasRecomendadas * 0.25).toFixed(2);
    const snacks = (caloriasRecomendadas * 0.15).toFixed(2);

    return `
        <h3>Dieta Recomendada:</h3>
        <ul>
            <li><strong>Desayuno:</strong> ${desayuno} calorías (Ej: Avena con leche, frutas, nueces)</li>
            <li><strong>Almuerzo:</strong> ${almuerzo} calorías (Ej: Pechuga de pollo, arroz integral, ensalada)</li>
            <li><strong>Cena:</strong> ${cena} calorías (Ej: Pescado al horno, quinoa, verduras)</li>
            <li><strong>Snacks:</strong> ${snacks} calorías (Ej: Yogur, frutas, frutos secos)</li>
        </ul>
    `;
}

function mostrarProgreso(pesos) {
    const ctx = document.getElementById('graficaProgreso').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Peso actual', 'Peso meta'],
            datasets: [{
                label: 'Progreso de Peso',
                data: pesos,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
