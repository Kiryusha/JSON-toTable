//
// Построение таблицы на основе JSON
// Костин Кир
//
// convertToTable(obj, container, include, sorting, keyNames) - где
// obj - строка с данными в формате JSON;
// container - контейнер, где будет находиться таблица (по умолчанию body);
// include - массив с заголовками, которые нужно включать в таблицу (по умолчанию
// включаются все);
// sorting - заголовок, по которому идёт сортировка (строка);
// keyClasses - должны ли ячейки получат класс основанный на ключе поля (true/false)

// Функция создания таблицы

function convertToTable(obj, container, include, sorting, keyClasses) {
	var container = container || document.body,
		tableProto = document.createElement('table'),
		trProto = document.createElement('tr'),
		thProto = document.createElement('th'),
		tdProto = document.createElement('td'),
		json;

	json = JSON.parse(obj);

	// Построение таблицы

	function createTable() {

		var table = tableProto.cloneNode(false),
			columns = createColumns(table),
			sortedObject = [];

		// Сортировка строк

		sortedObject = json;

		if (sorting) {
			function sortByKey(array, key) {
				return array.sort(function(a, b) {
					var x = a[key],
						y = b[key];

					// Строки сравниваются по длине
					if (typeof x === 'string' || typeof y === 'string') {
						x = String(x);
						y = String(y);
						return ((x.length < y.length) ? -1 : ((x.length > y.length) ? 1 : 0));
					}
					return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				});
			}
			if (Array.isArray(json)) {
				sortedObject = sortByKey(json, sorting);
			}
		}

		// Построение строк

		if (Array.isArray(sortedObject)) {
			for (var i = 0; i < sortedObject.length; i++) {
				createRow(sortedObject[i]);
			}
		} else {
			createRow(sortedObject);
		}

		function createRow(obj) {
			var tr = trProto.cloneNode(false);
			for (var j = 0; j < columns.length; j++) {
				var td = tdProto.cloneNode(false),
					value = obj[columns[j]];
				if (keyClasses) {
					td.className += ' ' + columns[j] + '-cell'
				}
				if (value === undefined) {
					value = '-';
				}
				td.appendChild(document.createTextNode(value));
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		return table;
	}

	// Построение заголовков колонок таблицы

	function createColumns(table) {
		var tr = trProto.cloneNode(false),
			arr = [];

		// Создание массива заголовков

		if (Array.isArray(json)) {
			for (var i = 0; i < json.length; i++) {
				createHeadsArray(json[i]);
			}
		} else {
			createHeadsArray(json);
		}

		function createHeadsArray(obj) {
			for (var key in obj) {
				if (arr.indexOf(key) === -1) {
					arr.push(key);
				}
			}
		}

		// Исключения колонок

		if (include) {
			var includeArr = [];

			for (var k = 0; k < include.length; k++) {
				if (include[k] == arr[k]) {
					includeArr.push(include[k]);
				}
			}

			arr = includeArr;
		}

		// Построение ряда заголовков на основе массива

		for (var j = 0; j < arr.length; j++) {
			var th = thProto.cloneNode(false);
			th.className = 'js-convert js-sorting';
			if (typeof convertClick === "function") {
				th.addEventListener('click', convertClick);
			}
			th.appendChild(document.createTextNode(arr[j]));
			if (keyClasses) {
				th.className += ' ' + th.innerHTML + '-cell ' + th.innerHTML + '-cell--head'
			}
			tr.appendChild(th);
		}

		table.appendChild(tr);
		return arr;
	}

	return container.appendChild(createTable());
}

// Интерфейс

var convertButtons = document.getElementsByClassName('js-convert');

for (var e = 0; e < convertButtons.length; e++) {
    convertButtons[e].addEventListener('click', convertClick);
}

function convertClick() {
	var container = document.getElementsByClassName('js-container')[0],
		table = container.querySelector('table'),
		json = document.getElementsByClassName('js-textarea')[0].value;

	if (table) {
		table.remove();
	}

	if (hasClass(this, 'js-sorting')) {
		convertToTable(json, container, null, this.innerHTML, true);
	} else {
		convertToTable(json, container, null, null, true);
	}

	setTimeout(function() {
		table = container.querySelector('table');
		table.className = 'active';
	}, 50);
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
