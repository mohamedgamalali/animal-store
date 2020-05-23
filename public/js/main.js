let count = 1 ;
const editButton = (btn)=>{
    if(count%2==0){
        var element = document.getElementById("editForm");
        element.classList.add("hide");
    }else{
        var element = document.getElementById("editForm");
        element.classList.remove("hide");
    }
   
    count++;
  };
  