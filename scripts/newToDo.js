import { Topic, ToDo, allTodos } from "./toDos.js";

const topicCheckbox = document.getElementById("include-topic");
const topicsDiv = document.getElementById("add-to-topics-div");
const newTopicInput = document.getElementById("new-topic");
let topics ={};


function fetchTopics()
{
    topics = {};
    for(const element of allTodos)
    {
        if(element.topic)
        {
            if(!topics[element.topic.id])
            {
                topics[element.topic.id] = element.topic.name;
            }
        }
    }
}

function populateTopics()
{
    clearTopics();
    fetchTopics();
    
    for(const [id,name] of Object.entries(topics))
    {   
        const input = document.createElement("input");
        input.type = "radio";
        input.id = id;
        input.classList.add("topic-input");
        const label = document.createElement("label");
        label.for = id;
        label.innerText = name;
        label.classList.add("topic-input");
        topicsDiv.appendChild(input);
        topicsDiv.appendChild(label);
        topicsDiv.appendChild(document.createElement("br"));
    }
    checkIfSelected();
    typeTopic();

}

populateTopics();

function clearTopics() {
    const children = Array.from(document.getElementsByClassName("topic-input"));
    for (const child of children) {
        topicsDiv.removeChild(child);
    }
}


function toggleVisibility(element)
{
    if(window.getComputedStyle(element).display == 'none')
    {
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
}

function checkboxClick()
{
    topicCheckbox.addEventListener("click",()=>{
        toggleVisibility(topicsDiv);
    });
}

checkboxClick();


const title = document.getElementById("title-input");
const description = document.getElementById("description-input");
const date = document.getElementById("date");
let newTitle;


function validateInputs(event)
{
    if(validateTitle())
    {
        const newDescription = description.value;
        const newDate = date.value;
        const topicId = radioFunctionality();
        const topicName = newTopicInput.value;;
        let newTodo; 
        if (topicId==null)
        {
            if(topicName!="")
            {
                const found = findTopicByName(topicName);
                if(found==null)
                {
                    newTodo = new ToDo(newTitle,newDescription,new Topic(topicName),newDate);
                }
                else{
                   
                    newTodo = new ToDo(newTitle,newDescription,found,newDate);
                }
               
            }
            else
            {
                newTodo = new ToDo(newTitle,newDescription,null,newDate);
            }
        }
        else
        {
            newTodo = new ToDo(newTitle, newDescription, {'id':topicId, 'name':topics[topicId]}, newDate);
        }
        if(newTodo)
        {
            
            allTodos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(allTodos));
            populateTopics();
            return true;
        }
        
    }
    event.preventDefault();
    return false;
}


function validateTitle()
{
    newTitle = title.value;
    if(newTitle.length>=1)
    {
        for(const todo of allTodos)
        {
            if(todo.name==newTitle)
            {
                return false;
            }
        }
    }
    return true;
}

document.getElementById("todo-form").addEventListener("submit",(event)=>{validateInputs(event)});

function checkIfSelected()
{
    let inputs = topicsDiv.children;
    for (let input of inputs)
    {
        input.addEventListener("click",()=>{
            if (input.checked)
            {
                newTopicInput.value = "";
            }
        });
        
    }
}

function radioFunctionality()
{
    let inputs = topicsDiv.children;
    for (let input of inputs)
    {
            if (input.checked)
            {
                return input.id;
            }
        
    }
    return null;
}


function typeTopic()
{
    newTopicInput.addEventListener("click",()=>{
        let inputs = topicsDiv.children;
    for (let input of inputs)
    {
        input.checked = false;  
        
    }
    });
}

function findTopicByName(tName)
{
    for(let [id,name] of Object.entries(topics))
    {
        if(tName == name)
        {
           return {"id":id,"name":name}
        }
    }
    return null;
}