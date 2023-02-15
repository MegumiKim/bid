import { makeBid } from "../../API/listings/bid.mjs";
import { singleEntry } from "../../renders/singleEntry.mjs";
import { save } from "../../storage/local.mjs";
import { getMyCredits } from "../../utils/getMyCredits.mjs";
import { getParam } from "../../utils/getParam.mjs";

export async function makeBidListener(event) {
  event.preventDefault();
  const id = getParam("id");
  const form = event.target;
  const formData = new FormData(form);

  let payload = Object.fromEntries(formData.entries());
  payload.amount = parseInt(payload.amount);

  try {
    await makeBid(id, payload);
    const myCredits = await getMyCredits();
    save("credits", myCredits);
    singleEntry();
  } catch (e) {
    console.log(e);
  }
}