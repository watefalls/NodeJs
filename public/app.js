document.addEventListener("click", ({ target }) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest(".list-group-item").remove();
    });
  }

  if (target.dataset.type === "change") {
    const updateBlock = target
      .closest(".list-group-item")
      .querySelector(".updated__block");
    openUpdateBlock(updateBlock);
  }

  if (target.dataset.type === "update") {
    const updateBlock = target
      .closest(".list-group-item")
      .querySelector(".updated__block");
    const message = updateBlock.querySelector("input").value;
    const id = updateBlock.querySelector("input").dataset.id;
    if (message) {
      const note = { id: id, title: message };
      const textContentTag = target.closest("li").querySelector("p");
      updateNote(note).then(() => (textContentTag.textContent = note.title));
      closeUpdateBlock(target.closest(".updated__block"));
    } else {
      alert("Поле не долно быть пустым");
    }
  }

  if (target.dataset.type === "cancel") {
    closeUpdateBlock(target.closest(".updated__block"));
  }
});

async function remove(id) {
  try {
    await fetch(`/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateNote(note) {
  try {
    await fetch(`/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  } catch (error) {
    console.log(error);
  }
}

function closeUpdateBlock(DOMel) {
  DOMel.style.zIndex = -1;
}

function openUpdateBlock(DOMel) {
  DOMel.style.zIndex = 1000;
  DOMel.querySelector("input").focus();
}
