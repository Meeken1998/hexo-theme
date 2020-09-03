$(document).ready(function () {
  $(".block-item.image-item").click(function () {
    const imgUrl = this.dataset["src"]
    showImageDialog(imgUrl)
  })

  document.querySelectorAll(".block-item").forEach((item, index) => {
    if ($(item).hasClass("image-item")) {
      let img_ = document.querySelector(`.block-item[data-idx="${index}"]`)
      $(img_)
        .css("transition-delay", `${0.5 + 0.15 * (index + 1)}s`)
        .css("opacity", 1)
    } else {
      $(item)
        .css("transition-delay", `${0.5 + 0.15 * (index + 1)}s`)
        .css("opacity", 1)
        .addClass(`skin-${getRandomBackground(item.dataset.date)}`)
    }
  })

  $(".image-dialog").click(function () {
    $("body").removeClass("show-modal")
  })

  $(".image-detail").click(function (e) {
    e.stopPropagation()
  })

  const blocks = document.querySelectorAll("pre code") || []
  for (let i = 0; i < blocks.length; i++) {
    hljs.highlightBlock(blocks[i])
  }
})

function showImageDialog(imgUrl) {
  $("#current-image").attr("src", "").removeAttr("style")
  $(".image-detail").removeAttr("style").removeClass("loaded")
  $("body").addClass("show-modal")
  let newImg = new Image()
  newImg.onload = function () {
    let width = newImg.width,
      height = newImg.height,
      clientWidth = document.body.clientWidth,
      clientHeight = document.body.clientHeight,
      finalWidth = 0,
      finalHeight = 0
    clientWidth = clientWidth < 1000 ? clientWidth - 50 : clientWidth - 100
    clientHeight = clientHeight < 1000 ? clientHeight - 50 : clientHeight - 100
    if (width < clientWidth && height < clientHeight) {
      finalWidth = width
      finalHeight = height
    } else {
      if (clientWidth / clientHeight <= width / height) {
        finalWidth = clientWidth
        finalHeight = clientWidth * (height / width)
      } else {
        finalWidth = clientHeight * (width / height)
        finalHeight = clientHeight
      }
    }
    $(".image-detail")
      .addClass("loaded")
      .css("width", finalWidth)
      .css("height", finalHeight)
    setTimeout(() => {
      $("#current-image")
        .css("width", finalWidth)
        .css("height", finalHeight)
        .attr("src", imgUrl)
    }, 600)
  }
  setTimeout(() => {
    newImg.src = imgUrl
  }, 800)
}

function getRandomBackground(t) {
  return (
    parseInt(t / 1000)
      .toString()
      .slice(-1) * 1
  )
}