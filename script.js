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

    // Cálculo de BMR
    const bmr = calcularBMR(sexo, peso, altura * 100, edad);
    document.getElementById('bmr-resultado').textContent = `Tu BMR es: ${bmr.toFixed(2)} calorías diarias`;

    // Recomendación calórica según nivel de actividad
    const caloriasRecomendadas = calcularCaloriasDiarias(bmr, actividad);
    document.getElementById('calorias-recomendadas').textContent = `Debes consumir aproximadamente: ${caloriasRecomendadas.toFixed(2)} calorías diarias`;

    // Tiempo para alcanzar el peso objetivo
    const tiempoMeta = calcularTiempoParaMeta(peso, pesoMeta, caloriasRecomendadas);
    document.getElementById('tiempo-meta').textContent = `Podrías alcanzar tu peso objetivo en aproximadamente: ${tiempoMeta} semanas`;

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

function mostrarProgreso(pesos) {
    const ctx = document.getElementById('graficaProgreso').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Peso actual', 'Peso objetivo'],
            datasets: [{
                label: 'Progreso de peso (kg)',
                data: pesos,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
