$(document).ready(function() {
  // executes when HTML-Document is loaded and DOM is ready
  // https://css-tricks.com/snippets/javascript/remove-inline-styles/
  function remove_style(all) {
    var i = all.length;
    var j, is_hidden;
    // Presentational attributes.
    var attr = [
      'align',
      'background',
      'bgcolor',
      'border',
      'cellpadding',
      'cellspacing',
      'color',
      'face',
      'height',
      'hspace',
      'marginheight',
      'marginwidth',
      'noshade',
      'nowrap',
      'valign',
      'vspace',
      'width',
      'vlink',
      'alink',
      'text',
      'link',
      'frame',
      'frameborder',
      'clear',
      'scrolling',
      'style',
      'class'
    ];
    var attr_len = attr.length;
    while (i--) {
      is_hidden = (all[i].style.display === 'none');
      j = attr_len;
      while (j--) {
        all[i].removeAttribute(attr[j]);
      }
      // Re-hide display:none elements,
      // so they can be toggled via JS.
      if (is_hidden) {
        all[i].style.display = 'none';
        is_hidden = false;
      }
    }
  }
  $('button').click(function() {
    var input = $("#input").val();
    console.log(input);
    var StrippedString = input.replace(/style=(\'|\")([ -0-9a-zA-Z:]*[ 0-9a-zA-Z;]*)*\1/g, '');
    $("#output").val(StrippedString);
  });
  // document ready
});
