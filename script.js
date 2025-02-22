const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const editModal = document.getElementById("edit-modal");
const editInput = document.getElementById("edit-input");
const saveEditBtn = document.getElementById("save-edit");
const closeModalBtn = document.getElementById("close-modal");

let editTarget = null;

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Anda harus menulis sesuatu!");
        return;
    }

    let li = document.createElement("li");
    li.classList.add("task-item");

    let taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.innerText = inputBox.value;

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("task-buttons");

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = '<img src="edit.svg" alt="Edit">';
    editBtn.onclick = function () { openEditModal(li); };

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<img src="hapus.svg" alt="Delete">';
    deleteBtn.onclick = function () { confirmDelete(li); };

    li.appendChild(taskText);
    li.appendChild(buttonContainer);
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
    showNotification("Tugas berhasil ditambahkan!");
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    // Pasang kembali event listener untuk tombol edit dan hapus
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.onclick = function () {
            openEditModal(btn.closest("li"));
        };
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.onclick = function () {
            confirmDelete(btn.closest("li"));
        };
    });
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}

function openEditModal(task) {
    editTarget = task;
    editInput.value = task.querySelector("span").innerText.trim();
    editModal.style.display = "block";
}

saveEditBtn.addEventListener("click", function () {
    if (editTarget && editInput.value.trim() !== "") {
        editTarget.querySelector("span").innerText = editInput.value;
        saveData();
        showNotification("Tugas berhasil diedit!");
        closeModal();
    }
});

function closeModal() {
    editModal.style.display = "none";
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}

window.addEventListener("click", function (event) {
    if (event.target === editModal) {
        closeModal();
    }
});

function confirmDelete(task) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
        task.remove();
        saveData();
        showNotification("Tugas dihapus!");
    }
}

// Panggil showTask() saat halaman dimuat
showTask();

// Event listener untuk toggle checked
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);