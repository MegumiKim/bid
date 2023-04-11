import * as ui from "../ui/index.mjs";
import * as render from "../renders/index.mjs";
import * as listeners from "../listeners/index.mjs";
import { checkLogin } from "../tools/checkLogin.mjs";

const path = location.pathname;

export function router() {
  if (path === "/index.html" || path === "/") {
    render.listings();
    ui.myPageBtn();
    listeners.logout();
    ui.createListingForm();
    checkLogin();
  } else if (path === "/signup/") {
    ui.signupForm();
  } else if (path === "/login/") {
    ui.loginForm();
  } else if (path === "/product/") {
    render.singleEntry();
    listeners.logout();
    ui.myPageBtn();
    checkLogin();
  } else if (path === "/profile/") {
    render.myPage();
    listeners.logout();
    ui.createListingForm();
    ui.editAvatar();
    checkLogin();
  }
}

export const routerSwitch = () => {
  const path = location.pathname;
  console.log(path);
  switch (path) {
    case "/signup/":
      ui.signupForm();
      break;

    case "/login":
      ui.loginForm();
      break;

    case "/product/":
      render.singleEntry();
      listeners.logout();
      ui.myPageBtn();
      checkLogin();
      break;

    case "/profile/":
      render.myPage();
      listeners.logout();
      ui.createListingForm();
      ui.editAvatar();
      checkLogin();

    default:
      render.listings();
      ui.myPageBtn();
      listeners.logout();
      ui.createListingForm();
      checkLogin();

      break;
  }
};
