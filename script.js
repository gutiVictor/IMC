document.getElementById('imc-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de peso y altura
    const peso = parseFloat(document.getElementById('peso').value);
    const alturaCm = parseFloat(document.getElementById('altura').value);

    // Convertir la altura de centímetros a metros
    const alturaM = alturaCm / 100;

    // Calcular el IMC actual
    const imc = (peso / (alturaM * alturaM)).toFixed(2);

    // Mostrar el resultado del IMC
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = `Tu IMC es ${imc}`;

    // Determinar la categoría del IMC
    let categoria = '';
    if (imc < 18.5) {
        categoria = 'Bajo peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        categoria = 'Peso normal';
    } else if (imc >= 25 && imc <= 29.9) {
        categoria = 'Sobrepeso';
    } else {
        categoria = 'Obesidad';
    }

    resultadoDiv.textContent += ` (${categoria})`;

    // Calcular el peso ideal para un IMC normal (entre 18.5 y 24.9)
    const pesoMinIdeal = (18.5 * alturaM * alturaM).toFixed(2);
    const pesoMaxIdeal = (24.9 * alturaM * alturaM).toFixed(2);

    // Mostrar el rango de peso ideal
    resultadoDiv.textContent += `\nEl rango de peso ideal para tu altura es entre ${pesoMinIdeal} kg y ${pesoMaxIdeal} kg.`;

    // Calcular cuánto peso debe ganar o perder la persona
    let diferencia = 0;
    if (imc < 18.5) {
        // Debe ganar peso
        diferencia = (pesoMinIdeal - peso).toFixed(2);
        resultadoDiv.textContent += `\nDeberías aumentar aproximadamente ${diferencia} kg para alcanzar un IMC normal.`;
    } else if (imc > 24.9) {
        // Debe perder peso
        diferencia = (peso - pesoMaxIdeal).toFixed(2);
        resultadoDiv.textContent += `\nDeberías perder aproximadamente ${diferencia} kg para alcanzar un IMC normal.`;
    } else {
        resultadoDiv.textContent += `\nTu peso está dentro del rango saludable.`;
    }
});
