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
  cardNumber.value = "";
  expirationDate.value = "";
  securityCode.value = "";
}

function editCard(cardId) {
  const card = cardStorage.getById(cardId);
  document.getElementById("cardId").value = card.id;
  document.getElementById("cardNumber").value = card.cardNumber;
  document.getElementById("expirationDate").value = card.expirationDate;
  document.getElementById("securityCode").value = card.securityCode;
}

function deleteCard(cardId) {
  cardStorage.delete(cardId);
  renderCards();
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
        <span>Número: ${c.cardNumber}</span>
        <span>Validade: ${c.expirationDate}</span>
        <span>CVV: ${c.securityCode}</span>
      </div>
      
      <button class="edit-btn" onclick="editCard('${c.id}')">
        Editar
      </button>
      <button class="delete-btn" onclick="deleteCard('${c.id}')">
        Deletar
      </button>
    `;
    listEl.appendChild(item);
  });
}
