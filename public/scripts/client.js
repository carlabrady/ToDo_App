console.log('JS');

function onReady() {
    console.log('page load');
    $('#add').on('click', addTask);
    $('#taskDisplay').on('click', '.markComplete', completeTask);
    $('#taskDisplay').on('click', '.strike', undoComplete);
    $('#taskDisplay').on('click', '.delete', deleteTask);
    getList();
}

function addTask() {
    var addTask = $('#toDoItem').val();
    console.log('toDoItem', addTask);   
    var objectToSend = {
        task: addTask
    };
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend,
        success: function(response) {
            console.log(response);
            getList();
        }
    });
}

function getList() {
    console.log('in getList');
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(response) {
            console.log('tasks', response);
            appendList(response);
        }
    });
}

function completeTask() {
    console.log('in complete task', $(this).data().id);
    $.ajax({
        method: 'PUT',
        url: '/tasks/done/' + $(this).data().id,
        success: function(response) {
            console.log(response);
            getList();
        }
    });
}

function undoComplete() {
    console.log('in Undo task', $(this).data().id);
    $.ajax({
        method: 'PUT',
        url: '/tasks/undone/' + $(this).data().id,
        success: function(response) {
            console.log(response);
            getList();
        }
      });
}

function appendList(taskList) {
    console.log('appending ', taskList,' to DOM');
    $('#taskDisplay').empty();
    for (var i = 0; i < taskList.length; i++) {
        var taskToAppend = taskList[i];
        var $tdForButton = $('<td></td>');
        var $button;
        var $deleteButton = $('<button class=delete>Delete</button>');

        if(taskToAppend.is_complete === false) {
            $button = $('<button class="markComplete">Complete</button>');
            $tr = $('<tr class=stillWorking></tr>')
        } else {
            $button = $('<button class="strike">Complete</button>');
            $tr = $('<tr class=finished></tr>')
        }

        $tr.append('<td>' + taskToAppend.task + '</td>');        
        $tdForButton.append($button.data('id', taskToAppend.id));
        $tdForButton.append($deleteButton.data('id', taskToAppend.id));        
        $tr.append($tdForButton);
        $('#taskDisplay').append($tr);
    }
}

function deleteTask() {
    console.log('in delete task:', $(this).data().id);
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + $(this).data().id,
        success: function(response) {
            console.log('delete response:', response);
            getList();            
        }
    });
}

$(document).ready(onReady);