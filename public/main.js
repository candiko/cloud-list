// DOM is ready.
$(document).ready(function() {
// === List all Todos =============================================================================
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err) {
        alert("Something went wrong!");
    });

// ================================================================================================
// === Event Listeners ============================================================================
// ================================================================================================

// === Create a Todo ==============================================================================
    $("#todoInput").keypress(function(event) {
        if(event.which === 13) {
            createTodo();
        }
    });

// === Remove a Todo ==============================================================================
    $(".list").on("click", "span", function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    });

// === Update a Todo ==============================================================================
    $(".list").on("click", "li", function() {
        updateTodo($(this));
    });
});

// ================================================================================================
// === Functions ==================================================================================
// ================================================================================================

// === Add all Todos ==============================================================================
function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

// === Add a Todo =================================================================================
function addTodo(todo) {
    var newTodo = $('<li class= "task">' + todo.name + '<span>X</span></li>');
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if (todo.completed === true) {
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

// === Create a Todo ==============================================================================
function createTodo() {
    var usrInput = $("#todoInput").val();
    $.post("/api/todos", {name: usrInput})
    .then(function(newTodo) {
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err) {
        alert(err);
    })
}

// === Remove a Todo ==============================================================================
function removeTodo(todo) {
    var deleteUrl = "/api/todos/" + todo.data('id');
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data) {
        todo.remove();
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    })
}

// === Update a Todo ==============================================================================
function updateTodo(todo) {
    var updateUrl = "/api/todos/" + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function (updatedTodo) {
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
    .catch(function(err) {
        console.log(err);
    })
}