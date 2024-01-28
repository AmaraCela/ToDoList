import { Topic, ToDo, allTodos } from "./toDos.js";

let topicCheckbox = document.getElementById("include-topic");
let topicsDiv = document.getElementById("add-to-topics-div");
let newTopicInput = document.getElementById("new-topic");
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
    fetchTopics();
    clearTopics();
    topicsDiv.appendChild(document.createElement("br"));
    console.log("topics first");
    console.log(allTodos);
    for(let [id,name] of Object.entries(topics))
    {   
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "topic";
        input.id = id;
        input.classList.add("topic-input");
        let label = document.createElement("label");
        label.for = id;
        label.innerText = name;
        label.classList.add("topic-input");
        topicsDiv.appendChild(input);
        topicsDiv.appendChild(label);
        topicsDiv.appendChild(document.createElement("br"));
    }
    // let input = document.createElement("input");
    // input.type = "text";
    // input.name = "new-topic";
    // input.placeholder = "New Topic";
    // topicsDiv.appendChild(input);
   
    checkIfSelected();
    typeTopic();

}

populateTopics();

function clearTopics()
{
  let children = topicsDiv.getElementsByClassName("topic-input");
  for(let child of children)
  {
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


let title = document.getElementById("title-input");
let description = document.getElementById("description-input");
let date = document.getElementById("date");
// let time = document.getElementById("time");
let newTitle;


function validateInputs(event)
{
    if(validateTitle())
    {
        let newDescription = description.value;
        let newDate = new Date(date.value);
        let topicId = checkIfSelected();
        let topicName;
        let newTodo; 
        if (topicId==null)
        {
            topicName = newTopicInput.value;
            if(topicName!="")
            {
                let found = findTopicByName(topicName);
                if(found==null)
                {
                    console.log("topic not founc")
                     newTodo = new ToDo(newTitle,newDescription,new Topic(topicName),newDate);
                }
                else{
                    console.log("topic founc")
                    newTodo = new ToDo(newTitle,newDescription,found,newDate);
                }
               
            }
            else
            {
                console.log("null as topic")
                newTodo = new ToDo(newTitle,newDescription,null,newDate);
            }
        }
        else
        {
            console.log("existing topic from radio")
            newTodo = new ToDo(newTitle,newDescription,topics[id],newDate);
        }
        if(newTodo)
        {
            
            allTodos.push(newTodo);
            console.log(allTodos);
            populateTopics();
            localStorage.setItem('todos', JSON.stringify(allTodos));
            event.preventDefault();
            location.reload();
            return true;
        }
        
    }

    event.preventDefault();
    return false;
}


function validateTitle()
{
    newTitle = title.value;
    return newTitle.length >= 1;
}


document.getElementById("save-btn").addEventListener("click",validateInputs);
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
                return input.id;
            }
        });
        
    }
    return null;

}


// checkIfSelected();

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

// typeTopic();