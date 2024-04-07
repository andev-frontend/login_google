function handleCredentialResponse(response) {
  const data = decodeJwtResponse(response.credential)
  $("img").attr("src", data.picture)
  $(".name").text(data.name);
  $(".email").text(data.email);
  $(".profile").show();
  $(".form_login").hide()
}
window.onload = function () {
  $(".profile").hide()
  google.accounts.id.initialize({
    client_id: "652418688846-s8jsdqb4ln83u9r27mhudssnej6g61mu.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("btn_login"),
    {
      theme: "filled_blue",
      size: "medium",
      type: "standard",
      shape: "rectangular",
      locale: "en",
      text: "signin_with",
      logo_alignment: "right",
      auto_prompt: "false",
    }
  );
  google.accounts.id.prompt();
}
function decodeJwtResponse(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
document.querySelector(".logout").addEventListener("click", function () {
  google.accounts.id.disableAutoSelect();
  $(".profile").hide();
  $(".form_login").show()
})