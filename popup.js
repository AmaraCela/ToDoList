import { allTodos } from "./toDos.js";
let todos = document.getElementsByClassName("todo");

/** Your code looks generally good, but there are a few improvements and suggestions you can consider: 
 * Use `const` for elements that don't change
 * Instead of using innerText, you can use textContent for better performance
 * If possible, consider using querySelector instead of getElementsByClassName for more flexibility in selecting elements
*/

for(let todo of todos) {
    // remove consoles, use them only for test
    console.log("yeah")
    todo.addEventListener("click",()=>{
        console.log("clicked")
        let popup = document.createElement("div");
        popup.classList.add("popup");

        popup.style.position = "fixed";
        let foundTodo = findToDo(todo.id);
        let title = foundTodo.title;
        let description = foundTodo.description;

        let h3 = document.createElement("h3");
        h3.innerText = title;
        let p = document.createElement("p");
        p.innerText = description;

        popup.appendChild(h3);
        popup.appendChild(p);
        document.body.appendChild(popup);


    });
}

function findToDo(id) {
    for(let todo of allTodos)
    {
        if(todo.id==id)
        {
            return todo;
        }
    }
    return null;
}
