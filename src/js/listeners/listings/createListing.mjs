import { createListing } from "../../API/listings/create.mjs";
import { load } from "../../storage/local.mjs";
export async function createListingListener(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  let payload = Object.fromEntries(formData.entries());
  payload.tags = payload.tags.split(",");
  payload.media = payload.media.split(",");
  payload.endsAt = new Date(payload.endsAt);

  const name = load("userDetails").name;
  try {
    await createListing(payload);
    window.location.assign(`/profile/?name=${name}`);
  } catch (e) {
    console.log(e);
  }
}
