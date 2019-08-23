function outsideClick(element, events, callback) {
  const documento = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      setTimeout(() => documento.addEventListener(userEvent, handleOutsideClick));
    });
    element.setAttribute(outside, "");
  }
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach(userEvent => {
        documento.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}

/*Separador*/

const menuButton = document.querySelector('[data-menu="button"]');
const menuList = document.querySelector('[data-menu="list"]');
const eventos = ["click"];
function openMenu(event) {
  menuList.classList.toggle("active");
  menuButton.classList.toggle("active");
  outsideClick(menuList, eventos, () => {
    menuList.classList.remove("active");
    menuButton.classList.remove("active");
  });
}

eventos.forEach(evento => menuButton.addEventListener(evento, openMenu));
