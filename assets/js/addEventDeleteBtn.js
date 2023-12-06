let addEventDeleteBtn = function () {
  let deleteButtonNode = document.querySelectorAll(".deleteBtn");
  deleteButtonNode.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.currentTarget.parentNode.parentNode.remove();
      console.log(registeredPet.splice(index, 1));
    });
  });
};
