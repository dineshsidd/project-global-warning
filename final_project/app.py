import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route('/<page>')
def html_lookup(page):
    try:
        return render_template('{}'.format(page))
    except TemplateNotFound:
        abort(404)

@app.route("/map")
def get_map_data():
    global_temp_country = pd.read_csv('static/resources/GlobalLandTemperaturesByCountry.csv')
    global_temp_country_clear = global_temp_country[~global_temp_country['Country'].isin(
    ['Denmark', 'Antarctica', 'France', 'Europe', 'Netherlands',
        'United Kingdom', 'Africa', 'South America'])]
    global_temp_country_clear = global_temp_country_clear.replace(
    ['Denmark (Europe)', 'France (Europe)', 'Netherlands (Europe)', 'United Kingdom (Europe)'],
    ['Denmark', 'France', 'Netherlands', 'United Kingdom'])

    countries = np.unique(global_temp_country_clear['Country'])
    mean_temp = []
    for country in countries:
        mean_temp.append({"country": country, "mean_temp" : 
        global_temp_country_clear[global_temp_country_clear['Country'] == 
        country]['AverageTemperature'].mean()})
    return jsonify(mean_temp)


@app.route("/sealevel")
def get_sea_levels():
    var_sealevels = pd.read_csv('static/resources/seaLevelData.csv')
    var_sealevels = var_sealevels[['year', 'CSIRO_sea_level', 
    'CSIRO - Lower error bound (inches)',
       'CSIRO - Upper error bound (inches)']]
    var_sealevels = var_sealevels.dropna()
    
    var_out = {
        "x" : list(var_sealevels["year"]).copy(),
        "y" : list(var_sealevels["CSIRO_sea_level"]).copy(),
        "lb" : list(var_sealevels['CSIRO - Lower error bound (inches)']).copy(),
        "ub" : list(var_sealevels['CSIRO - Upper error bound (inches)']).copy()
    }
    return jsonify(var_out)

@app.route("/meanTemp")
def get_mean_temp():
    global_temp = pd.read_csv("static/resources/GlobalTemperatures.csv")
    years = np.unique(global_temp['dt'].apply(lambda x: x[:4]))
    mean_temp_world = []
    mean_temp_world_upper = []
    mean_temp_world_lower = []
    for year in years:
        mean_temp_world.append(global_temp[global_temp['dt'].apply(
            lambda x: x[:4]) == year]['LandAverageTemperature'].mean())
        mean_temp_world_upper.append(global_temp[global_temp['dt'].apply(
                    lambda x: x[:4]) == year]['LandAverageTemperatureUncertainty'].mean() + global_temp[global_temp['dt'].apply(
            lambda x: x[:4]) == year]['LandAverageTemperature'].mean() )
        mean_temp_world_lower.append(global_temp[global_temp['dt'].apply(
            lambda x: x[:4]) == year]['LandAverageTemperature'].mean() - global_temp[global_temp['dt'].apply(
                    lambda x: x[:4]) == year]['LandAverageTemperatureUncertainty'].mean() )
    
    var_out = {
        "x" : list(years),
        "y" : mean_temp_world,
        "lb" : mean_temp_world_lower,
        "ub" : mean_temp_world_upper
    }
    return jsonify(var_out)


if __name__ == "__main__":
    app.run()
