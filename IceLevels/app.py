@app.route("/icelevels")
def get_ice_levels():
    var/icelevels = pd.read_csv('static/resources/icelevelsData.csv')
    var/icelevels = var/icelevels[[
        'Date', 
        'hemisphere',
        'Extent'
        ]]
    var/icelevels = var/icelevels.dropna()
    
    var_out = {
        "x" : list(var/icelevels['Date']).copy(),
        "y" : list(var/icelevels['Extent']).copy(),
        "nh" : list(var/icelevels['hemisphere' == 'north']).copy(),
        "sh" : list(var/icelevels['hemisphere' == 'south']).copy()
    }
    return jsonify(var_out)