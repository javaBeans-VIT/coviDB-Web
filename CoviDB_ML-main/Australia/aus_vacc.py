# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

dataset = pd.read_csv('aus_vaccinations.csv')
X = dataset.iloc[0:75,5].values
y = dataset.iloc[0:74,3].values
X=X.astype(np.int64)
y=y.astype(np.int64)
#splitting dataset into test and train set
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test= train_test_split(X,y,test_size=0.2,shuffle=False)
X_train= X_train.reshape(-1,1)
X_test= X_test.reshape(-1,1)
min_rmse=9999999999
for a in range(2,11):
    from sklearn.linear_model import LinearRegression
    lin_reg = LinearRegression()
    lin_reg.fit(X_train, y_train)


# Fitting Polynomial Regression to the dataset
    from sklearn.preprocessing import PolynomialFeatures
    poly_reg = PolynomialFeatures(degree = a,include_bias=False,interaction_only=True)
    X_poly = poly_reg.fit_transform(X_train)
    poly_reg.fit(X_poly, y_train)
    lin_reg_2 = LinearRegression()
    lin_reg_2.fit(X_poly, y_train)
        
    y_test_pred=poly_reg.fit_transform(X_test)
    z=lin_reg_2.predict(y_test_pred)
    import sklearn.metrics,math
    mse = sklearn.metrics.mean_squared_error(y_test, z)
    rmse = math.sqrt(mse)
    min_rmse=min(rmse,min_rmse)
    print(a," ")
    print(rmse,"\n")

#des_degree=2
#graph
#plt.scatter(X_train, y_train, color = 'red')
#plt.plot(X_train, lin_reg_2.predict(poly_reg.fit_transform(X_train)), color = 'blue')
#plt.title('Estimating the number of covid 19 Vaccines to be administered')
#plt.xlabel('Days Since the first 1st Covid 19 Vaccination')
#plt.ylabel('Total Vaccinations Done')
#plt.show()

#X_grid = np.arange(min(X_train), max(X_train), 0.1)
#X_grid = X_grid.reshape((len(X_grid), 1))
#plt.scatter(X_train, y_train, color = 'red')
#plt.plot(X_grid, lin_reg_2.predict(poly_reg.fit_transform(X_grid)), color = 'blue')
#plt.title('Estimating the number of covid 19 Vaccines to be administered')
#plt.xlabel('Days Since the first 1st Covid 19 Vaccination')
#plt.ylabel('Total Vaccinations Done')
#plt.show()



