import { renderCards } from "../../renders/renderCards.mjs";
import { load } from "../../storage/session.mjs";
import { searchFilter } from "../../tools/filters/searchFilter.mjs";
import { clearHTML } from "../../utils/clear.mjs";

export function onSearch(event, listings, container) {
  event.preventDefault();

  // const listings = load("cached-listings");
  // const container = document.querySelector("#listings-container");
  const form = event.target;
  const searchTerm = form.value.trim().toLowerCase();

  if (!searchTerm.length) {
    container.clearHTML();
    renderCards(listings, container);

    return;
  } else {
    if (searchTerm.length < 3) {
      return;
    }

    const filteredListings = listings.filter((listing) =>
      searchFilter(listing, searchTerm)
    );

    if (filteredListings.length) {
      container.clearHTML();

      renderCards(filteredListings, container);
      // filteredListings.forEach((listing) => {
      //   renderCard(container, listing, ".card");
      // });
    } else {
      container.innerHTML = "no result";
    }
  }
}
