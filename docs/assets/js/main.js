"use strict";const option1=document.querySelector("#option1"),option2=document.querySelector("#option2"),option3=document.querySelector("#option3"),button=document.querySelector(".btn"),resultsBox=document.querySelector(".results"),messagesBox=document.querySelector(".messages"),secretButton=document.querySelector(".secret-btn"),apiUrl="https://raw.githubusercontent.com/Adalab/cards-data/master/",adalabImage="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB";let cardToCompare,acc=0;const pairsFound=[],resetGame=()=>{acc=0,cardToCompare="",pairsFound.length=0,resultsBox.innerHTML="",messagesBox.innerHTML="",secretButton.classList.add("hidden"),resultsBox.classList.remove("transparent"),messagesBox.classList.remove("background-winner")},hideCards=(e,t,s,a)=>{e.classList.toggle("hidden"),t.classList.toggle("hidden"),s.classList.toggle("hidden"),a.classList.toggle("hidden")},compareCards=(e,t)=>{const s=cardToCompare.childNodes[0],a=cardToCompare.childNodes[1],r=document.querySelectorAll(".card");return s.id!==e.id?(messagesBox.innerHTML="Not a match :( Try again!",setTimeout(function(){var r,o,c;r=a,o=e,c=t,s.classList.toggle("hidden"),r.classList.toggle("hidden"),o.classList.toggle("hidden"),c.classList.toggle("hidden")},1e3),cardToCompare="",acc=0):pairsFound.length<r.length-2?(messagesBox.innerHTML="It's a match! Keep going!",acc=0,cardToCompare="",pairsFound.push(s),pairsFound.push(e),acc):(messagesBox.innerHTML="You win! Do you want to play again?",secretButton.classList.remove("hidden"),resultsBox.classList.add("transparent"),void messagesBox.classList.add("background-winner"))},flipCards=e=>{const t=e.currentTarget.childNodes[0],s=e.currentTarget.childNodes[1];if(t.classList.toggle("hidden"),s.classList.toggle("hidden"),0===acc)return cardToCompare=e.currentTarget,++acc;1===acc&&compareCards(t,s)},addCardListener=()=>{const e=document.querySelectorAll(".card");for(const t of e)t.addEventListener("click",flipCards)},printCards=e=>{resultsBox.innerHTML="";const t=document.createElement("ul");t.classList.add("card-list",`number${e}`),fetch(`${apiUrl}${e}.json`).then(e=>e.json()).then(s=>{for(let a=0;a<e;a++){const e=s[a].image,r=s[a].name,o=s[a].pair,c=document.createElement("li");c.classList.add("card");const d=document.createElement("img");d.classList.add("front-image","hidden","image"),d.setAttribute("id",o),d.setAttribute("src",e),d.setAttribute("alt",r);const n=document.createElement("img");n.classList.add("back-image","image"),n.setAttribute("src",adalabImage),n.setAttribute("id",o),c.appendChild(d),c.appendChild(n),t.appendChild(c)}resultsBox.appendChild(t),addCardListener()})},checkSavedNumber=()=>{const e=localStorage.getItem("NumberOfCards");e?(printCards(e),"4"===e?option1.checked=!0:"6"===e?option2.checked=!0:option3.checked=!0):console.log("No saved number")},saveNumber=e=>{localStorage.setItem("NumberOfCards",e)},getCards=()=>{messagesBox.innerHTML="",!0===option1.checked?(printCards(4),saveNumber(4)):!0===option2.checked?(printCards(6),saveNumber(6)):!0===option3.checked?(printCards(8),saveNumber(8)):messagesBox.innerHTML="Please pick the number of cards"};checkSavedNumber(),button.addEventListener("click",getCards),secretButton.addEventListener("click",resetGame);