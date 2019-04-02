#Витрина

##Задачи

1. Сделать js код для вставки который в нужном месте выведет форму с полем для email.

Нужное место. 

    <div class="journal_case" data-journal-id="234"></div>
    
Пример активации виджета.

    var wg = journalCase({
        url: "test/reg.json"
    });
    wg.activate();
    

2. После запроса с передачей емейла и data-journal-id POST запросом на url получить JSON ответ вида.

    {
    status: 0,
    message: 'Спасибо! Ваш аккаунт создан....',
    is_new: 'false/true',
    user_id: 23,
    user_email: 'email@google.com',
    price: 321,
    issues: {
              12345: {cover: 'http://...image.jpg', name: '43', date_release: '2017-01-03', buy_url: 'http://....' },
              12346: {cover: 'http://...image.jpg', name: '44', date_release: '2017-01-04', buy_url: 'http://....' },
              ...
                 
            }
    }
    
В случае ошибки:

    {
        'status': 1, 
        'message': 'email введен не корректно!'
    }

3. Вывести витрину выпусков для выбора. При этом при клике на обложке подгружать фрейм из url параметра buy_url соответствующей обложки.

В случае ошибки вывести сообщение из поля message.
