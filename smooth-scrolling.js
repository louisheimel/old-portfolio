$(() => {
  // inspired by Antoine Combes' Stack Overflow answer: https://stackoverflow.com/questions/26195768/jquery-scrollto-chrome-fix
  $('.container a').on('click', (e) => {
    const link = e.target.getAttribute('href')
    const linkedDiv = $(link)
    const topOfElement = linkedDiv.position().top
    $('html, body').animate({
      scrollTop: topOfElement,
    }, 250)
  })
});

