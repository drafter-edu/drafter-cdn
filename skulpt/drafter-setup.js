if (typeof Sk.environ == "undefined") {
    Sk.environ = new Sk.builtin.dict();
}
Sk.environ.set$item(new Sk.builtin.str("DRAFTER_SKULPT"), Sk.builtin.bool.true$);

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

Sk.console = {
    printPILImage: function (img) {
        document.body.append(img.image);
    },
    plot: function (chart) {
        let container = document.createElement("div");
        document.body.append(container);
        return {"html": [container]};
    },
    getWidth: function() {
        return 300;
    },
    getHeight: function() {
        return 300;
    }
};

$.ajaxSetup({ cache: false });

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
        document.body.innerHTML = "<div>There was an error running your site. Here is the error message:</div><pre>" + e.args.v[0].v + "</pre>";
    }
}

$(document).ready(function() {
	if (
        Sk.builtinFiles !== undefined &&
        Sk.builtinFiles["files"]["main.py"] !== undefined
    ) {
		startWebserver(Sk.builtinFiles["files"]["main.py"]);
    } else if (document.querySelector("iframe")) {
        let iframe = document.getElementsByTagName("iframe")[0];
        iframe.onload = ev => {
            let code = iframe.contentWindow.document.querySelector("pre").textContent;
            startWebserver(code);
        };
    } else {
        $.ajax({
            type: "GET",
            url: "website.py",
            success: function(contents) {
                startWebserver(contents);
            }
        });    
    }
});
