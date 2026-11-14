/* Pieci jQuery efekti tikai tekstam. */
$(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Virsraksta parādīšanās.
  $('h1').hide().fadeIn(1200);

  // 2. Ievada teksta ieslīdēšana.
  $('.hero-copy > p').css({ position: 'relative', left: -25, opacity: 0 })
    .delay(300).animate({ left: 0, opacity: 1 }, 900);

  // 3. Tekstu parādīšanās ritinot.
  if ('IntersectionObserver' in window) {
    const texts = $('.section h2, .steps p');
    texts.css('opacity', 0);
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).animate({ opacity: 1 }, 800);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    texts.each(function () { observer.observe(this); });
  }

  // 4. Misijas teksta slēpšana un parādīšana bez pogām.
  $('.mission-content p').css('opacity', 1).hide();
  $('.mission-title').on('mouseenter', function () {
    $(this).closest('article').find('.mission-content p').stop(true, true).show(400);
  }).on('mouseleave', function () {
    $(this).closest('article').find('.mission-content p').stop(true, true).hide(400);
  });

  // 5. Automātiska motivācijas tekstu maiņa.
  const quotes = [
    'Tava nākotne nav ierakstīta zvaigznēs. Tu to veido ar saviem lēmumiem.',
    'Katrs meistars reiz bija iesācējs. Dod sev atļauju mācīties.',
    'Drosme nav zināt visas atbildes. Drosme ir spert nākamo soli.',
    'Tavs lielākais spēks ir prasme turpināt. Arī tad, kad ceļš vēl nav skaidrs.'
  ];
  let quoteIndex = 0;
  setInterval(function () {
    if (document.hidden) return;
    $('#quote blockquote').fadeOut(400, function () {
      quoteIndex = (quoteIndex + 1) % quotes.length;
      $(this).text(quotes[quoteIndex]).fadeIn(600);
    });
  }, 8000);
});
