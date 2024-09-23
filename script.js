// Função para buscar o endereço pelo CEP
document.getElementById("cep").addEventListener("blur", function () {
  const cep = this.value.replace(/\D/g, "");
  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!("erro" in data)) {
          document.getElementById("address").value = data.logradouro;
          document.getElementById("neighborhood").value = data.bairro;
          document.getElementById("city").value = data.localidade;
          document.getElementById("state").value = data.uf;
        } else {
          alert("CEP não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro ao buscar o CEP.");
      });
  }
});

// Modal de envio
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Cria um objeto com os dados do formulário
    var formData = new FormData(this);
    var data = {};
    formData.forEach((value, key) => (data[key] = value));

    // Envia os dados via POST para o Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbzdcuD5blFA-Qpnf3dQ_3zHg8ykX2saze3bdvzAs4zQP7gG0jvP2UOEKQHlzifDeE9t/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar os dados");
        }
        return response.text();
      })
      .then((data) => {
        modal.style.display = "flex";
        document.getElementById("userForm").reset();
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Houve um problema ao enviar os dados.");
      });
  });

// Fecha o modal
span.onclick = function () {
  modal.style.display = "none";
};

// Fecha o modal clicando fora
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
