import * as tool from "../tools/index.mjs";
import * as sort from "../sort/sort/index.mjs";
import * as template from "./index.mjs";

/**
 * Fills HTML template with data fetched by API and creates card element
 * @param {object} data
 * @param {*} parent
 * @param {number} amount
 */
export const postListingCard = (data, parent, amount = 0) => {
  const doc = template.cloneTemplate("card-template");
  const created = tool.formatOnlyDate(data.created);
  const timeLeft = tool.remainingTime(data.endsAt);
  const bids = sort.highestBid(data, amount);

  const tagContainer = doc.querySelector("div.tags");
  template.renderTags(data, tagContainer);

  if (bids === 0) {
    doc.querySelector("div.bids").innerText = `No bid`;
    doc.querySelector("div.timeLeft").innerText = timeLeft;
  } else {
    doc.querySelector("div.bids").innerText = `${bids} pt`;
    if (timeLeft === "Expired") {
      doc.querySelector("div.timeLeft").innerText = "SOLD";
    } else {
      doc.querySelector("div.timeLeft").innerText = timeLeft;
    }
  }
  doc.querySelector("a.card").href = `/product/?id=${data.id}`;
  doc.querySelector("h4").innerText = data.title;
  // doc.querySelector("p.card-text").innerText = data.description;
  doc.querySelector("div.created").innerText = `Created: ${created}`;

  const img = doc.querySelector("img");

  img.src = data.media[0];
  img.alt = data.title;
  img.onerror = (event) => {
    event.target.src = "../../../asset/img/placeholder_img.png";
  };
  parent.append(doc);
};
