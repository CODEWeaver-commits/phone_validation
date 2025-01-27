$(document).ready(function(){
    // Маска для вводу номера телефону
    $('.phone').inputmask("+38 (999) 999-99-99");

    // Основні коди українських мобільних операторів
    const validOperators = ["050", "066", "095", "099", "067", "068", "096", "097", "098", "063", "073", "093", "091", "092", "094", "077", "075"];

    // Перевірка номера при відправці форми
    $('#myForm').on('submit', function(event) {
        let phoneValue = $('.phone').val(); // Отримуємо значення з поля
        let operatorCode = phoneValue.match(/\+38 \((\d{3})\)/); // Витягуємо код оператора з номера

        // Перевірка, чи введено всі цифри
        let digitsOnly = phoneValue.replace(/\D/g, ''); // Видаляємо всі нецифрові символи
        if (digitsOnly.length !== 12) { // 12 цифр для формату +38 (XXX) XXX-XX-XX
            event.preventDefault(); // Зупиняємо відправку форми
            alert('Будь ласка, введіть номер повністю!');
            return;
        }

        if (operatorCode && operatorCode[1]) {
            if (!validOperators.includes(operatorCode[1])) {
                event.preventDefault(); // Зупиняємо відправку форми
                alert('Неправильний код оператора! Допустимі коди: ' + validOperators.join(', '));
                return;
            }
        } else {
            event.preventDefault(); // Якщо формат неправильний
            alert('Введіть номер у правильному форматі!');
            return;
        }
    });
});
