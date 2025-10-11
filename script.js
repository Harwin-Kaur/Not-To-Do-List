let taskList = [];

const hoursPerWeek = 24 * 7;

const handleOnSubmit = (e) => {
    // const elm = document.getElementById("task");
    // console.log(elm.value);

const newForm = new FormData(e); //FormData is built-in browser constructor
const task = newForm.get("task");
const hr = +newForm.get("hr");

const obj = {
    task: task,
    hr: hr,
    id: randomIdGenerator(),
    type: "entry"
}

//check if there is enough hours left

const existingTtlHrs = taskTotal()

if(existingTtlHrs + hr > hoursPerWeek){
    return alert("Sorry not enough time fit this task from last week");
}

// console.log(task);

taskList.push(obj);
console.log(taskList);
displayEntryList();
};

// data that has multiple properties to express one information let's call data set
// , if we have multiple data to express one information then we need to combine
// them together and if we have multiple of those then we need to combine them in list

const displayEntryList = () => {
    console.log(taskList);
    let str = "";
    
    const entryElm = document.getElementById("entryList");

    taskList.map((item, i) => {
        str +=`<tr>
                <td>${i + 1}</td>
                <td>${item.task}</td>
                <td>${i.hr}</td>
                <td class="text-end">
                    <button type="button" onclick="handleOnDelete('${item.id}')" class="button btn btn-danger"> <i class="fa-solid fa-trash"></i></button>
                    <button type="button" onclick="switchTask('${item.id}', 'bad')" class="button btn btn-success"> <i class="fa-solid fa-arrow-right"></i></button>
                </td>
                </tr>`;
    });

    entryElm.innerHTML = str;

    // console.log(taskList);
    // console.log("first");
}


const displaybadList = () => {
    
    let str = "";

    console.log(taskList);
    const badElm = document.getElementById("badList");

    const badList = taskList.filter((item) => item.type === "bad");

    badList.map((item, i) => {
        str +=`<tr>
                <td>${i + 1}</td>
                <td>${item.task}</td>
                <td>${i.hr}</td>
                <td class="text-end">
                <button type="button" onclick="switchTask('${item.id}', 'entry')" class="button btn btn-warning"> <i class="fa-solid fa-arrow-left"></i></button>
                    <button type="button" onclick="handleOnDelete('${item.id}')" class="button btn btn-danger"> <i class="fa-solid fa-trash"></i></button>
                </td>
                </tr>`;
    });

    badElm.innerHTML = str;
    document.getElementById('savedHrsElm').innerText = badList.reduce((acc, item) => acc + item.hr, 0);
};


//generating unique id
const randomIdGenerator = (length = 6) => {

    const str = "qeijwiojjtyqwocxmcbsjwjpnsjbcjnsQERFGIUBLK37648083788110";

    let id = "";

    for(let i=0; i<6; i++){
       const randomIndex = Math.floor(Math.random() * str.length); //0
         id += str[randomIndex];
    }
    return id;
};

const handleOnDelete = (id) => {
if(window.confirm("Are you sure to delete?")){
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
    displaybadList();
   }
}
const switchTask = (id, type) =>{
    taskList = taskList.map((item) => {
        if(item.id === id){
            item.type = type;
        }
        return item;
    }); 

    displayEntryList();
    displaybadList();
};

const taskTotal = () => {
    const ttlHr = taskList.reduce((acc, item) => {
        return acc + item.hr;
    }, 0);   

 document.getElementById('ttlHrs').innerText = ttlHr;
 return ttlHr;
};