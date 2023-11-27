
let proName = document.getElementById("proname");
let proPrice = document.getElementById("proprice");
let proCount = document.getElementById("procount");
let total = document.getElementById("total");
let addBtn = document.getElementById("Addbtn");
let update = document.getElementById("update");
let Delete = document.getElementById("Delete");
let UserCounter = document.getElementById("user-counter");
let mood = 'create';
let fake_i;

function getTotal() {

    if (proPrice.value != '' ) {
        let result = (proPrice.value * proCount.value);
        total.style.backgroundColor = 'green';
        total.innerText = result;
    }
    else {
        total.style.backgroundColor = 'red';
    }

}

let dataPro;

if (localStorage.storedData != null) {
    dataPro = JSON.parse(localStorage.storedData);
}
else {
    dataPro = [];
}


    addBtn.onclick = function () {

        let newPro = {
            proName: proName.value.toLowerCase(),
            proPrice: proPrice.value,
            proCount: proCount.value,
            total: total.innerText,
        }

    if(proName.value!= '' && proCount != '' && proPrice.value != ''){
        if (mood == 'create'){
            if (newPro > 1 ) {
                for (let i = 0; i < newPro; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }
        }    
        else {
        dataPro[fake_i] = newPro
        mood = 'create'
        addBtn.innerHTML = 'Add Product'
        }
    }
    else{
        alert('Please Complete your Product Data')
    }

    Clear();
    localStorage.setItem('storedData', JSON.stringify(dataPro));
    showData();
    getTotal();
}    



function Clear() {

    proName.value = '';
    proPrice.value = '';
    proCount.value = '';
    total.innerText = '';

}


function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].proName}</td>
        <td>${dataPro[i].proPrice}$</td>
        <td>${dataPro[i].proCount}</td>
        <td>${dataPro[i].total}</td>
        <td><button id="Update" onclick="UpdateData(${i})">update</button></td>
        <td><button id="Delete" onclick="DeleteData(${i})" >Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let DeleteAllBtn = document.getElementById("deleteallbtn")

    if (dataPro.length > 0) {
        DeleteAllBtn.innerHTML = `<center><button id="DeleteAll" onclick ="DeleteAllData()" >Delete All (${dataPro.length})</button></center>`
    }
    else {
        DeleteAllBtn.innerHTML = ''
    }
}
showData();


function DeleteData(i) {
    dataPro.splice(i, 1);
    localStorage.storedData = JSON.stringify(dataPro);
    showData();
}

function DeleteAllData() {
    dataPro.splice(0);
    localStorage.storedData = JSON.stringify(dataPro);
    showData();

}

function UpdateData(i) {
    proName.value = dataPro[i].proName;
    proPrice.value = dataPro[i].proPrice;
    proCount.value = dataPro[i].proCount;
    total.innerHTML = dataPro[i].total;
    addBtn.innerHTML = 'Update'
    mood = 'update'
    fake_i = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}


let search = document.getElementById("search");
function getSearch(){
    search.focus();
}

function searchData(value){
    let table = '';

    for(let i = 0 ; i < dataPro.length ; i++){
        if(dataPro[i].proName.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].proName}</td>
            <td>${dataPro[i].proPrice}</td>
            <td>${dataPro[i].proCount}</td>
            <td>${dataPro[i].total}</td>
            <td><button id="Update" onclick="UpdateData(${i})">update</button></td>
            <td><button id="Delete" onclick="DeleteData(${i})" >Delete</button></td>
            </tr>
            `;
        }
        document.getElementById("tbody").innerHTML = table;
    }


}




