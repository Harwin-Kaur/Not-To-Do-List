const taskList = [];
const handleOnSubmit = (e) => {
    // const elm = document.getElementById("task");
    // console.log(elm.value);

const newForm = new FormData(e); //FormData is built-in browser constructor
const task = newForm.get("task");
const hr = newForm.get("hr");

const obj = {
    task: task,
    hr: hr,
    id: randomIdGenerator(),
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
                    <button class="button btn btn-danger"> <i class="fa-solid fa-trash"></i></button>
                    <button class="button btn btn-success"> <i class="fa-solid fa-arrow-right"></i></button>
                </td>
                </tr>`;
    });

    entryElm.innerHTML = str;

    // console.log(taskList);
    // console.log("first");
}

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