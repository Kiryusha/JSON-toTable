JSON-to-Table функция
=====================
Функция для построения таблицы на основе JSON-объекта

## Что внутри?
Внутри располагается небольшой интерфейс визуализирующий работу функции.
Функция может работать независимо от данных DOM-элементов.
Использован только нативный JS.

## Как она работает?
Функция представляет собой глобальный метод

```
convertToTable(obj, container, include, sorting, keyNames);
```
Где:
* obj - строка с данными в формате JSON;
* container - контейнер, где будет находиться таблица (по умолчанию body);
* include - массив с заголовками, которые нужно включать в таблицу (по умолчанию включаются все);
* sorting - заголовок, по которому идёт сортировка (строка);
* keyClasses - должны ли ячейки получат класс основанный на ключе поля (true/false)
