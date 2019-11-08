import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask


def create_app(config_class):
    """A factory function to generate objects from the flask app class."""

    # Create new flask object and configure it with 'config_class' object.
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Import blueprints
    from .main import bp as main_bp
    from .errors import bp as errors_bp

    # Register blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(errors_bp)

    # Log errors to file only in debug mode.
    if app.debug:
        if not os.path.exists("logs"):
            os.mkdir("logs", mode=0o777)
        # Create a rotating file handler
        file_handler = RotatingFileHandler(
            "logs/react-app.log", maxBytes=10240, backupCount=10
        )
        # Format the rotating file handler
        file_handler.setFormatter(
            logging.Formatter(
                "%(asctime)s %(levelname)s:%(message)s [in %(pathname)s: %(lineno)d]"
            )
        )

        # Register the rotating filehandler with the flask object.
        app.logger.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.info("react-app is running...")

    return app
