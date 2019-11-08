from flask import render_template
from ..main import bp


@bp.route("/", methods=("GET",))
def index():
    return render_template("main/index.html", title="Home")
