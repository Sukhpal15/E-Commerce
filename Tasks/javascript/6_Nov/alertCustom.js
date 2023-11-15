//Get Main container
const mainContainer = document.getElementById("container");
mainContainer.className = "flex justify-between items-start pt-10 px-20";

//Get button alert
const alertTimeOut = document.getElementById("alrt");

//parent div of alert box
const parentAlert = document.createElement("div");

//function to set attribute
function setAttribute(element, attName, attValue) {
  if (element && attributeName) {
    element.setAttribute(attributeName, attributeValue);
  }
}

//Add Click Event on the alert button
alertTimeOut.addEventListener("click", () => {
  //Create container for alert
  const alertContainer = document.createElement("div");
  alertContainer.className =
    "bg-blue-600 px-10 py-2 text-white mb-2 rounded-md text-md flex flex-col items-center gap-2";

  //div for svg and text
  const alertSvgText = document.createElement("div");
  alertSvgText.className = "flex gap-2 items-center";
  alertSvgText.innerHTML =
    '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg>';

  //Create text and para in the container
  const alertText = document.createElement("p");
  alertText.innerText = "This is a Custom Alert";

  //Button inside the alert
  const alertButton = document.createElement("button");
  alertButton.className = "bg-white text-blue-600 px-5";
  alertButton.setAttribute("type", "button");
  alertButton.innerText = "Ok";

  //Add event to alert button
  alertButton.addEventListener("click", () => {
    alertContainer.remove();
  });

  //Append Element in the container
  alertSvgText.append(alertText);
  alertContainer.append(alertSvgText, alertButton);

  //add timeout to the container
  let alertTime = setTimeout(() => {
    alertContainer.remove();
  }, 5000);

  //append
  parentAlert.appendChild(alertContainer);
});

mainContainer.append(parentAlert);
