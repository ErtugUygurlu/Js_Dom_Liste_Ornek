let editMode = false;
let editingItem = null;

function addItem() {
    const newItemName = document.getElementById("newItem").value;

    if (editMode) {
        editingItem.querySelector('p').textContent = `Öğe ${getItemCount()}: ${newItemName}`;
        editingItem.classList.remove('edit-mode');
        editMode = false;
        editingItem = null;
    } else {
        if (newItemName.trim() !== "") {
            const newDiv = document.createElement("div");
            newDiv.classList.add("box");

            newDiv.innerHTML = `
                <p>Öğe ${getItemCount() + 1}: ${newItemName}</p>
                <button class="edit-button">Düzenle</button>
                <button class="delete-button">Sil</button>
            `;

            newDiv.querySelector('.edit-button').addEventListener("click", function () {
                enterEditMode(newDiv);
            });

            newDiv.querySelector('.delete-button').addEventListener("click", function () {
                newDiv.remove();
            });

            document.getElementById("itemList").appendChild(newDiv);

            document.getElementById("newItem").value = "";
        }
    }
}

function getItems() {
    return Array.from(document.getElementById("itemList").children);
}

function getItemCount() {
    return getItems().length;
}

function enterEditMode(item) {
    if (editMode) {
        editingItem.classList.remove('edit-mode');
    }

    editMode = true;
    editingItem = item;
    item.classList.add('edit-mode');

    const itemText = item.querySelector('p').textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = itemText.slice(itemText.indexOf(':') + 2);
    input.classList.add('edit-input');

    item.querySelector('p').textContent = '';
    item.querySelector('p').appendChild(input);
    input.focus();

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Güncelle';
    updateButton.classList.add('update-button');

    updateButton.addEventListener('click', function () {
        saveEdit();
    });

    item.querySelector('.edit-button').replaceWith(updateButton);
}

function sortItems() {
    const itemList = document.getElementById("itemList");
    const items = getItems();

    items.sort((a, b) => {
        const textA = a.querySelector('p').textContent.slice(a.querySelector('p').textContent.indexOf(':') + 2);
        const textB = b.querySelector('p').textContent.slice(b.querySelector('p').textContent.indexOf(':') + 2);

        return textA.localeCompare(textB);
    });

    itemList.innerHTML = '';

    items.forEach((item, index) => {
        item.querySelector('p').textContent = `Öğe ${index + 1}: ${item.querySelector('p').textContent.slice(item.querySelector('p').textContent.indexOf(':') + 2)}`;
        itemList.appendChild(item);
    });
}


function changeColors() {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        const randomColor = getRandomColor();
        box.style.backgroundColor = randomColor;
    });
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function saveEdit() {
    if (editMode && editingItem) {
        const editedText = editingItem.querySelector('.edit-input').value.trim();

        if (editedText !== "") {
            editingItem.querySelector('p').textContent = `Öğe ${getItemCount()}: ${editedText}`;
            editingItem.classList.remove('edit-mode');
            editMode = false;
            editingItem = null;
        } else {
            cancelEdit();
        }
    }
}

function cancelEdit() {
    if (editMode && editingItem) {
        editingItem.querySelector('p').textContent = '';
        editMode = false;
        editingItem = null;
    }
}


document.getElementById("addItemBtn").addEventListener("click", addItem);
document.getElementById("sortBtn").addEventListener("click", sortItems);
document.getElementById("changeColorBtn").addEventListener("click", changeColors);

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        saveEdit();
    }
    document.getElementById("sortBtn").addEventListener("click", sortItems);
});
