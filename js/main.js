var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
	todo: [],
	completed: [],
	index: 0
};
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var prioritySortButton = document.querySelector('#sortPriority');
var deadlineSortButton = document.querySelector('#sortDeadline');
var listTodo = document.querySelector('#todo');
var listCompleted = document.querySelector('#completed');
var displayFormButton = document.querySelector('#showForm');
var form = document.querySelector('#formTable');
var nextStyle = document.querySelector('#nextStyle');
var previousStyle = document.querySelector('#previousStyle');
var body = document.querySelector('body')
var searchContainer = document.querySelector('#container__search')
var headerBox = document.querySelector('#headerBox')
var submitForm = document.getElementById('add');
var addIcon = document.getElementById('addIcon');
var completeButton = document.getElementsByClassName('todo__btn--complete');
var classIndex=data.index;

// Update local storage function

function updateDB() {
	localStorage.setItem('todoList', JSON.stringify(data))
}

// Retrieve data from local storage function

function render() {

	if (!data.todo.length && !data.completed.length) return;
	for (var i = 0; i < data.todo.length; i++) {
		var title = data.todo[i].title;
		var desc = data.todo[i].desc;
		var date = data.todo[i].deadline;
		var priority = data.todo[i].priority;
		var GUID = data.todo[i].GUID;
		addItemTodo(title, desc, date, priority, GUID);
	}
	for (var j = 0; j < data.completed.length; j++) {
		var title = data.completed[j].title;
		var desc = data.completed[j].desc;
		var date = data.completed[j].deadline;
		var priority = data.completed[j].priority;
		var GUID = data.completed[j].GUID;
		addItemTodo(title, desc, date, priority, GUID, true);
	}
	addClass(data.index)
	for (var i = 0; i<completeButton.length; i++){
		completeButton[i].className=`todo__btn todo__btn--complete todo__btn--complete-${data.index}`
	}
}

// Remove, add, complete task functions

function removeItem() {

	var listItem = this.parentNode.parentNode;
	var listUl = this.parentNode.parentNode.parentNode;
	var category = listUl.id;
	var id = listItem.dataset.id


	if (category === 'todo') {
		data.todo = data.todo.filter(function (el) {
			return el.GUID !== id
		})
	} else {
		data.completed = data.completed.filter(function (el) {
			return el.GUID !== id
		})
	}
	listUl.removeChild(listItem);
	updateDB()
}

function completeItem() {
	var listItem = this.parentNode.parentNode;
	var listUl = this.parentNode.parentNode.parentNode;
	var category = listUl.id;
	var id = listItem.dataset.id

	var targetUl = (category === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

	if (category === 'todo') {
		todoStay = data.todo.filter(function (el) {
			return el.GUID !== id
		})
		todoMove = data.todo.filter(function (el) {
			return el.GUID === id
		})
		data.todo = todoStay;

		for (var i = 0; i < todoMove.length; i++) {
			todoMoveObj = todoMove[i]
		}
		data.completed.push(todoMoveObj)

	} else {
		completedStay = data.completed.filter(function (el) {
			return el.GUID !== id
		})

		completedMove = data.completed.filter(function (el) {
			return el.GUID === id
		})
		data.completed = completedStay;

		for (var i = 0; i < completedMove.length; i++) {
			completedMoveObj = completedMove[i]
		}
		data.todo.push(completedMoveObj)
	}
	listUl.removeChild(listItem);
	targetUl.insertBefore(listItem, targetUl.childNodes[0]);
	updateDB()
}


function addItemTodo(titleText, descriptionText, deadlineText, priorityText, GUID, status) {

	var list = (!status) ? document.getElementById('todo') : document.getElementById('completed');

	var listItem = document.createElement('li');
	listItem.dataset.id = GUID;

	var textBox = document.createElement('div');
	textBox.classList.add('list__text-box');

	var titleItem = document.createElement('p');
	titleItem.classList.add('list__title');
	titleItem.innerText = titleText;

	var descriptionItem = document.createElement('p');
	descriptionItem.classList.add('list__desc');
	descriptionItem.innerText = descriptionText;

	var dataBox = document.createElement('div');
	dataBox.classList.add('list__data-box');

	var deadlineItem = document.createElement('p');
	deadlineItem.classList.add('list__deadline');
	deadlineItem.innerText = deadlineText;

	var priorityItem = document.createElement('p');
	priorityItem.classList.add('list__priority');
	// priorityItem.setAttribute('id', 'list__priority--id');
	priorityItem.innerText = priorityText;

	var buttons = document.createElement('div');
	buttons.classList.add('todo__buttons');

	var remove = document.createElement('button');
	remove.classList.add('todo__btn', 'todo__btn--remove');
	remove.innerHTML = removeSVG;
	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('todo__btn', 'todo__btn--complete', 'todo__btn--complete-0');
	complete.innerHTML = completeSVG;
	complete.addEventListener('click', completeItem);

	list.appendChild(listItem);
	listItem.appendChild(textBox);
	textBox.appendChild(titleItem);
	textBox.appendChild(descriptionItem);
	listItem.appendChild(dataBox);
	dataBox.appendChild(deadlineItem);
	dataBox.appendChild(priorityItem);
	listItem.appendChild(buttons);
	buttons.appendChild(remove);
	buttons.appendChild(complete);

	list.insertBefore(listItem, list.childNodes[0]);
}

/// Validation functions 

function validateDate(inputText) {
	if (inputText.length === 10) {
		return true;
	} else {
		alert('Invalid date format!');
		return false;
	}
}

function validateTitle(inputText) {
	if (inputText.length !== 0) {
		return true;
	} else {
		alert('Title empty!');
		return false;
	}
}

// Filter by title function

function filterTasks(e) {
	const text = this.value.toLowerCase();
	var li = document.querySelectorAll('li');
	for (var i = 0; i < li.length; i++) {
		if (li[i].children[0].textContent.toLowerCase().indexOf(text) != -1) {
			li[i].style.display = "block";
		} else {
			li[i].style.display = "none";
		}
	}
};

// Generate Id function

function generateId() {
	return '_' + Math.random().toString(36).substr(2, 9);
};

// Sorting functions

function sortByPriority(list) {
	var switching = true;
	while (switching) {
		var switching = false;
		var listItem = list.getElementsByTagName("li");

		for (var i = 0; i < (listItem.length - 1); i++) {
			var shouldSwitch = false;
			var x = listItem[i].children[1].children[1].innerText;
			var y = listItem[i + 1].children[1].children[1].innerText;
			if (x > y) {
				var shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			listItem[i].parentNode.insertBefore(listItem[i + 1], listItem[i]);
			switching = true;
		}
	}
}

function convertDate(date) {
	var string = date + '';
	var p = string.split("-");
	return +(p[0] + p[1] + p[2]);
}

function sortByDeadline(list) {
	var switching = true;
	while (switching) {
		var switching = false;
		var listItem = list.getElementsByTagName("li");

		for (var i = 0; i < (listItem.length - 1); i++) {
			var shouldSwitch = false;
			var x = convertDate(listItem[i].children[1].children[0].innerText)
			var y = convertDate(listItem[i + 1].children[1].children[0].innerText)

			if (x > y) {
				var shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			convertDate(listItem[i].parentNode.insertBefore(listItem[i + 1], listItem[i]));
			switching = true;
		}
	}
}

// Hide / show form

function showForm(){
	form.hidden = true;
	form.style.display='block'	
}

function hideForm(){
	form.hidden = false;
	form.style.display='none';
	clearInput();
}

function displayForm() {
	form.hidden = !form.hidden;
	if(form.hidden) {
		this.children[0].innerText = 'cancel'
		showForm()
	} else {
		this.children[0].innerText = 'add new task';
		hideForm()
	}
} 

function clearInput(){
	document.getElementById('title').value = '';
	document.getElementById('description').value = '';
	document.getElementById('deadline').value = '';
	document.getElementById('priority').selectedIndex = 0;
}

/// Change styling

function addClass(index){
	body.className=`background-${index}`
	form.className=`form-${index}`
	searchContainer.className=`container__search container__search-${index}`
	headerBox.className=`header__box header__box-${index}`;
	addIcon.className=`fas fa-plus fa-2x fa-plus-${index}`;
}

function nextStyleFunction(){
	
	classIndex++;
	data.index = classIndex%3;
	addClass(classIndex%3)
	for (var i = 0; i<completeButton.length; i++){
		completeButton[i].classList.remove(`todo__btn--complete-${(classIndex-1)%3}`);		
		completeButton[i].classList.add(`todo__btn`, `todo__btn--complete`, `todo__btn--complete-${classIndex%3}`);
	}
	updateDB()
	
}

function previousStyleFunction(){
	classIndex--;
	if(classIndex < 0) {
		classIndex = 2;}
	// data.index = classIndex%3;
	addClass(classIndex%3)
	for (var i = 0; i<completeButton.length; i++){
		completeButton[i].classList.remove(`todo__btn--complete-${(classIndex+1)%3}`);
		completeButton[i].classList.add(`todo__btn`, `todo__btn--complete`, `todo__btn--complete-${classIndex%3}`);
	}
	updateDB()
}
///////

render()

submitForm.addEventListener('click', function (event) {
	var title = document.getElementById('title').value;
	var description = document.getElementById('description').value;
	var deadline = document.getElementById('deadline').value;
	if (document.getElementById('priority').value === 'Please select priority') {
		var priority = 'Not specified'
	} else {
		var priority = document.getElementById('priority').value
	};

	var isFormValid = false;
	var isTitleValidated = validateTitle(title)
	var isDateValidated = validateDate(deadline)

	if (isDateValidated && isTitleValidated) {
		isFormValid = true;
	}

	if (isFormValid) {
		var GUID = generateId()
		let dataObj = {
			GUID: GUID,
			title: title,
			desc: description,
			deadline: deadline,
			priority: priority
		}
		data.todo.push(dataObj)

		addItemTodo(title, description, deadline, priority, GUID);
		clearInput()
	}

	updateDB()
	event.preventDefault();
});

nextStyle.addEventListener('click', nextStyleFunction);
previousStyle.addEventListener('click', previousStyleFunction);

displayFormButton.addEventListener('click', displayForm);
searchData.addEventListener('keyup', filterTasks);
deadlineSortButton.addEventListener('click', function(){
	sortByDeadline(listTodo);
	sortByDeadline(listCompleted);
});
prioritySortButton.addEventListener('click', function(){
	sortByPriority(listTodo);
	sortByPriority(listCompleted);	
});