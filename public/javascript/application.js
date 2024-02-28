jQuery(document).ready(function ($) {
  $("#loading").hide();
  $("h1.page-title").text("Qual é o meu endereço?");
  $("[name=zip_code]").mask("00000-000");

  $("form").on("submit", function (event) {
    event.preventDefault()
    const zipCode = $(this).find("#zip_code").val()

    if (!zipCode) return
    $("#loading").show();
    $("#response").text("");

    $.get(`https://viacep.com.br/ws/${zipCode}/json`)
      .done(function (response) {
        if (response.erro === "true") {
          return $("#response").html("Endereço não encontrado!");
        }

        const html = $(
          `<div>` +
            `<p>Logradouro: <b>${response.logradouro}</b></p>` +
            `<p>Bairro: <b>${response.bairro}</b></p>` +
            `<p>Localidade: <b>${response.localidade}-${response.uf}</b></p>` +
          `</div>`
        );

        $("#response").html(html);
      })
      .fail(function () {
        $("#response").text("Endereço não encontrado!");
      })
      .always(function () {
        $("#loading").hide();
      });
  });
});
