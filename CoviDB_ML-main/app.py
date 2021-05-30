import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd

app = Flask(__name__)
ind_svr_model = pickle.load(open('India/ind_svr_model.pkl', 'rb'))
fr_model=pickle.load(open('France/fr_linreg_model.pkl','rb'))
aus_model=pickle.load(open('Australia/aus_svr_model.pkl','rb'))

@app.route('/')
def home():
    return render_template('vaccine_Prediction_final.html')

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    country=request.form['country']
    date = request.form['prediction_date']
    day=((int(date[5])*10+int(date[6]))-1)*30+(int(date[8])*10+int(date[9]))
    if(country=='India'):
        #india
        day=day-13
        dataset = pd.read_csv('India/ind_vaccinations.csv')
        X = dataset.iloc[0:88,5].values
        y = dataset.iloc[0:112,3].values
        y=y.reshape(-1,1)
        X=X.reshape(-1,1)
        from sklearn.preprocessing import StandardScaler
        sc_y=StandardScaler()
        sc_X=StandardScaler()
        X=sc_X.fit_transform(X)
        y=sc_y.fit_transform(y)
        y_pred=sc_y.inverse_transform(ind_svr_model.predict(sc_X.transform(np.array([[day]]))))
        output=round(y_pred[0])
        return render_template('vaccine_Prediction_final.html',prediction_date=date,prediction_text=output,prediction_percent=round(output//13000000),form_country=country)
    if(country=='France'):
        #france
        day=day+5
        from sklearn.preprocessing import PolynomialFeatures
        poly_reg = PolynomialFeatures(degree = 3)
        day=poly_reg.fit_transform([[day]])
        output=fr_model.predict(day)
        output=round(output[0])
        return render_template('vaccine_Prediction_final.html',prediction_date=date,prediction_text=output,prediction_percent=round(output//671000),form_country=country)
    if(country=='Australia'):
        day=day-48
        dataset = pd.read_csv('Australia/aus_vaccinations.csv')
        X = dataset.iloc[30:86,5].values
        y = dataset.iloc[30:86,3].values
        y=y.reshape(-1,1)
        X=X.reshape(-1,1)
        from sklearn.preprocessing import StandardScaler
        sc_y=StandardScaler()
        sc_X=StandardScaler()
        X=sc_X.fit_transform(X)
        y=sc_y.fit_transform(y)
        y_pred=sc_y.inverse_transform(aus_model.predict(sc_X.transform(np.array([[day]]))))
        output=round(y_pred[0])
        return render_template('vaccine_Prediction_final.html',prediction_date=date,prediction_text=output,prediction_percent=round(output//254000),form_country=country)
        
    

if __name__ == "__main__":
    app.run(debug=True)
