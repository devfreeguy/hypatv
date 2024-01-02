// not perfect, but it works
// for details please visit: https://glenthemes.github.io/iconsax
document.addEventListener("DOMContentLoaded", () => {
  getIcons();
});

function getIcons() {
  document.querySelectorAll(".iconsax").forEach((icon) => {
    var iconName = icon.getAttribute("name").toLowerCase().trim();

    fetch("public/icons/" + iconName + ".svg")
      .then((svgData) => {
        console.log(svgData);
        return svgData.text();
      })
      .then((svgIcon) => {
        icon.innerHTML = svgIcon;
        if (
          icon.querySelectorAll("[http-equiv='Content-Security-Policy']").length
        ) {
          icon.innerHTML = "";
        }
      }).catch((e)=>{
        console.log(e);
      });
  });
}
