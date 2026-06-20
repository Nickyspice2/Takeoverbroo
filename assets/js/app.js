const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".anime-card");
const searchInput = document.querySelector("#searchInput");
const catalogGrid = document.querySelector("#catalogGrid");
const episodeButtons = document.querySelectorAll(".episode");
const episodeTitle = document.querySelector("#episode-title");
const episodeCopy = document.querySelector("#episode-copy");

let activeFilter = "all";

function removeEmptyState() {
  const existingEmptyState = document.querySelector(".empty-state");

  if (existingEmptyState) {
    existingEmptyState.remove();
  }
}

function renderEmptyState() {
  if (!catalogGrid) {
    return;
  }

  const emptyState = document.createElement("p");
  emptyState.className = "empty-state";
  emptyState.textContent = "ამ ძებნით anime ვერ მოიძებნა. სცადე სხვა სათაური ან ჟანრი.";
  catalogGrid.append(emptyState);
}

function renderCatalog() {
  if (!searchInput) {
    return;
  }

  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  removeEmptyState();

  cards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.genre === activeFilter;
    const matchesSearch = card.dataset.title.toLowerCase().includes(query);
    const shouldShow = matchesFilter && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (visibleCount === 0) {
    renderEmptyState();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderCatalog();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", renderCatalog);
}

episodeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    episodeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (episodeTitle && episodeCopy) {
      episodeTitle.textContent = button.dataset.title;
      episodeCopy.textContent = button.dataset.copy;
    }
  });
});
