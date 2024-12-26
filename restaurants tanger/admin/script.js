let data;
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('myModal');
const add = document.querySelector('.add');
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/restaurants');
        data = await response.json();
        console.log("fetched data", data);
        update();
    } catch (error) {
        console.log('error fetching', error);
    }
}

// استدعاء الدالة
fetchData();
function update(value="",type="Search By name"){
    const boxs=document.querySelector("main");
    boxs.innerHTML="";
    data.forEach((item) => {
        if(condition(item,value,type)){
        const box=document.createElement("div");
        box.classList.add("box");
        box.innerHTML=`
        <div class="img">
        <img src="${item.image_url}">
        </div>
        <div class="info">
        <p>${item.name}</p>
        <p>${item.cuisine_type}</p>
        <p>${item.rating}</p>
        </div>
        <div class="button">
        <button onclick="modal.style.display = 'flex';document.querySelector('#delete_id_input').value='${item.id}'">delete</button>

        <button onclick="window.location.href='add.html?id=${item.id}'">modification</button>
        </div>
        `;
        boxs.appendChild(box);
        }
    })
}
function condition(mainvalue,value,type){
    if (type=="Search By name"){
        return mainvalue.name.toLowerCase().includes(value.toLowerCase())
    }else{
        return mainvalue.cuisine_type.toLowerCase().includes(value.toLowerCase())
    }
}

async function deleteRestaurant(id) {
    try {
        const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete restaurant with id ${id}`);
        }

        console.log(`Restaurant with id ${id} deleted successfully.`);
        await fetchData();
        modal.style.display = 'none';
    } catch (error) {
        console.log('Error deleting restaurant:', error);
    }
}

add.onclick= function(){
    window.location.href='add.html?id=-1'
}
closeModal.onclick = function () {
    const id = document.querySelector('#delete_id_input').value;
    console.log(id)
    deleteRestaurant(id);
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};