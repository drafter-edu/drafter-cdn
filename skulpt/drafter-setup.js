function builtinRead(x) {
    if (
        Sk.builtinFiles === undefined ||
        Sk.builtinFiles["files"][x] === undefined
    )
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
// (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";
Sk.BottleSiteTarget = "#website";

Sk.configure({ read: builtinRead, __future__: Sk.python3 });

function startWebserver(pythonSite) {
    try {
        Sk.misceval
            .asyncToPromise(() =>
                Sk.importMainWithBody(
                    "main",
                    false,
                    pythonSite,
                    true
                )
            )
            .then((result) => console.log(result.$d));
    } catch (e) {
        console.error(e);
        console.error(e.args.v[0].v);
        alert(e);
    }
}

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "website.py",
    success: function(contents) {
      startWebserver(contents);
    }
  });
});
