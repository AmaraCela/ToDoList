import { allTodos } from "./toDos.js";
const todos = document.querySelectorAll(".todo");


for(const todo of todos)
{
    todo.addEventListener("click",()=>{
        const popup = document.createElement("div");
        popup.classList.add("popup");

        popup.style.position = "fixed";
        const foundTodo = findToDo(todo.id);
        const title = foundTodo.title;
        const description = foundTodo.description;

        const h3 = document.createElement("h3");
        h3.textContent = title;
        const p = document.createElement("p");
        p.textContent = description;

        popup.appendChild(h3);
        popup.appendChild(p);
        document.body.appendChild(popup);
    });
}


function findToDo(id)
{
    for(const todo of allTodos)
    {
        if(todo.id==id)
        {
            return todo;
        }
    }
    return null;
}