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

    $.get(`/addresses/${zipCode}`)
      .done(function (response) {
        console.log(response.failure);

        if (response.failure) {
          return $("#response").html("<span style='color:red'>Endereço não encontrado!</span>");
        }

        const html = $(
          `<div>` +
            `<h3>JSON version</h3>` +
            `<p>Logradouro: <b>${response.streetName}</b></p>` +
            `<p>Bairro: <b>${response.district}</b></p>` +
            `<p>Localidade: <b>${response.city}-${response.state}</b></p>` +
          `</div>`
        );

        $("#response").html(html);
      })
      .fail(function () {
        $("#response").text("<span style='color:red'>Endereço não encontrado!</span>");
      })
      .always(function () {
        $("#loading").hide();
      });
  });
});
