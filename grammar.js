module.exports = grammar({
  name: 'vhs',
  rules: {
    program: $ => repeat(choice($.command, $.comment)),
    command: $ => choice(
      $.control,
      $.shift,
      $.alt,
      $.hide,
      $.show,
      $.output,
      $.sleep,
      $.type,
      $.backspace,
      $.down,
      $.enter,
      $.escape,
      $.left,
      $.right,
      $.set,
      $.env,
      $.copy,
      $.paste,
      $.space,
      $.tab,
      $.up,
      $.pageup,
      $.pagedown,
    ),

    control: $ =>   /Ctrl\+(Alt\+)?(Shift\+)?([A-Z]|Enter)/,
    alt: $ =>       /Alt\+(Shift\+)?([A-Z]|Enter|Tab)/,
    shift: $ =>     /Shift\+([A-Z]|Enter|Tab)/,
    hide: $ =>      seq('Hide'),
    show: $ =>      seq('Show'),
    copy: $ =>      seq('Copy'),
    paste: $ =>     seq('Paste'),
    output: $ =>    seq('Output',    $.path),
    set: $ =>       seq('Set',       $.setting),
    env: $ =>       seq('Env',       $.string, $.string),
    sleep: $ =>     seq('Sleep',     $.time),
    type: $ =>      seq('Type',      optional($.speed), repeat1($.string)),
    backspace: $ => seq('Backspace', optional($.speed), optional($.integer)),
    down: $ =>      seq('Down',      optional($.speed), optional($.integer)),
    enter: $ =>     seq('Enter',     optional($.speed), optional($.integer)),
    escape: $ =>    seq('Escape',    optional($.speed), optional($.integer)),
    left: $ =>      seq('Left',      optional($.speed), optional($.integer)),
    right: $ =>     seq('Right',     optional($.speed), optional($.integer)),
    space: $ =>     seq('Space',     optional($.speed), optional($.integer)),
    tab: $ =>       seq('Tab',       optional($.speed), optional($.integer)),
    up: $ =>        seq('Up',        optional($.speed), optional($.integer)),
    pageup: $ =>    seq('PageUp',    optional($.speed), optional($.integer)),
    pagedown: $ =>  seq('PageDown',  optional($.speed), optional($.integer)),

    setting: $ => choice(
      seq('Shell',         $.string),
      seq('FontFamily',    $.string),
      seq('FontSize',      $.float),
      seq('Framerate',     $.integer),
      seq('PlaybackSpeed', $.float),
      seq('Height',        $.integer),
      seq('LetterSpacing', $.float),
      seq('TypingSpeed',   $.time),
      seq('LineHeight',    $.float),
      seq('Padding',       $.float),
      seq('Theme',         choice($.json, $.string)),
      seq('LoopOffset',    seq($.float, optional('%'))),
      seq('Width',         $.integer),
      seq('BorderRadius',  $.integer),
      seq('Margin',        $.integer),
      seq('MarginFill',    $.string),
      seq('WindowBar',     $.string),
      seq('WindowBarSize', $.integer),
      seq('CursorBlink',   $.boolean),
    ),

    string: $ =>  choice(/"[^"]*"/, /'[^']*'/, /`[^`]*`/, /[A-Za-z][A-Za-z0-9_]*/),
    comment: $ => /#.*/,
    float: $ =>   /\d*\.?\d+/,
    integer: $ => /\d+/,
    json: $ =>    /\{.*\}/,
    path: $ =>    /[\.\-\/A-Za-z0-9%]+/,
    speed: $ =>   seq('@', $.time),
    time: $ =>    /\d*\.?\d+(ms|s)?/,
    boolean: $ => /true|false/,
  }
});
