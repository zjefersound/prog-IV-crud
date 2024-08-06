class CardStorage {
  constructor() {
    this.cards = [];
  }
  add({ cardNumber, expirationDate, securityCode }) {
    this.cards.push({
      id: String(Math.random()),
      cardNumber,
      expirationDate,
      securityCode,
    });
  }
  update(card) {
    this.cards = this.cards.map((c) => {
      if (card.id === c.id) {
        return card;
      }
      return c;
    });
  }
  delete(cardId) {
    this.cards = this.cards.filter((c) => cardId !== c.id);
  }
  getById(cardId) {
    return this.cards.find((c) => c.id === cardId);
  }
  getAll() {
    return this.cards;
  }
}

const cardStorage = new CardStorage();
renderCards();

const form = document.getElementById("cardForm");
form.onsubmit = handleSubmit;
function clearInputs() {
  document.getElementById("cardId").value = "";
  document.getElementById("cardNumber").value = "";
  document.getElementById("expirationDate").value = "";
  document.getElementById("securityCode").value = "";
  document.getElementById("form-title").innerText = "Adicionar cartão";
}
function handleSubmit(e) {
  e.preventDefault();
  const cardId = document.getElementById("cardId");
  const cardNumber = document.getElementById("cardNumber");
  const expirationDate = document.getElementById("expirationDate");
  const securityCode = document.getElementById("securityCode");

  if (cardId.value) {
    cardStorage.update({
      id: cardId.value,
      cardNumber: cardNumber.value,
      expirationDate: expirationDate.value,
      securityCode: securityCode.value,
    });
  } else {
    cardStorage.add({
      cardNumber: cardNumber.value,
      expirationDate: expirationDate.value,
      securityCode: securityCode.value,
    });
  }
  renderCards();
  clearInputs();
}

function editCard(cardId) {
  document.getElementById("form-title").innerText = "Editar cartão";
  const card = cardStorage.getById(cardId);
  document.getElementById("cardId").value = card.id;
  document.getElementById("cardNumber").value = card.cardNumber;
  document.getElementById("expirationDate").value = card.expirationDate;
  document.getElementById("securityCode").value = card.securityCode;
}

function deleteCard(cardId) {
  cardStorage.delete(cardId);
  renderCards();
  clearInputs();
}

function renderCards() {
  const listEl = document.getElementById("cards-list");
  listEl.innerHTML = "";
  const cards = cardStorage.getAll();
  cards.forEach((c) => {
    const item = document.createElement("li");
    item.className = "card-item";
    item.innerHTML = `
      <div>
        <span>Número: <span class="info">${c.cardNumber}</span></span>
        <span>Validade: <span class="info">${c.expirationDate}</span></span>
        <span>CVV: <span class="info">${c.securityCode}</span></span>
      </div>
      
      <button class="edit-btn" onclick="editCard('${c.id}')">
        Editar
      </button>
      <button class="delete-btn" onclick="deleteCard('${c.id}')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>
      </button>
    `;
    listEl.appendChild(item);
  });
}
