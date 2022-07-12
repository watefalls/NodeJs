document.addEventListener("click", ({ target }) => {
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;
    remove(id).then(() => {
      target.closest(".list-group-item").remove();
    });
  }

  if (target.dataset.type === "change") {
    const message = prompt("Введите новое название").trim();
    const id = target.dataset.id;
    if (message) {
      const note = { id: id, title: message };
      const textContentTag = target.closest("li").querySelector("p");

      chengeNote(id, note).then(
        () => (textContentTag.textContent = note.title)
      );
    } else {
      alert("Поле не долно быть пустым");
    }
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

async function chengeNote(id, note) {
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
