console.log('JS');

function onReady() {
    console.log('page load');
    getList();
}

function getList() {
    console.log('in getList');
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(response) {
            $('#taskList').empty();
            console.log('tasks', response);
            for (var i = 0; i < response.length; i++) {
                console.log('response[i]:', response[i]);

                var $taskDiv = $('<div>', {text: response[i].task}).data('id', response[i].id);
                var $completeButton = $('<input>', {type: 'button', class: 'complete', value:'Complete'});
                var $deleteButton = $('<input>', {type: 'button', class: 'delete', value:'Delete'});

                $taskDiv.append($completeButton);
                $taskDiv.append($deleteButton);                
                $('#dbDisplay').append($taskDiv);                
            }
        }
    });
}

$(document).ready(onReady);