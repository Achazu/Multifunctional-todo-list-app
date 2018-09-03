var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
	todo: [],
	completed: []
};
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

// Update local storage function

function updateDB() {
	localStorage.setItem('todoList', JSON.stringify(data))
}

// Retrieve data from local storage function

function render() {
	
	if(!data.todo.length && !data.completed.length) return;
	for (var i = 0; i < data.todo.length; i++){
		var title = data.todo[i].title; 
		var desc = data.todo[i].desc; 
		var date = data.todo[i].deadline; 
		var priority = data.todo[i].priority;
		var GUID = data.todo[i].GUID;	
		addItemTodo(title, desc, date, priority, GUID);
		console.log(this);
		
		
	}
	for (var j = 0; j < data.completed.length; j++){
		var title = data.completed[j].title; 
		var desc = data.completed[j].desc; 
		var date = data.completed[j].deadline; 
		var priority = data.completed[j].priority;
		var GUID = data.completed[j].GUID;	
		addItemTodo(title, desc, date, priority, GUID, true);		
	}
}

// Remove, add, complete task functions

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
	updateDB() 
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

		console.log(completedMove);
		

		for (var i = 0; i <completedMove.length; i++){
			completedMoveObj = completedMove[i]
		}	
		data.todo.push(completedMoveObj)
	}
	listUl.removeChild(listItem);
	targetUl.insertBefore(listItem, targetUl.childNodes[0]);	
	updateDB() 
}


function addItemTodo(titleText, descriptionText, deadlineText, priorityText, GUID, status){

	var list = (!status) ? document.getElementById('todo'):document.getElementById('completed');
	
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

	list.appendChild(listItem);
	listItem.appendChild(titleItem);
	listItem.appendChild(deadlineItem);
	listItem.appendChild(descriptionItem);
	listItem.appendChild(priorityItem);
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


render()


document.getElementById('add').addEventListener('click', function(event) {
	var title = document.getElementById('title').value;
	var description = document.getElementById('description').value;
	var deadline = document.getElementById('deadline').value;
	if(document.getElementById('priority').value === 'Please select priority'){
		var priority = 'Not specified'
	} else {
		var priority = document.getElementById('priority').value
	};

	var isFormValid = false;
	var isTitleValidated = validateTitle(title)
	var isDateValidated = validateDate(deadline)

	if (isDateValidated && isTitleValidated){
		isFormValid = true;
	}

	if (isFormValid){
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
	document.getElementById('title').value ='';
	document.getElementById('description').value = '';
	document.getElementById('deadline').value = '';
	document.getElementById('priority').selectedIndex = 0;
	}
	
	updateDB()
	event.preventDefault();
});

searchData.addEventListener('keyup', filterTasks);


