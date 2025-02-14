function validateForm(){
    // Отримуємо значення телефону
    let form = event.target; // Форма, яку користувач відправляє
    let phoneInput = form.querySelector('.phone'); // Беремо телефон саме з цієї форми

    let phoneValue = phoneInput.value;
    let digitsOnly = phoneValue.replace(/\D/g, ''); // Видаляємо всі нецифрові символи

    // Перевірка на кількість цифр
    if (digitsOnly.length !== 12) { // Перевіряємо, чи 12 цифр (формат +38 (XXX) XXX-XX-XX)
        alert('Будь ласка, введіть номер повністю!');
        return false; // Зупиняємо відправку форми
    }

    // Основні коди українських мобільних операторів
    const validOperators = ["050", "066", "095", "099", "067", "068", "096", "097", "098", "063", "073", "093", "091", "092", "094", "077", "075"];
    let operatorCode = phoneValue.match(/\+38 \((\d{3})\)/); // Витягуємо код оператора з номера

    if (operatorCode && operatorCode[1]) {
        if (!validOperators.includes(operatorCode[1])) {
            alert('Неправильний код оператора! Допустимі коди: ' + validOperators.join(', '));
            return false; // Зупиняємо відправку форми
        }
    } else {
        alert('Введіть номер у правильному форматі!');
        return false; // Зупиняємо відправку форми
    }

    let num = form.querySelector('input[name^="tel"]').name.replace('tel', '') || 1;
    let name = form.querySelector('input[name^="name"]').name.replace('name', '') || '';
    
    // Якщо перевірки пройшли успішно, викликаємо sendorder
    sendorder(num); // Відправка форми через sendorder
    return false; // Повертаємо false, щоб форма не відправлялася стандартним способом
};
