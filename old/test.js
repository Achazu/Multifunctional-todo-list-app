var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
	todo: [],
	completed: []
};

var data = {
	todo: [],
	completed: []
};


console.log('LS', JSON.parse(localStorage.getItem('todoList')));

var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

// render()


document.getElementById('add').addEventListener('click', function(event) {
	var title = document.getElementById('title').value;	
	var description = document.getElementById('description').value;
	var deadline = document.getElementById('deadline').value;
	if(document.getElementById('priority').value === 'Please select priority'){
		var priority = 'Not specified'
	} else {
		var priority = document.getElementById('priority').value
	};

	if(title, description, deadline, priority) {
		addItemTodo(title, description, deadline, priority);
		document.getElementById('title').value ='';
		document.getElementById('description').value = '';
		document.getElementById('deadline').value = '';
		document.getElementById('priority').selectedIndex = 0;
	}
	
	// updateDB()
	
	event.preventDefault();
});

// function render() {
// 	console.log('render');
// 	// console.log('render', data.todo[0].priority);
// 	console.log('render', data.todo.length);
// 	console.log('render', data.completed.length);
	
// 	if(!data.todo.length && !data.completed.length) return;
// 	for (var i = 0; i < data.todo.length; i++){
// 		var title = data.todo[i].title; 
// 		var desc = data.todo[i].desc; 
// 		var date = data.todo[i].deadline; 
// 		var priority = data.todo[i].priority;
// 		var GUID = data.todo[i].GUID;	
// 		var status = 'todo'
// 		addItemTodo(title, desc, date, priority, GUID, status);
// 		console.log('render loop', GUID);
		
// 	}
// 	for (var j = 0; j < data.completed.length; j++){
// 		var title = data.completed[j].title; 
// 		var desc = data.completed[j].description; 
// 		var date = data.completed[j].deadline; 
// 		var priority = data.completed[j].priority;
// 		var GUID = data.completed[j].GUID;	
// 		var status = 'completed';		
// 		addItemTodo(title, desc, date, priority, GUID);		
// 	}
// }

function updateDB() {
	localStorage.setItem('todoList', JSON.stringify(data))
}

function removeItem() {
	
	var listItem = this.parentNode.parentNode;
	var listUl = this.parentNode.parentNode.parentNode;
	var category = listUl.id;
	var id = listItem.dataset.id
	

	if (category === 'todo'){
		data.todo = data.todo.filter(function(el){
			return el.GUID === id
		})
	} else {
		data.completed = data.completed.filter(function(el){
			return el.GUID === id
		})
	}
	// updateDB()

	listUl.removeChild(listItem); 	

	console.log(data);
}

function completeItem() {
	var listItem = this.parentNode.parentNode;
	var listUl = this.parentNode.parentNode.parentNode;
	var category = listUl.id;
	var id = listItem.dataset.id

	var targetUl = (category === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

	if (category === 'todo'){
		todoStay = data.todo.filter(function(el) {
			return el.GUID !== id			
		})
		todoMove = data.todo.filter(function(el){
			return el.GUID === id
		})
		data.todo = todoStay;
		
		for (var i = 0; i <todoMove.length; i++){
			todoMoveObj = todoMove[i]
		}
		data.completed.push(todoMoveObj)
	
	} else {		
		completedStay = data.completed.filter(function(el){
			return el.GUID !== id
		})

		completedMove = data.completed.filter(function(el){
			return el.GUID === id
		})
		data.completed = completedStay;

		for (var i = 0; i <completedMove.length; i++){
			completedMoveObj = completedMove[i]
		}	
		data.todo.push(completedMoveObj)
	}
	// updateDB()
	console.log(data);
	
	listUl.removeChild(listItem);
	targetUl.insertBefore(listItem, targetUl.childNodes[0]);	
}

function generateId() {
	return '_' + Math.random().toString(36).substr(2, 9);
  };

function addItemTodo(titleText, descriptionText, deadlineText, priorityText, GUIDText, statusData){
	// console.log(titleText);
	// console.log(descriptionText);
	// console.log(deadlineText);
	// console.log(priorityText);
	// console.log(GUIDText);
	// console.log(completed);
	
	var GUID;
	if (!GUIDText) {
		 GUID = generateId()
	} else {
		 GUID = GUIDText
	}
	console.log(GUID);

	console.log(statusData);
	
	
	// var list = (statusData === 'todo') ? document.getElementById('todo'):document.getElementById('completed');
	
	var list = document.getElementById('todo')

	var listItem = document.createElement('li');
	listItem.dataset.id = GUID;

	var titleItem = document.createElement('p');
	titleItem.innerText = titleText;

	var descriptionItem = document.createElement('p');
	descriptionItem.innerText = descriptionText;
	
	var deadlineItem = document.createElement('p');
	deadlineItem.innerText = deadlineText;

	var priorityItem = document.createElement('p');
	priorityItem.innerText = priorityText;

	var buttons = document.createElement('div');
	buttons.classList.add('todo__buttons');

	var remove = document.createElement('button');
	remove.classList.add('todo__btn', 'todo__btn--remove');
	remove.innerHTML = removeSVG;
	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('todo__btn', 'todo__btn--complete');
	complete.innerHTML = completeSVG;
	complete.addEventListener('click', completeItem);

	var dataObj = {
		GUID: GUID,
		title: titleText,
		desc: descriptionText,
		deadline: deadlineText,
		priority: priorityText
	}

	data.todo.push(dataObj)
	
	// data.todo = {
	// 	GUID: GUID,
	// 	title: titleText,
	// 	desc: descriptionText,
	// 	deadline: deadlineText,
	// 	priority: priorityText
	// }

	list.appendChild(listItem);
	listItem.appendChild(titleItem);
	listItem.appendChild(deadlineItem);
	listItem.appendChild(descriptionItem);
	listItem.appendChild(priorityItem);
	listItem.appendChild(buttons);
	buttons.appendChild(remove);
	buttons.appendChild(complete);

	list.insertBefore(listItem, list.childNodes[0]);
	console.log(data);
}




/////////// wersja ok bez LS

var data = {
	todo: [],
	completed: []
}

var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

document.getElementById('add').addEventListener('click', function(event) {
	var title = document.getElementById('title').value;
	var description = document.getElementById('description').value;
	var deadline = document.getElementById('deadline').value;
	if(document.getElementById('priority').value === 'Please select priority'){
		var priority = 'Not specified'
	} else {
		var priority = document.getElementById('priority').value
	};

	if(title, description, deadline, priority) {
		addItemTodo(title, description, deadline, priority);
		document.getElementById('title').value ='';
		document.getElementById('description').value = '';
		document.getElementById('deadline').value = '';
		document.getElementById('priority').selectedIndex = 0;
	}
	event.preventDefault();
});

function removeItem() {
	
	var listItem = this.parentNode.parentNode;
	var listUl = this.parentNode.parentNode.parentNode;
	var category = listUl.id;
	var id = listItem.dataset.id
	

	if (category === 'todo'){
		data.todo = data.todo.filter(function(el){
			return el.GUID !== id
		})
	} else {
		data.completed = data.completed.filter(function(el){
			return el.GUID !== id
		})
	}

	listUl.removeChild(listItem); 	

	console.log(data);
		
	
}

function completeItem() {
	var listItem = this.parentNode.parentNode;
	var listUl = this.parentNode.parentNode.parentNode;
	var category = listUl.id;
	var id = listItem.dataset.id

	var targetUl = (category === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

	if (category === 'todo'){
		todoStay = data.todo.filter(function(el) {
			return el.GUID !== id			
		})
		todoMove = data.todo.filter(function(el){
			return el.GUID === id
		})
		data.todo = todoStay;
		
		for (var i = 0; i <todoMove.length; i++){
			todoMoveObj = todoMove[i]
		}
		data.completed.push(todoMoveObj)
	
	} else {		
		completedStay = data.completed.filter(function(el){
			return el.GUID !== id
		})

		completedMove = data.completed.filter(function(el){
			return el.GUID === id
		})
		data.completed = completedStay;

		for (var i = 0; i <completedMove.length; i++){
			completedMoveObj = completedMove[i]
		}	
		data.todo.push(completedMoveObj)
	}
	console.log(data);
	
	
	listUl.removeChild(listItem);
	targetUl.insertBefore(listItem, targetUl.childNodes[0]);	
}

function generateId() {
	return '_' + Math.random().toString(36).substr(2, 9);
  };

function addItemTodo(titleText, descriptionText, deadlineText, priorityText){

	var GUID = generateId()

	var list = document.getElementById('todo')

	var listItem = document.createElement('li');
	listItem.dataset.id = GUID;

	var titleItem = document.createElement('p');
	titleItem.innerText = titleText;

	var descriptionItem = document.createElement('p');
	descriptionItem.innerText = descriptionText;
	
	var deadlineItem = document.createElement('p');
	deadlineItem.innerText = deadlineText;

	var priorityItem = document.createElement('p');
	priorityItem.innerText = priorityText;

	var buttons = document.createElement('div');
	buttons.classList.add('todo__buttons');

	var remove = document.createElement('button');
	remove.classList.add('todo__btn', 'todo__btn--remove');
	remove.innerHTML = removeSVG;
	remove.addEventListener('click', removeItem);

	var complete = document.createElement('button');
	complete.classList.add('todo__btn', 'todo__btn--complete');
	complete.innerHTML = completeSVG;
	complete.addEventListener('click', completeItem);

	let dataObj = {
		GUID: GUID,
		title: titleText,
		desc: descriptionText,
		deadline: deadlineText,
		priority: priorityText
	}
	
	data.todo.push(dataObj)
	
	list.appendChild(listItem);
	listItem.appendChild(titleItem);
	listItem.appendChild(deadlineItem);
	listItem.appendChild(descriptionItem);
	listItem.appendChild(priorityItem);
	listItem.appendChild(buttons);
	buttons.appendChild(remove);
	buttons.appendChild(complete);

	list.insertBefore(listItem, list.childNodes[0]);
	console.log(data);
	
}