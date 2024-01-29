const arrow = document.querySelector("#arrow");
const expandDiv = document.querySelector("#expand-div");
const topicsDiv = document.querySelector("#topics-div");

function rotateArrow()
{
    if(window.getComputedStyle(arrow).transform == "none")
    {
        arrow.style.transform = "rotate(45deg)";
    }
    else{
        arrow.style.transform = "none";
    }
}

function toggleTopics()
{

    expandDiv.addEventListener("click",()=>{
        rotateArrow();
        if(window.getComputedStyle(topicsDiv).display=='none')
        {
            topicsDiv.style.display = "block";
        }
        else{
            topicsDiv.style.display = "none";
        }
    });
}

toggleTopics();