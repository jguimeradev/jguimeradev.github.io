const options: NodeListOf<HTMLLIElement> = document.querySelectorAll(".menu-option li");

const cursor: HTMLSpanElement = document.createElement("span");
cursor.classList.add("cursor");

let currentIndex: number = 0;

// set cursor on the first item
options[currentIndex].insertBefore(cursor, options[currentIndex].firstChild);

document.addEventListener("keydown", (e: KeyboardEvent): void => {
  if (e.key === "ArrowDown") {
    currentIndex++;
  } else if (e.key === "ArrowUp") {
    currentIndex--;
  } else if (e.key === "Enter") {
    const id: string | null = options[currentIndex].getAttribute("data-id");
    console.log(id);
  }

  if (currentIndex === options.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = options.length - 1;

  options[currentIndex].insertBefore(cursor, options[currentIndex].firstChild);
});
